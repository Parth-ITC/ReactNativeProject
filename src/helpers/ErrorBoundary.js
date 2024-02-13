import {Text, View} from 'react-native';
import React, {Component} from 'react';

export class ErrorBoundary extends Component {
  state = {
    error: false,
  };

  static getDerivedStateFromError(error) {
    return {error: true};
  }

  componentDidCatch(error, errorInfo) {
    console.log(errorInfo,error);
    throw new Error(errorInfo)
  }

  render() {
    if (this.state.error) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>
            Ooops! Something is wrong.
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
