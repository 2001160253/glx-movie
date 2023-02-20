import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reducers from './Component/reducers';
import rootSaga from './Component/store/saga-action';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter, RouterProvider } from "react-router-dom";
import './common.css'



// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// const root = ReactDOM.createRoot(document.getElementById('root'));



const sagaMiddleware = createSagaMiddleware();
let store = createStore(
  reducers,
  compose(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

