import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/config";

export const triggerSOS = async (userId, location) => {
  try {
    const sosRef = doc(db, "sos_logs", userId);
    await setDoc(sosRef, {
      time: new Date().toISOString(),
      location: {
        lat: location[0],
        lng: location[1]
      },
      triggered: true
    }, { merge: true }); // merge in case it already exists
  } catch (error) {
    console.error("Error triggering SOS:", error);
    throw error;
  }
};

export const addFamilyMember = async (userId, member) => {
  try {
    const familyRef = doc(db, "familyMembers", userId);
    // Use arrayUnion to append
    await setDoc(familyRef, {
      members: arrayUnion(member)
    }, { merge: true });
  } catch (error) {
    console.error("Error adding family member:", error);
    throw error;
  }
};

export const getFamilyMembers = async (userId) => {
  try {
    const familyRef = doc(db, "familyMembers", userId);
    const docSnap = await getDoc(familyRef);
    if (docSnap.exists()) {
      return docSnap.data().members || [];
    }
    return [];
  } catch (error) {
    console.error("Error getting family members:", error);
    throw error;
  }
};
