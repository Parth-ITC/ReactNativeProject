import {View, Text, Button} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../../components/Header';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import storage from '../../helpers/storage';
import {FRUITS, ICONS} from '../../constants';
import FruitList from '../../components/FruitList';
import {addToCart, removeCart} from '../../redux/slices/cartSlice';
import {cartAddChange, cartRemoveChange} from '../../redux/slices/cartSlice';
const CartScreen = ({navigation}) => {
  const cartData = useSelector(state => state.cart.cartData);
  const dispatch = useDispatch();

  const handleCart = useCallback((item, type) => {
    if (type == 'ADD') {
      // dispatch(addToCart(item));
      dispatch(cartAddChange(item));
    } else {
      dispatch(cartRemoveChange(item));
    }
  }, []);
  const totalPrice = useMemo(() => {
    return cartData.reduce((n, {total}) => n + total, 0);
  }, [cartData]);
  return (
    <View style={styles.container}>
      <Header
        title={'Cart'}
        left={true}
        leftIcon={ICONS.back_icon}
        onLeftPress={() => {
          navigation.goBack(null);
        }}
      />
      {cartData.length > 0 ? (
        <FruitList data={cartData} isfromCart={true} onPress={handleCart} />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>No Items in cart</Text>
        </View>
      )}
      <View style={styles.bottomView}>
        <Text>Total: </Text>
        <Text>£{totalPrice}</Text>
      </View>
    </View>
  );
};

export default CartScreen;
