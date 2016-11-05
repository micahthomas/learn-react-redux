import {createStore, combineReducers} from 'redux';

import firebase from '../utils/Firebase.js';

import {
  LOAD_TODOS_SUCCESS,
  UPDATE_TODOS_SUCCESS,
  CREATE_TODOS_SUCCESS,
  DELETE_TODOS_SUCCESS,
  FILTER_TODOS
} from '../constants/TodoActionTypes';

export const TodosState = {
  filter: {},
  ref: null,
  list: null,
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

export function TodoReducer(state = new TodosState(), {type, payload}) {
  switch(type) {
    case LOAD_TODOS_SUCCESS:
      cleanUpOldRef(state);
      return {
        ...state,
        ...payload
      }
    case CREATE_TODOS_SUCCESS:
      let newState = {...state};
      newState.list[payload.key] = payload;
      return newState;
    case UPDATE_TODOS_SUCCESS:
      let newState = {...state};
      newState.list[payload.key] = payload;
    default:
      return state;
  }
}
