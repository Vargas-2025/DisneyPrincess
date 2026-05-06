// All API calls to the MockAPI endpoint live here.
// Keeping them in one place makes it easy to swap the base URL later.

import type { Princess } from '../types/Princess';

// The MockAPI endpoint for our princess collection
const BASE_URL = 'https://69f25f37b15130b97352def3.mockapi.io/PrincessAPi/princesses';

// READ — fetch every princess in the collection
export async function getAllPrincesses(): Promise<Princess[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Failed to fetch princesses');
  return res.json();
}

// READ — fetch one princess by her MockAPI id
export async function getPrincessById(id: string): Promise<Princess> {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch princess');
  return res.json();
}

// CREATE — post a new princess to MockAPI
export async function createPrincess(
  data: Omit<Princess, 'id' | 'createdAt'>
): Promise<Princess> {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create princess');
  return res.json();
}

// UPDATE — replace an existing princess's data by id
export async function updatePrincess(
  id: string,
  data: Omit<Princess, 'id' | 'createdAt'>
): Promise<Princess> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update princess');
  return res.json();
}

// DELETE — permanently remove a princess by id
export async function deletePrincess(id: string): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete princess');
}
