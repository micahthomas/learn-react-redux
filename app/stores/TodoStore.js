import {createStore, combineReducers} from 'redux';
import * as TodoActionTypes from '../constants/TodoActionTypes';

const todoReducer = function(state = [], action) {
  switch (action.type) {
    case TodoActionTypes.LOAD_TODOS:
      state = [
        ...state,
        ...action.todos
      ];
      break;
  }
  return state;
}

const reducers = combineReducers({todos: todoReducer});

export const TodoStore = createStore(reducers);

TodoStore.subscribe(() => {
  console.log("store changed", TodoStore.getState());
});

TodoStore.dispatch({type: TodoActionTypes.LOAD_TODOS, todos: [
  {
    id: Date.now(),
    text: 'hello world!'
  }
]})
