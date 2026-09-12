import { NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { collection, getDocs, query } from 'firebase-admin/firestore';

export async function GET(req: Request) {
  const header = req.headers.get('authorization') ?? '';
  const idToken = header.startsWith('Bearer ') ? header.slice(7) : '';
  if (!idToken) {
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });
  }
  try {
    await adminAuth.verifyIdToken(idToken);
  } catch {
    return NextResponse.json({ error: 'invalid token' }, { status: 401 });
  }

  const snap = await getDocs(query(collection(adminDb, 'places')));
  const places = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Record<string, unknown>) }));
  return NextResponse.json({ places });
}
