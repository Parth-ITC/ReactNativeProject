import {useState, useEffect, useCallback} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';

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

  useFocusEffect(
    useCallback(() => {
      let unsubscribe;
      const fetchData = async () => {
        const collectionRef = firestore().collection(collectionPath);
        let filteredCollectionRef = collectionRef;
        const collectionData = await filteredCollectionRef.get();
        const initialData = collectionData.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        if (typeof memoizedQueryFn === 'function') {
          try {
            filteredCollectionRef = memoizedQueryFn(collectionRef);
          } catch (err) {
            setError(err);
            setLoading(false);
            return;
          }
        }

        unsubscribe = filteredCollectionRef.onSnapshot(
          querySnapshot => {
            const updatedData = querySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
            }));
            console.log('HOW', updatedData);
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
      };
      fetchData();
      return () => unsubscribe();
    }, [collectionPath, memoizedQueryFn, ...dependencies]),
  );

  return {data, loading, error};
};

export default useFirestoreCollectionSnapshot;
