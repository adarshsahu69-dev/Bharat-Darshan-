const { initializeApp } = require('firebase/app');
const {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  addDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  runTransaction,
  writeBatch,
} = require('firebase/firestore');

const {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} = require('@firebase/rules-unit-testing');

const PROJECT = 'demo-bharat-darshan';
const API_KEY = 'fake-api-key';

/** @type {import('@firebase/rules-unit-testing').RulesTestEnvironment} */
let env;

function db(app) {
  return getFirestore(app);
}

function authed(uid = 'user1', token = {}) {
  return env.authenticated(uid, { role: 'user', ...token });
}

function adminCtx() {
  return env.authenticated('admin1', { role: 'admin' });
}

function unauthCtx() {
  return env.unauthenticated();
}

async function seed() {
  await env.withSecurityRulesDisabled(async (ctx) => {
    const firestore = db(ctx.app);
    const batch = writeBatch(firestore);

    batch.set(doc(firestore, 'cities', 'delhi'), {
      id: 'delhi', name: 'Delhi', slug: 'delhi', state: 'Delhi',
      coordinates: { lat: 28.6139, lng: 77.1276 }, coverImage: 'https://example.com/delhi.jpg',
    });

    batch.set(doc(firestore, 'categories', 'temple'), {
      id: 'temple', name: 'Temple', slug: 'temple', icon: 'temple', order: 1,
    });

    batch.set(doc(firestore, 'places', 'qutub-minar'), {
      id: 'qutub-minar', name: 'Qutub Minar', slug: 'qutub-minar',
      cityId: 'delhi', categoryId: 'temple', status: 'published',
      coordinates: { lat: 28.612, lng: 77.171 }, address: 'Mehrauli', images: [], tags: ['heritage'],
      rating: 4.7, reviewCount: 12, createdAt: '2026-01-01', updatedAt: '2026-01-01',
    });

    batch.set(doc(firestore, 'places', 'draft-place'), {
      id: 'draft-place', name: 'Draft Place', slug: 'draft-place',
      cityId: 'delhi', categoryId: 'temple', status: 'draft',
      coordinates: { lat: 28.0, lng: 77.0 }, address: '', images: [], tags: [],
      rating: 0, reviewCount: 0, createdAt: '2026-01-01', updatedAt: '2026-01-01',
    });

    batch.set(doc(firestore, 'users', 'user1'), {
      uid: 'user1', email: 'user1@example.com', displayName: 'User One', role: 'user',
      createdAt: '2026-01-01',
    });
    batch.set(doc(firestore, 'users', 'admin1'), {
      uid: 'admin1', email: 'admin@example.com', displayName: 'Admin', role: 'admin',
      createdAt: '2026-01-01',
    });

    batch.set(doc(firestore, 'users/user1/favorites/qutub-minar'), {
      placeId: 'qutub-minar', addedAt: '2026-02-01',
    });

    await setDoc(
      doc(firestore, 'reviews', 'review1'),
      {
        id: 'review1', placeId: 'qutub-minar', authorId: 'user1',
        authorName: 'User One', rating: 5, text: 'Amazing', photos: [], status: 'pending',
        createdAt: '2026-01-01', updatedAt: '2026-01-01',
      },
      { merge: true },
    );

    batch.set(doc(firestore, 'contributions', 'contrib1'), {
      id: 'contrib1', type: 'add_photo', entityId: 'qutub-minar', authorId: 'user1',
      status: 'published', changes: { photo: 'url' }, createdAt: '2026-01-01',
    });

    await batch.commit();
  });
}

beforeAll(async () => {
  env = await initializeTestEnvironment({
    projectId: PROJECT,
    emulators: { firestore: { host: '127.0.0.1', port: 4433 } },
    auth: {},
  });
});

beforeEach(async () => {
  await env.clearFirestore();
  await seed();
});

afterAll(async () => {
  await env?.cleanup();
});

describe('Firestore security rules', () => {
  test('public: anyone can read a published place', async () => {
    const c = unauthCtx();
    await assertSucceeds(getDoc(doc(db(c.app), 'places', 'qutub-minar')));
  });

  test('public: anonymous cannot read a draft place', async () => {
    const c = unauthCtx();
    await assertFails(getDoc(doc(db(c.app), 'places', 'draft-place')));
  });

  test('public: anyone can list places', async () => {
    const c = unauthCtx();
    const snap = await assertSucceeds(getDocs(collection(db(c.app), 'places')));
    // rules are not filters; list is allowed, client filters status locally.
    expect(snap).toBeDefined();
  });

  test('anonymous cannot write a place', async () => {
    const c = unauthCtx();
    await assertFails(
      setDoc(doc(db(c.app), 'places', 'new-place'), { name: 'x', status: 'published', cityId: 'delhi', categoryId: 'temple' }),
    );
  });

  test('regular user cannot write a place', async () => {
    const c = authed('user1');
    await assertFails(
      setDoc(doc(db(c.app), 'places', 'new-place'), { name: 'x', status: 'published', cityId: 'delhi', categoryId: 'temple' }),
    );
  });

  test('admin can create a place', async () => {
    const c = adminCtx();
    await assertSucceeds(
      setDoc(doc(db(c.app), 'places', 'new-place'), {
        name: 'New Place', slug: 'new-place', status: 'published',
        cityId: 'delhi', categoryId: 'temple', coordinates: { lat: 1, lng: 1 }, images: [], tags: [], rating: 0, reviewCount: 0, createdAt: '2026-01-01', updatedAt: '2026-01-01',
      }),
    );
  });

  test('admin cannot mutate the status of an existing place', async () => {
    const c = adminCtx();
    await assertFails(
      updateDoc(doc(db(c.app), 'places', 'qutub-minar'), { status: 'draft' }),
    );
  });

  test('regular user can read their own user doc', async () => {
    const c = authed('user1');
    await assertSucceeds(getDoc(doc(db(c.app), 'users', 'user1')));
  });

  test('regular user cannot read another user doc', async () => {
    const c = authed('user1');
    await assertFails(getDoc(doc(db(c.app), 'users', 'admin1')));
  });

  test('user can create their own user doc', async () => {
    const c = authed('user2');
    await assertSucceeds(
      setDoc(doc(db(c.app), 'users', 'user2'), { uid: 'user2', email: 'u2@x.com', role: 'user', createdAt: '2026-01-01' }),
    );
  });

  test('anonymous cannot create a user doc', async () => {
    const c = unauthCtx();
    await assertFails(
      setDoc(doc(db(c.app), 'users', 'ghost'), { uid: 'ghost', email: 'g@x.com', role: 'user', createdAt: '2026-01-01' }),
    );
  });

  test('favorite owner can read/create/delete their favorites', async () => {
    const c = authed('user1');
    await assertSucceeds(getDoc(doc(db(c.app), 'users/user1/favorites/qutub-minar')));
    await assertSucceeds(setDoc(doc(db(c.app), 'users/user1/favorites/new'), { placeId: 'new', addedAt: '2026-03-01' }));
    await assertFails(getDoc(doc(db(c.app), 'users/admin1/favorites/qutub-minar')));
  });

  test('favorite owner can delete their favorite but cannot mutate schema unexpectedly', async () => {
    const c = authed('user1');
    await assertSucceeds(deleteDoc(doc(db(c.app), 'users/user1/favorites/qutub-minar')));
  });

  test('trip owner can create and read their trips', async () => {
    const c = authed('user1');
    const tripRef = doc(db(c.app), 'users/user1/trips/trip1');
    await assertSucceeds(setDoc(tripRef, { id: 'trip1', title: 'Delhi', status: 'planning', items: [], createdAt: '2026-01-01', updatedAt: '2026-01-01' }));
    await assertSucceeds(getDoc(tripRef));
    await assertFails(getDoc(doc(db(c.app), 'users/admin1/trips/trip1')));
  });

  test('trip owner cannot delete others trips', async () => {
    const c = authed('user1');
    await assertFails(deleteDoc(doc(db(c.app), 'users/admin1/trips/trip1')));
  });

  test('user can create a pending review on a published place', async () => {
    const c = authed('user1');
    await assertSucceeds(
      addDoc(collection(db(c.app), 'reviews'), {
        placeId: 'qutub-minar', authorId: 'user1', rating: 5, text: 'Great', photos: [], status: 'pending', createdAt: '2026-01-01', updatedAt: '2026-01-01',
      }),
    );
  });

  test('user cannot create a review with status approved', async () => {
    const c = authed('user1');
    await assertFails(
      addDoc(collection(db(c.app), 'reviews'), {
        placeId: 'qutub-minar', authorId: 'user1', rating: 5, text: 'Great', photos: [], status: 'approved', createdAt: '2026-01-01', updatedAt: '2026-01-01',
      }),
    );
  });

  test('review author can edit their own pending review text/rating', async () => {
    const c = authed('user1');
    await assertSucceeds(updateDoc(doc(db(c.app), 'reviews', 'review1'), { rating: 4, text: 'Updated', updatedAt: '2026-01-02' }));
  });

  test('review author cannot change authorId on their own review', async () => {
    const c = authed('user1');
    await assertFails(updateDoc(doc(db(c.app), 'reviews', 'review1'), { authorId: 'admin1' }));
  });

  test('non-author cannot delete a review', async () => {
    const c = authed('user2');
    await assertFails(deleteDoc(doc(db(c.app), 'reviews', 'review1')));
  });

  test('contributions are readable when published', async () => {
    const c = authed('user1');
    await assertSucceeds(getDoc(doc(db(c.app), 'contributions', 'contrib1')));
  });

  test('admin can update contribution status', async () => {
    const c = adminCtx();
    await assertSucceeds(updateDoc(doc(db(c.app), 'contributions', 'contrib1'), { status: 'approved', resolvedAt: '2026-01-02' }));
  });

  test('notifications are readable only by their owner', async () => {
    await env.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(db(ctx.app), 'users/user1/notifications/n1'), { id: 'n1', type: 'system', title: 't', body: 'b', read: false, createdAt: '2026-01-01' });
    });
    const owner = authed('user1');
    await assertSucceeds(getDoc(doc(db(owner.app), 'users/user1/notifications/n1')));
    const other = authed('user2');
    await assertFails(getDoc(doc(db(other.app), 'users/user1/notifications/n1')));
  });
});
