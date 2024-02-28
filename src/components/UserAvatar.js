import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, ICONS} from '../constants';
import moment from 'moment';
const UserAvatar = ({name, avatarUrl, onPress, data = {}}) => {
  console.log(data, 'DATAADADADAD');
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={
          avatarUrl
            ? {uri: avatarUrl}
            : {
                uri: 'https://amaxfireandsecurity.co.uk/wp-content/uploads/2023/12/profile-pic-MD.jpg',
              }
        }
        style={styles.avatar}
      />
      <View style={{flex: 1}}>
        <Text style={styles.name}>{name}</Text>
        {data?.lastMessage && (
          <Text numberOfLines={1} style={styles.lastmessageText}>{data?.lastMessage}</Text>
        )}
      </View>
      {data?.lastUpdate && (
        <View>
          <Text>{moment(data?.lastUpdate?.toDate()).format('DD/MM/YYYY')}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightBackground,
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  lastmessageText: {
    fontSize: 12,
    fontWeight: '400',
  },
});

export default UserAvatar;
