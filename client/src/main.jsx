import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { persistor, store } from './redux/store';
import { ThemeProvider } from './components/theme-provider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Toaster position="bottom-center" reverseOrder={false} />
      <App />
    </ThemeProvider>
    </PersistGate>
  </Provider>,
);
