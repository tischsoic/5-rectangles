import { createStore } from 'redux';
import { List } from 'immutable';
import rootReducer from '../reducer';
import { RectangleRecord, AppState } from '../models';

const localStorageReduxStateKey = '5squares.reduxState';

function getAppStateFromLocalStorage() {
  const stateJSONFromLocalStorage = localStorage.getItem(
    localStorageReduxStateKey,
  );
  const persistedState = stateJSONFromLocalStorage
    ? JSON.parse(stateJSONFromLocalStorage)
    : undefined;

  return persistedState
    ? new AppState({
        lastId: persistedState.lastId,
        rectanglesCombinedWidth: persistedState.rectanglesCombinedWidth,
        rectangles: List(
          persistedState.rectangles.map((el) => new RectangleRecord(el)),
        ),
      })
    : undefined;
}

export default function configureStore() {
  /* eslint-disable no-underscore-dangle */
  const initialState = getAppStateFromLocalStorage();
  const store = createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
  /* eslint-enable */

  store.subscribe(() => {
    localStorage.setItem(
      localStorageReduxStateKey,
      JSON.stringify(store.getState()),
    );
  });
  if (module.hot) {
    module.hot.accept('../reducer', () => {
      const nextReducer = require('../reducer').default; // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
