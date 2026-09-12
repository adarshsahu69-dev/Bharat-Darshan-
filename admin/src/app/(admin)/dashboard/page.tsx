import Link from 'next/link';
import { adminDb } from '@/lib/firebase-admin';
import { getCountFromServer, collection } from 'firebase-admin/firestore';

async function getStats() {
  const [places, users] = await Promise.all([
    getCountFromServer(collection(adminDb, 'places')),
    getCountFromServer(collection(adminDb, 'users')),
  ]);
  return { places: places.data().count, users: users.data().count };
}

export default async function DashboardPage() {
  let places = 0;
  let users = 0;
  try {
    const stats = await getStats();
    places = stats.places;
    users = stats.users;
  } catch {
    // Admin SDK may be unconfigured in local dev; degrade gracefully.
  }

  return (
    <main style={{ padding: 32 }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Bharat Darshan — Admin</h1>
      <p>Published places: {places}</p>
      <p>Users: {users}</p>
      <p style={{ marginTop: 12 }}>
        <Link href="/dashboard">Dashboard</Link>
      </p>
    </main>
  );
}
