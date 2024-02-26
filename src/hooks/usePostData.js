import {useState, useEffect} from 'react';
import {getData} from '../api';
import storage from '../helpers/storage';

const usePostData = () => {
  const [postData, setPostdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    const books = await storage.get('BOOKS');
    if (books) {
      setPostdata(books);
      setLoading(false);
    } else {
      try {
        const response = await getData('posts');
        if (response) {
          setPostdata(response);
          storage.set('BOOKS', response);
          setError(null);
        }
      } catch (error) {
        console.log(error, '`errrorooro');
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  return {postData, error, loading};
};

export default usePostData;
