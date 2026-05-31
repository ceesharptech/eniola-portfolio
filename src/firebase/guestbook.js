import { db } from "./firestore";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const guestbookCollection = collection(db, "guestbook");

const createGuestbookEntry = async ({
  name,
  message,
  uid,
  photoURL,
  signature,
}) => {
  const trimmedMessage = message?.trim();
  if (!trimmedMessage) {
    throw new Error("Message is required.");
  }

  if (trimmedMessage.length > 300) {
    throw new Error("Message is too long. Please limit to 300 characters.");
  }

  return addDoc(guestbookCollection, {
    name: name || "Anonymous",
    message: trimmedMessage,
    uid: uid || null,
    photoURL: photoURL || null,
    signature: signature || null,
    timestamp: serverTimestamp(),
  });
};

const getGuestbookEntries = async () => {
  const q = query(guestbookCollection, orderBy("timestamp", "desc"));
  const querySnapshot = await getDocs(q);
  const entries = [];
  querySnapshot.forEach((doc) => {
    entries.push({ id: doc.id, ...doc.data() });
  });
  return entries;
};

const subscribeToGuestbookEntries = (onEntries, onError) => {
  const q = query(guestbookCollection, orderBy("timestamp", "desc"));
  return onSnapshot(
    q,
    (snapshot) => {
      const entries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      onEntries(entries);
    },
    (error) => {
      if (onError) {
        onError(error);
      }
    },
  );
};

export {
  createGuestbookEntry,
  getGuestbookEntries,
  subscribeToGuestbookEntries,
};
