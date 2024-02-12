import AsyncStorage from '@react-native-async-storage/async-storage';

let listeners = [];

export default {
  async get(key, defaultValue) {
    try {
      return JSON.parse(await AsyncStorage.getItem(key)) || defaultValue;
    } catch (e) {
      return (await AsyncStorage.getItem(key)) || defaultValue;
    }
  },
  set(key, value) {
    return AsyncStorage.setItem(
      key,
      typeof value === 'object' ? JSON.stringify(value) : value,
    );
  },
  clear() {
    listeners.forEach(listener => listener('clear'));
    return AsyncStorage.clear();
  },
  listen(cb) {
    listeners.push(cb);
  },
  async removeallData(){
    try {
      await AsyncStorage.getAllKeys()
        .then(keys => AsyncStorage.multiRemove(keys))
        .then(() => {
          return
        });
    } catch (error) {
      console.log(error,'ERROR');
    }
  }
};
