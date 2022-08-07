import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { Provider } from "react-redux";
import store from './redux/redux.js'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

let persistor = persistStore(store);
import './i18n.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <React.StrictMode>
   
          <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate> 
   
  </React.StrictMode>
  </Provider>
);