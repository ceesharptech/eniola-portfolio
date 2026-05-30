import app from "./config";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

const handleSignIn = async () => {
  await signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("Login Successful!");
      console.log("User Info:", user);
      console.log("Access Token:", token);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error("Login Failed!");
      console.error("Error Code:", errorCode);
      console.error("Error Message:", errorMessage);
      console.error("Email:", email);
      console.error("Credential:", credential);
    });
};

const handleSignOut = async () => {
  await signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("User signed out.");
    })
    .catch((error) => {
      console.error("Sign Out Failed!", error);
    });
};

export { auth, provider, handleSignIn, handleSignOut };
