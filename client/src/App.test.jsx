import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './redux/store';
import App from './App';
import './index.css';
import { ThemeProvider } from './components/theme-provider';

describe('App', () => {
  it('checking whetever service text is available', () => {
    render(
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <App />
          </ThemeProvider>
        </PersistGate>
      </Provider>,
    );
    const text = screen.getByText('Services');
    expect(text).toBeInTheDocument();
  });
});
