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
    console.log(errorInfo);
  }

  render() {
    if (this.state.error) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>
            we know there is an error, we are working on it, come back here soon
          </Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
