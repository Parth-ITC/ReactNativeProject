
import auth from '@react-native-firebase/auth';

// Function to handle user login
export const loginUser = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Function to handle user registration
export const registerUser = async ({email, password}) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Function to handle user logout
export const logoutUser = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    throw error;
  }
};

// Function to get the current user
export const getCurrentUser = () => {
  return auth().currentUser;
};
