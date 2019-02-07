import { createStore , applyMiddleware , compose } from 'redux';

import thunk from 'redux-thunk';
import rootReducer from '../Reducers/rootReducer';
export default function configureStore(initailState) {
  return createStore(
    rootReducer,
    initailState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : (f) => f    
    )
  );
}