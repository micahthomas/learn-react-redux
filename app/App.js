import React from 'react'
import { render} from 'react-dom'
import { createStore} from 'redux'
import { Provider} from 'react-redux'
import Todos from './pages/Todos'
import reducer from './reducers'

const store = createStore(reducer)

const app = document.getElementById('app')

render(
  <Provider store={store}>
    <Todos userId='micah' />
  </Provider>,
  app
)
