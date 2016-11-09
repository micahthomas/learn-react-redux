import {
  TODO_CREATED_SUCCESS,
  TODO_UPDATED_SUCCESS,
  TODO_MOVED_SUCCESS,
  TODO_DELETED_SUCCESS,
  SET_USER
} from '../constants/TodoActionTypes';
import firebase from '../utils/Firebase';

export function createTodo(store, todo) {
  store.getState().todos.ref.push(todo);
}

export function deleteTodo(store, id) {
  store.getState().todos.ref.child(id).remove();
}

export function updateTodo(store, id, todo) {
  store.getState().todos.ref.child(id).set(todo);
}

export function setUser(store, userId) {
  console.log('Set User', userId);
  let ref = firebase.database().ref('todos/' + userId);
  ref.on('child_added', snapshot => store.dispatch({
    type: TODO_CREATED_SUCCESS,
    payload: snapshot
  }))
  ref.on('child_removed', snapshot => store.dispatch({
    type: TODO_DELETED_SUCCESS,
    payload: snapshot
  }))
  ref.on('child_changed', snapshot => store.dispatch({
    type: TODO_UPDATED_SUCCESS,
    payload: snapshot
  }))
  ref.on('child_moved', (snapshot, old_key) => {
    snapshot.old_key = old_key;
    store.dispatch({
      type: TODO_MOVED_SUCCESS,
      payload: snapshot
    })
  })
  store.dispatch({
    type: SET_USER,
    payload: {
      ref,
      userId
    }
  })
}
