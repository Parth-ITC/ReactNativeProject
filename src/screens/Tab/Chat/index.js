import {View, Text, FlatList} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import styles from './styles';
import Header from '../../../components/Header';
import {ICONS} from '../../../constants';
import UserListModal from '../../../components/UserListModal';
import AuthContext from '../../../context/AuthContext';
import UserAvatar from '../../../components/UserAvatar';
import useFirestoreCollectionSnapshot from '../../../hooks/useFirestoreCollectionSnapshot';
import moment from 'moment';
import firestore from '@react-native-firebase/firestore';
import FirestoreHelper from '../../../helpers/FireStoreHelper';
import {getChatId} from '../../../helpers/helper';
import {navigation} from '../../../navigation/rootNavigation';
import { useFocusEffect } from '@react-navigation/native';
const Chat = props => {
  const [ismodalOpen, setIsmodalOpen] = useState(false);
  const {authData} = useContext(AuthContext);
  const onModalChange = () => setIsmodalOpen(previousState => !previousState);
  const query1Fn = ref => ref.where('id', '!=', authData?.uid);
  const {
    data: userData,
    loading,
    error,
  } = useFirestoreCollectionSnapshot('Users', authData?.uid, query1Fn, []);
  const queryFn = ref => ref.where('user1Id', '==', authData?.uid);
  const query2Fn = ref => ref.where('user2Id', '==', authData?.uid);
  const {
    data: chat1Data,
    loading: chatloading,
    error: chatError,
  } = useFirestoreCollectionSnapshot('Chats', authData?.uid, queryFn, []);

  const {data: chat2Data} = useFirestoreCollectionSnapshot(
    'Chats',
    authData?.uid,
    query2Fn,
    [],
  );
  
  const allChatdata = useMemo(() => {
    const mergedChats = [...chat2Data, ...chat1Data];
    return mergedChats.sort((a, b) => {
      // const timestampA =
      //   a.lastUpdate instanceof firestore.Timestamp
      //     ? a.lastUpdate.toMillis()
      //     : a.lastUpdate;
      // const timestampB =
      //   b.lastUpdate instanceof firestore.Timestamp
      //     ? b.lastUpdate.toMillis()
      //     : b.lastUpdate;
      //     console.log(timestampB, "timestampB");
      //     console.log(timestampA, "timestampA");
      return b.lastUpdate - a.lastUpdate;
    });
  }, [chat1Data, chat2Data]);

  const renderItem = useCallback(
    ({item, index}) => {
      return (
        <UserAvatar
          name={item.firstName + ' ' + item.lastName}
          onPress={() => {
            console.log(item);
            onModalChange();
            onClickChatButton(item);
          }}
          avatarUrl={item.image}
        />
      );
    },
    [userData],
  );
  const getUser = data => {
    let otherUserId;
    if (data.user1Id !== authData?.uid) {
      otherUserId = data.user1Id;
    } else if (data.user2Id !== authData?.uid) {
      otherUserId = data.user2Id;
    }
    const userD = userData.find(i => i.id == otherUserId);
    console.log(userD, 'GHJH');
    return userD;
  };

  const keyExtractor = useCallback((item, index) => index.toString(), []);
  const keyExtractor2 = useCallback(
    (item, index) => 'chats' + index.toString(),
    [],
  );

  const onClickChatButton = async item => {
    try {
      const chatId = getChatId(authData?.uid, item?.id);
      // Query for chats where user1Id is currentUser and user2Id is selectedUserId
      const querySnapshot1 = await FirestoreHelper.getDocument(
        `Chats/${chatId}`,
      );
      if (!querySnapshot1) {
        await firestore().collection('Chats').doc(chatId).set({
          user1Id: authData?.uid,
          user2Id: item?.id,
          lastUpdate: firestore.FieldValue.serverTimestamp(),
          // Add any other initial data to the chat
        });
      }
      navigation.navigate('MessageScreen', {
        chatId: chatId,
        name: item?.firstName + ' ' + item?.lastName,
      });
    } catch (error) {
      console.error('Error handling chat button click:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title={'Chat'}
        right={true}
        rightIcon={ICONS.plus_icon}
        onRightPress={onModalChange}
      />
      <FlatList
        data={allChatdata}
        keyExtractor={keyExtractor2}
        renderItem={({item}) => {
          const user = getUser(item); // Call the getUser function to get the user data
          return (
            <UserAvatar
              name={user ? user?.firstName + '  ' + user?.lastName : ''}
              onPress={() => {
                onClickChatButton(user);
              }}
              data={item}
              avatarUrl={user ? user?.image : ''}
            />
          );
        }}
      />
      {ismodalOpen && (
        <UserListModal
          isModalopen={ismodalOpen}
          headerName={'Users'}
          onPress={onModalChange}>
          <View style={{flex: 1, paddingVertical: 5}}>
            <FlatList
              data={userData ?? []}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
            />
          </View>
        </UserListModal>
      )}
    </View>
  );
};

export default Chat;
