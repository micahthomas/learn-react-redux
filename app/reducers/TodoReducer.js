import {createStore, combineReducers} from 'redux';

import firebase from '../utils/Firebase.js';

import {
  SET_USER,
  TODOS_LOADED_SUCCESS,
  TODO_CREATED_SUCCESS,
  TODO_UPDATED_SUCCESS,
  TODO_MOVED_SUCCESS,
  TODO_DELETED_SUCCESS,
  FILTER_TODOS
} from '../constants/TodoActionTypes';

export const TodosState = {
  filter: {},
  ref: null,
  todos: null,
  userId: null,
  previous: null,
  deleted: null
};

function cleanUpOldRef(state) {
  // Check for existing refs and listeners
  if (state.ref) {
    // Turn off all listeners
    state.ref.off()
  }
}

export function TodoReducer(state = TodosState, {type, payload}) {
  switch(type) {
    case SET_USER:
      cleanUpOldRef(state);
      return {
        ...state,
        ref: firebase.database().ref('todos/'+payload.userId),
        userId: payload.userId
      }
    case TODOS_LOADED_SUCCESS:
      return {
        ...state,
        todos: payload.val()
      }
    case TODO_CREATED_SUCCESS:
    case TODO_UPDATED_SUCCESS:
      let newState = {
        ...state,
        previous: state.todos
      };
      newState.todos[payload.key] = payload.val();
      return newState;
    case TODO_MOVED_SUCCESS:
      // TODO: make sure to pass old_key to the TODO_MOVED_SUCCESS action, the function will be passed two args
      // snapshot and the old_key
      let newState = {
        ...state,
        previous: state.todos,
        todos: _.omit(state.todos, payload.old_key)
      };
      newState.todos[payload.key] = state.todos[payload.old_key];
      return newState;
    case TODO_DELETED_SUCCESS:
      return {
        ...state,
        todos: _.omit(state.todos, payload.key)
        previous: state.todos,
        deleted: state.todos[payload.key]
      };
    default:
      return state;
  }
}
