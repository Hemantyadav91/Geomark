import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut 
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./config";
import { User, Role } from "../types/auth";

const googleProvider = new GoogleAuthProvider();

export const signupWithEmail = async (email: string, password: string, name: string, role: Role): Promise<User> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user: User = {
    uid: userCredential.user.uid,
    name,
    email,
    role,
  };
  
  await setDoc(doc(db, "users", user.uid), user);
  return user;
};

export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
  
  if (!userDoc.exists()) {
    throw new Error("User record not found");
  }

  return userDoc.data() as User;
};

export const signInWithGoogle = async (role: Role = 'student'): Promise<User> => {
  const userCredential = await signInWithPopup(auth, googleProvider);
  const userRef = doc(db, "users", userCredential.user.uid);
  const userDoc = await getDoc(userRef);

  if (userDoc.exists()) {
    return userDoc.data() as User;
  } else {
    // Register the new user
    const user: User = {
      uid: userCredential.user.uid,
      name: userCredential.user.displayName || "User",
      email: userCredential.user.email || "",
      role,
    };
    await setDoc(userRef, user);
    return user;
  }
};

export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};
