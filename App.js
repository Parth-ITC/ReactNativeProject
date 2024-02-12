import Root from './src/navigation/Root';
import {AuthProvider} from './src/context/AuthContext';
import store, {persistor} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import ErrorBoundary from './src/helpers/ErrorBoundary';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://5f9192a83b1cb32e63852390fac685f9@o4506734004797440.ingest.sentry.io/4506734004928512',
});
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
export default Sentry.wrap(App);
