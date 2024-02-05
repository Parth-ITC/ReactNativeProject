import Root from './src/navigation/Root';
import {AuthProvider} from './src/context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
};
export default App;
