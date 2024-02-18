import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formField: {
    paddingVertical: 10,
    flexDirection: 'row',
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  labelView: {
    width: '35%',
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  imageOuterview: {
    marginVertical: 20,
    height: 100,
    width: 100,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'red',
    alignSelf: 'center',
    overflow: 'hidden',
  },
  imageView: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});

export default styles;
