import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import reduxThunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'
import allReducers, { whiteList } from './reducers'
import { LOCAL_STORE_KEY } from 'contants/reduxContants'

// 持久化状态
const persistConfig = {
  key: LOCAL_STORE_KEY,
  storage,
  // blacklist: blackList,
  whitelist: whiteList
}

const persistedReducer = persistReducer(persistConfig, allReducers)

let store = createStore(persistedReducer, applyMiddleware(reduxThunk))
let persistor = persistStore(store)
export { store, persistor }