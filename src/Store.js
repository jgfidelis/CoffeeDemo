import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

import sagas from './sagas/sagas';

import reducers from './reducers/reducers';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configPersist = {
  storage,
  key: 'coffee',
  whitelist: [],
};

// @ts-ignore
const reducerWithPersist = persistReducer(configPersist, reducers);

const Store = createStore(reducerWithPersist, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(sagas);

// Cannot use module with TS, need to configure properly
// if (module.hot) {
//   module.hot.accept(() => {
//     const nextRootReducer = require('../reducers/index').default;
//     Store.replaceReducer(nextRootReducer);
//   });
// }

export const Persistor = persistStore(Store);

export default Store;
