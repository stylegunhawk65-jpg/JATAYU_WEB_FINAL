import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  updateProfile
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const registerUser = async (email, password, name, abhaId) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile
    await updateProfile(user, { displayName: name });
    
    // Store additional info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      abhaId,
      createdAt: new Date().toISOString()
    });

    // Get JWT token and store
    const token = await user.getIdToken();
    localStorage.setItem("authToken", token);
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Get JWT token and store
    const token = await user.getIdToken();
    localStorage.setItem("authToken", token);
    
    return user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("authToken");
  } catch (error) {
    throw error;
  }
};
