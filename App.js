import Root from './src/navigation/Root';
import {AuthProvider} from './src/context/AuthContext';
import store, {persistor} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ErrorBoundary from './src/helpers/ErrorBoundary';
import * as Sentry from '@sentry/react-native';
import {useEffect} from 'react';

// Sentry.init({
//   dsn: 'https://8397dc0d141115a6a70b3bb1ce802eb7@o4506734004797440.ingest.sentry.io/4506745356288000',
// });

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
