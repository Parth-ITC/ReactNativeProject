import {View, Text, Button} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import Header from '../../../components/Header';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import storage from '../../../helpers/storage';
import {FRUITS, ICONS} from '../../../constants';
import FruitList from '../../../components/FruitList';
import {addToCart, removeCart} from '../../../redux/slices/cartSlice';
const Dashboard = ({navigation}) => {
  const [fruitData, setFruitdata] = useState([]);
  const cartData = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    getFruits();
  }, []);

  const getFruits = async () => {
    const fruits = await storage.get('FRUITS');
    if (fruits) {
      setFruitdata(fruits);
    } else {
      setFruitdata(FRUITS);
      storage.set('FRUITS', FRUITS);
    }
  };

  const handleCart = useCallback((item, type) => {
    if (type == 'ADD') {
      dispatch(addToCart(item));
    } else {
      dispatch(removeCart(item));
    }
  }, []);

  return (
    <View style={styles.container}>
      <Header
        title={'Dashboard'}
        right={true}
        rightIcon={ICONS.cart_icon}
        onRightPress={() => {navigation.navigate('Cart')}}
      />
      <FruitList data={fruitData} onPress={handleCart} />
    </View>
  );
};

export default Dashboard;
