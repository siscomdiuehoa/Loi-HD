import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, type User } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
export const googleAvailable = !Capacitor.isNativePlatform() && Object.values(config).every(Boolean);
const auth = googleAvailable ? getAuth(initializeApp(config)) : null;
export function observeUser(callback: (user: User | null) => void): () => void {
  if (!auth) { callback(null); return () => {}; }
  return onAuthStateChanged(auth, callback, () => callback(null));
}
export async function signInGoogle(): Promise<void> {
  if (!auth) throw new Error('Đăng nhập Google chưa được cấu hình cho thiết bị này.');
  await signInWithPopup(auth, new GoogleAuthProvider());
}
export async function signOutUser(): Promise<void> { if (auth) await signOut(auth); }
