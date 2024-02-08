import Root from './src/navigation/Root';
import {AuthProvider} from './src/context/AuthContext';
import store,{ persistor } from './src/store';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
const App = () => {
  return (
    <AuthProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Root />
        </PersistGate>
      </Provider>
    </AuthProvider>
  );
};
export default App;
