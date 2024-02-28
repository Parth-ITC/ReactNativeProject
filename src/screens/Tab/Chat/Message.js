import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AuthContext from '../../../context/AuthContext';
import Header from '../../../components/Header';
import {COLORS, ICONS} from '../../../constants';
import {navigation} from '../../../navigation/rootNavigation';
import i18n from '../../../assets/locales/i18n';

import moment from 'moment';
import useFirestoreCollectionSnapshot from '../../../hooks/useFirestoreCollectionSnapshot';
const MessageScreen = ({route}) => {
  const {chatId, name} = route.params;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const {authData} = useContext(AuthContext);
    const queryFn = ref => ref.orderBy('timestamp', 'desc');
    const {
      data: messagesData,
      loading,
      error,
    } = useFirestoreCollectionSnapshot(`Chats/${chatId}/messages`, '', queryFn,[]);
    useEffect(()=>{
      setMessages(messagesData)
    },[messagesData])
//   useEffect(() => {
//     const unsubscribe = firestore()
//       .collection('Chats')
//       .doc(chatId)
//       .collection('messages')
//       .orderBy('timestamp', 'desc')
//       .onSnapshot(snapshot => {
//         const messagesData = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setMessages(messagesData);
//       });

//     return () => unsubscribe();
//   }, [chatId]);

  const sendMessage = async () => {
    if (text.trim() === '') return;

    try {
      await firestore()
        .collection('Chats')
        .doc(chatId)
        .collection('messages')
        .add({
          text,
          senderId: authData?.uid, // Replace with the current user's UID
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      firestore().collection('Chats').doc(chatId).update({
        lastUpdate: firestore.FieldValue.serverTimestamp(),
        lastMessage: text,
      });
      setText('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <Header
        title={name}
        left={true}
        leftIcon={ICONS.back_icon}
        onLeftPress={() => {
          navigation.goBack();
        }}
      />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjust as needed
      >
        <View style={{flex: 1, padding: 20}}>
          <FlatList
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <View
                style={[
                  styles.messageContainer,
                  {
                    alignSelf:
                      item.senderId === authData?.uid
                        ? 'flex-end'
                        : 'flex-start',
                    backgroundColor:
                      item.senderId === authData?.uid
                        ? COLORS.headerColor
                        : '#e0e0e0',
                  },
                ]}>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.messageTime}>
                  {moment(item?.timestamp?.toDate()).format('hh:mm a')}
                </Text>
              </View>
            )}
            inverted
          />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: 'gray',
                borderRadius: 5,
                padding: 10,
              }}
              value={text}
              onChangeText={setText}
              placeholder="Type your message..."
            />
            <TouchableOpacity
              onPress={sendMessage}
              style={{
                marginLeft: 10,
                padding: 10,
                backgroundColor: COLORS.btnColor,
                borderRadius: 5,
              }}>
              <Text style={{color: 'white'}}>
                {i18n.t('messageScreen.sendButton')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
const styles = StyleSheet.create({
  messageContainer: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    maxWidth: '70%',
    backgroundColor: '#e0e0e0',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageTime: {
    fontSize: 12,
    color: 'gray',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});
export default MessageScreen;
