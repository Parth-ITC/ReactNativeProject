import React, {useState} from 'react';
import {View, Modal, TouchableOpacity, Text, Image} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const ImagePickerModal = ({visible, onClose, onImageSelected}) => {
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  const handleImagePicker = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response.assets[0]?.uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0]?.uri};
        onImageSelected(response.assets[0]?.uri);
      }
    });
  };

  const handleCamera = async () => {
    const options = {
      title: 'Select Avatar',
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response?.assets[0]?.uri};
        onImageSelected(response?.assets[0]?.uri);
      }
    });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{backgroundColor: '#fff', padding: 20, borderRadius: 5}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#0080c0',
              padding: 10,
              borderRadius: 5,
              marginBottom: 20,
            }}
            onPress={handleImagePicker}>
            <Text style={{color: '#fff'}}>Select Image from Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{backgroundColor: '#0080c0', padding: 10, borderRadius: 5}}
            onPress={handleCamera}>
            <Text style={{color: '#fff'}}>Take Image from Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#0080c0',
              padding: 10,
              borderRadius: 5,
              marginTop: 20,
            }}
            onPress={onClose}>
            <Text style={{color: '#fff'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ImagePickerModal;
