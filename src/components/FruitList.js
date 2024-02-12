import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useMemo} from 'react';
import {COLORS} from '../constants';
import {useSelector} from 'react-redux';
import Icons from 'react-native-vector-icons/dist/AntDesign';
const FruitList = ({data, onPress, isfromCart}) => {
  const cartData = useSelector(state => state.cart?.cartData);

  const checkItem = useCallback(
    item => {
      const itemPresentAtIndex = cartData.findIndex(thisElement => {
        return thisElement.item.name === item.name;
      });
      if (itemPresentAtIndex !== -1) {
        return cartData[itemPresentAtIndex];
      }
      return false;
    },
    [cartData],
  );

  const renderItem = useCallback(
    ({item, index}) => {
      let itemData = item;
      if (isfromCart) {
        itemData = item.item;
      }
      const cartItem = checkItem(itemData);
      return (
        <View style={styles.outereview}>
          <Image source={{uri: itemData?.image}} style={styles.itemImage} />
          <View style={{flex: 1}}>
            <Text>{itemData.name}</Text>
            <Text>£{itemData.price}</Text>
          </View>

          {cartItem ? (
            <>
              <View style={styles.btnView}>
                <Icons
                  onPress={() => {
                    onPress(itemData, 'REMOVE');
                  }}
                  name={'minussquare'}
                  size={20}
                  color={COLORS.btnColor}
                />
                <View style={styles.singleBtn}>
                  <Text>{cartItem?.quantity}</Text>
                </View>
                <Icons
                  onPress={() => {
                    onPress(itemData, 'ADD');
                  }}
                  name={'plussquare'}
                  size={20}
                  color={COLORS.btnColor}
                />
              </View>
              {isfromCart && (
                <Text style={{marginLeft: 10}}>£{cartItem.total}</Text>
              )}
            </>
          ) : (
            <TouchableOpacity
              onPress={() => {
                onPress(itemData, 'ADD');
              }}
              style={styles.addView}>
              <Text>Add</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    },
    [cartData],
  );
  const keyExtractor = useCallback((item, index) => index.toString(), []);
  return (
    <>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </>
  );
};

export default React.memo(FruitList);

const styles = StyleSheet.create({
  outereview: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLORS.btnColor,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  singleBtn: {
    paddingVertical: 5,
    marginHorizontal: 5,
  },
  itemImage: {
    height: 30,
    width: 30,
    marginRight: 20,
  },
});
