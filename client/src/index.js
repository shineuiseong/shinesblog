import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
// import reportWebVitals from './reportWebVitals';

/* Redux */
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

/* Reducer */
import userReducer from 'store/user'
import loginStepReducer from 'store/loginStep'
import postReducer from 'store/post'
import writeReducer from 'store/write'
import readReducer from 'store/read'

/* Toast 알람창 */
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'],
}

const reducers = combineReducers({
  user: userReducer,
  loginStep: loginStepReducer,
  post: postReducer,
  write: writeReducer,
  read: readReducer,
})

const _persistedReducer = persistReducer(persistConfig, reducers)

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
})

const store = configureStore({
  reducer: _persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: customizedMiddleware,
})
const persistor = persistStore(store)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals()
