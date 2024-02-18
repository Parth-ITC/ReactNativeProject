import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBox: {
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  imageView: {
    height: 150,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  secondView: {
    marginHorizontal: 20,
  },
  btnView: {
    backgroundColor: COLORS.btnColor,
    marginVertical: 15,
    marginHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  inputBox: {
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  endView:{
    justifyContent:'center',
    alignItems:'center'
  }
});

export default styles;
