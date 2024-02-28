import {useState, useEffect, useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';

const useFirestoreCollectionSnapshot = (
  collectionPath,
  currentUserUid = null,
  queryFn = ref => ref,
  dependencies = [],
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const memoizedQueryFn = useCallback(queryFn, dependencies);

  useEffect(() => {
    const collectionRef = firestore().collection(collectionPath);
    let filteredCollectionRef = collectionRef;
    const fetchData = async () => {
      const collectionData = await filteredCollectionRef.get();
      const initialData = collectionData.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
    };
    fetchData();

    if (typeof memoizedQueryFn === 'function') {
      try {
        filteredCollectionRef = memoizedQueryFn(collectionRef);
      } catch (err) {
        setError(err);
        setLoading(false);
        return;
      }
    }

    const unsubscribe = filteredCollectionRef.onSnapshot(
      querySnapshot => {
        const updatedData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log('HOW',updatedData);
        //   const filteredData = currentUserUid
        //     ? updatedData.filter(user => user.id !== currentUserUid)
        //     : updatedData;
          setData(updatedData);
          setLoading(false);
      },
      err => {
        setError(err);
        setLoading(false);
      },
    );

    return () => unsubscribe();
  }, [collectionPath, memoizedQueryFn, ...dependencies]);

  return {data, loading, error};
};

export default useFirestoreCollectionSnapshot;
