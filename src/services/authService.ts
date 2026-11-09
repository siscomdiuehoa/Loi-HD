import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { Capacitor } from '@capacitor/core';
import { FirebaseAuthentication } from '@capacitor-firebase/authentication';

export type Account = { email: string | null; displayName: string | null };
export const appleAvailable = Capacitor.getPlatform() === 'ios' && import.meta.env.VITE_ENABLE_APPLE_SIGN_IN === 'true';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
export const googleAvailable = !Capacitor.isNativePlatform() && Object.values(config).every(Boolean);
const auth = googleAvailable ? getAuth(initializeApp(config)) : null;
export function observeUser(callback: (user: Account | null) => void): () => void {
  if (appleAvailable) {
    let disposed = false;
    let changed = false;
    const listener = FirebaseAuthentication.addListener('authStateChange', ({ user }) => { changed = true; if (!disposed) callback(user); });
    void listener.then(() => FirebaseAuthentication.getCurrentUser()).then(({ user }) => { if (!disposed && !changed) callback(user); }).catch(() => { if (!disposed) callback(null); });
    return () => { disposed = true; void listener.then(handle => handle.remove()).catch(() => {}); };
  }
  if (!auth) { callback(null); return () => {}; }
  return onAuthStateChanged(auth, callback, () => callback(null));
}
export async function signInGoogle(): Promise<void> {
  if (!auth) throw new Error('Đăng nhập Google chưa được cấu hình cho thiết bị này.');
  await signInWithPopup(auth, new GoogleAuthProvider());
}
export async function signInApple(): Promise<void> {
  if (!appleAvailable) throw new Error('Đăng nhập Apple chưa được cấu hình.');
  await FirebaseAuthentication.signInWithApple();
}
export async function signOutUser(): Promise<void> { if (appleAvailable) await FirebaseAuthentication.signOut(); else if (auth) await signOut(auth); }
