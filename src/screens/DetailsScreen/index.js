import {Text, View} from 'react-native';
import Header from '../../components/Header';
import styles from './styles';
import { ICONS } from '../../constants';

const DetailsScreen = ({route, navigation}) => {
  const {bookData} = route?.params
  return (
    <View style={styles.container}>
      <Header title={'Details'} left={true} leftIcon={ICONS.back_icon} onLeftPress={() => {navigation.goBack(null)}} />
      <View style={{flex: 1,alignItems:'center',padding:15,justifyContent:'center'}}>
      <Text style={styles.boldText}>Title: <Text style={styles.lightfont}>{bookData?.title}</Text></Text>
      <Text style={styles.boldText}>Description: <Text style={styles.lightfont}>{bookData?.description}</Text></Text>
      <Text style={styles.boldText}>Author: <Text style={styles.lightfont}>{bookData?.author}</Text></Text>

      </View>
    </View>
  );
};

export default DetailsScreen;
