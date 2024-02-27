import React, { useState } from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import Loader from '../components/Loader';

// Higher Order Component (HOC) for adding a loader to screens
const withLoader = WrappedComponent => {
  return props => {
    const [loading,setLoading] = useState(false)


    return <>
     <WrappedComponent {...props} setLoading={setLoading} />
     <Loader visible={loading} />
    </>;
  };
};
export default withLoader;
