import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { IMAGES } from '../../constants'

const SplashScreen = () => {
  return (
    <View style={styles.container}>
        <Image source={IMAGES.logo} style={styles.imageView}/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    imageView:{
        height:200,
        aspectRatio:1,
        resizeMode:'contain'
    }
})