import Root from './src/navigation/Root';
import {AuthProvider} from './src/context/AuthContext';
import store, {persistor} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ErrorBoundary from './src/helpers/ErrorBoundary';
const App = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Root />
          </PersistGate>
        </Provider>
      </AuthProvider>
    </ErrorBoundary>
  );
};
export default App;
