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
  try {
    const shouldRedirect = forceRedirect || isMobileDevice();
    if (shouldRedirect) {
      await signInWithRedirect(auth, provider);
      return null;
    }
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    throw error;
  }
};

const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    return result?.user || null;
  } catch (error) {
    throw error;
  }
};

const handleSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export { auth, provider, handleSignIn, handleSignOut, handleRedirectResult };
