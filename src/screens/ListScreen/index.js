import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import {ICONS, bookDetails} from '../../constants';
import BookView from '../../components/BookView';
import ModalView from '../../components/ModalView';
import {useEffect, useState} from 'react';
import {getData, getDatadiff} from '../../api';
import storage from '../../helpers/storage';

const ListScreen = ({route, navigation}) => {
  const [isModalopen, setIsmodalOpen] = useState(false);
  const [bookData, setBookdata] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsloading(true);
    const books = await storage.get('BOOKS');
    if (books) {
      setBookdata(books);
      setIsloading(false);
    } else {
      try {
        const response = await getData('posts');
        // console.log(response,'SUCCESSS');
        setIsloading(false);
        if (response) {
          setBookdata(response);
          storage.set('BOOKS', response);
        }
      } catch (error) {
        setIsloading(false);
        console.log(error, '`errrorooro');
      }
    }
  };

  const renderBooks = ({item: booksItem, index}) => {
    return (
      <BookView
        item={booksItem}
        onPress={data => {
          navigation.navigate('Details', {bookData: data});
        }}
      />
    );
  };

  const onModalChange = () => setIsmodalOpen(previousState => !previousState);
  const addNewData = newData => {
    setBookdata([newData, ...bookData]);
    storage.set('BOOKS', [newData, ...bookData]);
    onModalChange();
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Book List'}
        right={true}
        rightIcon={ICONS.plus_icon}
        onRightPress={onModalChange}
      />
      <View style={{flex: 1}}>
        {isLoading ? (
          <ActivityIndicator animating size={'large'} />
        ) : (
          <FlatList
            data={bookData}
            extraData={bookData}
            contentContainerStyle={{paddingVertical: 5}}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderBooks}
          />
        )}
      </View>
      {/* <Button title='DeepView' onPress={()=>{navigation.navigate('DeepScreen')}} /> */}
      {isModalopen && (
        <ModalView
          isModalopen={isModalopen}
          onPress={onModalChange}
          onPressSubmit={addNewData}
        />
      )}
    </View>
  );
};

export default ListScreen;
