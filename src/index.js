import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';
import { Provider } from 'react-redux'
import { legacy_createStore as createStore } from 'redux';
import reducer from '../src/reducer/index'
import { ContextProvider } from './hooks/useStateContext';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: "#673ab7ed",
      default: "#4A2886",
    }
  },
  
  typography:{
    fontFamily:'"Roboto"'
  }
})
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__()
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <ContextProvider>
    <Provider store = {store}>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App  />
    </ThemeProvider>
    </Provider>
    </ContextProvider>
</React.StrictMode>

);


