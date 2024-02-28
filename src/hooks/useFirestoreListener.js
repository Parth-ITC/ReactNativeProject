import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const useFirestoreListener = (collectionPath, documentPath) => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let subscriber;
    const fetchIntialData = async () => {
      setLoading(true)
      const documentSnapshot = await firestore()
        .collection(collectionPath)
        .doc(documentPath)
        .get();

      const initialData = {id: documentSnapshot.id, ...documentSnapshot.data()};
      console.log('initialData');
      subscriber = firestore()
        .collection(collectionPath)
        .doc(documentPath)
        .onSnapshot(
          documentSnapshot => {
            if(documentSnapshot.data()){
              const updatedData = {
                id: documentSnapshot.id,
                ...documentSnapshot.data(),
              };
              console.log( updatedData);
              setData(updatedData);
            }
            setLoading(false)

          },
          error => {
            setError(error);
            setLoading(false)

          },
          
        );
    };
    fetchIntialData();

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [collectionPath, documentPath]);

  return {data, error,loading};
};

export default useFirestoreListener;
