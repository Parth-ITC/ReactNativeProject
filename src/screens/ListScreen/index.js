import {Alert, FlatList, Text, TouchableOpacity, View} from 'react-native';
import styles from './styles';
import Header from '../../components/Header';
import {ICONS, bookDetails} from '../../constants';
import BookView from '../../components/BookView';
import ModalView from '../../components/ModalView';
import {useState} from 'react';

const ListScreen = ({route, navigation}) => {
  const [isModalopen, setIsmodalOpen] = useState(false);
  const [bookData, setBookdata] = useState(bookDetails);


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
  const addNewData = (newData) =>{
    setBookdata([newData,...bookData])
    onModalChange()
  }

  return (
    <View style={styles.container}>
      <Header title={'Book List'} right={true} rightIcon={ICONS.plus_icon} onRightPress={onModalChange} />
      <View style={{flex: 1}}>
        <FlatList
          data={bookData}
          extraData={bookData}
          contentContainerStyle={{paddingVertical: 5}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderBooks}
        />
      </View>
     {isModalopen && <ModalView isModalopen={isModalopen} onPress={onModalChange} onPressSubmit={addNewData} />}
    </View>
  );
};

export default ListScreen;
