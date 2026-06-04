import app from "./config";
import {
  getAuth,
  GoogleAuthProvider,
  getRedirectResult,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const isMobileDevice = () =>
  typeof navigator !== "undefined" &&
  /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const handleSignIn = async ({ forceRedirect = false } = {}) => {
  const shouldRedirect = forceRedirect || isMobileDevice();
  if (shouldRedirect) {
    await signInWithRedirect(auth, provider);
    return null;
  }
  const result = await signInWithPopup(auth, provider);
  return result.user;
};

const handleRedirectResult = async () => {
  const result = await getRedirectResult(auth);
  return result?.user || null;
};

const handleSignOut = async () => {
  await signOut(auth);
};

export { auth, provider, handleSignIn, handleSignOut, handleRedirectResult };
