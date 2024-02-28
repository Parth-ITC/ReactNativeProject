import firestore from '@react-native-firebase/firestore';

class FirestoreHelper {
  // Get a reference to a Firestore collection
  static collection(collectionPath) {
    return firestore().collection(collectionPath);
  }

  // Get a reference to a Firestore document
  static doc(documentPath) {
    return firestore().doc(documentPath);
  }

  // Get data from a Firestore document
  static async getDocument(documentPath) {
    try {
      const documentSnapshot = await FirestoreHelper.doc(documentPath).get();
      if (documentSnapshot.exists) {
        return documentSnapshot.data();
      } else {
        // throw new Error('Document does not exist.');
        return null
      }
    } catch (error) {
      throw error;
    }
  }

  // Set data to a Firestore document
  static async setDocument(documentPath, data, options = {merge: true}) {
    try {
      await FirestoreHelper.doc(documentPath).set(data, options);
    } catch (error) {
      throw error;
    }
  }

  // Update data in a Firestore document
  static async updateDocument(documentPath, data) {
    try {
      await FirestoreHelper.doc(documentPath).update(data);
    } catch (error) {
      throw error;
    }
  }

  // Delete a Firestore document
  static async deleteDocument(documentPath) {
    try {
      await FirestoreHelper.doc(documentPath).delete();
    } catch (error) {
      throw error;
    }
  }

  // Query Firestore documents
  static async queryDocuments(collectionPath, conditions = []) {
    try {
      let query = firestore().collection(collectionPath);
      conditions.forEach(condition => {
        query = query.where(
          condition.field,
          condition.operator,
          condition.value,
        );
      });
      const querySnapshot = await query.get();
      const documents = [];
      querySnapshot.forEach(documentSnapshot => {
        documents.push({id: documentSnapshot.id, ...documentSnapshot.data()});
      });
      return documents;
    } catch (error) {
      throw error;
    }
  }

  // Listen for Updates
  static listenForUpdates = (collectionPath) => {
    return new Promise((resolve, reject) => {
      const unsubscribe = firestore().collection(collectionPath).onSnapshot(
        (querySnapshot) => {
          const documents = [];
          querySnapshot.forEach((documentSnapshot) => {
            documents.push({ id: documentSnapshot.id, ...documentSnapshot.data() });
          });
          resolve(documents);
        },
        (error) => {
          reject(error);
        }
      );

      // Return unsubscribe function
      return unsubscribe;
    });
  };
  
}

export default FirestoreHelper;
