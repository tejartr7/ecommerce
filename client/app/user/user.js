// app/api/user.js
import { getSession } from '@auth0/nextjs-auth0';

export default async function handler() {
  try {
    const session = await getSession();
    return res.status(200).json({ user: session?.user || null });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'An error occurred while fetching user details.' });
  }
}
