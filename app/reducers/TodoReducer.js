import * as _ from 'lodash';

import {
  SET_USER,
  TODOS_LOADED_SUCCESS,
  TODO_CREATED_SUCCESS,
  TODO_UPDATED_SUCCESS,
  TODO_MOVED_SUCCESS,
  TODO_DELETED_SUCCESS,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO
} from '../constants/TodoActionTypes';

export const InitialState = {
  filter: {},
  ref: null,
  list: {},
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

export default function TodoReducer(state = InitialState, {type, payload}) {
  switch(type) {
    case CREATE_TODO:
      state.ref.push(payload.todo);
      return state;

    case DELETE_TODO:
      state.ref.child(payload.id).set(null);
      return state;

    case UPDATE_TODO:
      state.ref.child(payload.id).set(payload.todo);
      return state;
  }

  let newState = {...state};
  switch(type) {
    case SET_USER:
      cleanUpOldRef(state);
      newState.ref = payload.ref;
      newState.userId = payload.userId;
      return newState;

    case TODOS_LOADED_SUCCESS:
      newState.list = payload.val();
      return newState;

    case TODO_CREATED_SUCCESS:
    case TODO_UPDATED_SUCCESS:
      newState.previous = state.list;
      newState.list[payload.key] = payload.val();
      return newState;

    case TODO_MOVED_SUCCESS:
      // TODO: make sure to pass old_key to the TODO_MOVED_SUCCESS action, the function will be passed two args
      // snapshot and the old_key
      newState.previous = state.list;
      newState.list = _.omit(state.list, payload.old_key);
      newState.list[payload.key] = state.list[payload.old_key];
      return newState;

    case TODO_DELETED_SUCCESS:
      newState.list = _.omit(state.list, payload.key);
      newState.previous = state.list;
      newState.deleted = state.list[payload.key];
      return newState;

    default:
      return newState;
  }
}
