import { applyMiddleware, compose, createStore, StoreEnhancer } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import AppSaga from '@/saga'
import reducers, { AppState } from '@/reducer'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

let enhancer: StoreEnhancer

if (process.env.NODE_ENV === 'development') {
  enhancer = composeWithDevTools(applyMiddleware(...middlewares))
}

if (process.env.NODE_ENV === 'production') {
  enhancer = compose(applyMiddleware(...middlewares))
}

export default function configureStore() {
  const store = createStore<AppState, any, any, any>(reducers, enhancer)
  sagaMiddleware.run(AppSaga)
  return store
}
