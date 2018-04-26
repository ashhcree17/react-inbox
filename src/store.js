import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    logger,
  )
)

export default store