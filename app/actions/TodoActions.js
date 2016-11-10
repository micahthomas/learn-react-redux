import { TODO_CREATED_SUCCESS, TODO_UPDATED_SUCCESS, TODO_MOVED_SUCCESS, TODO_DELETED_SUCCESS, SET_USER} from '../constants/TodoActionTypes'
import firebase from '../utils/Firebase'

export function createTodo (ref, text) {
  ref.push({
    edit: false,
    complete: false,
    text: text ? text : 'No Todo!'
  })
}

export function deleteTodo (ref, id) {
  ref.child(id).remove()
}

export function updateTodo (ref, id, todo) {
  ref.child(id).update(todo)
}

export function setUser (dispatch, userId) {
  // Create firebase ref for the user's todo list
  let ref = firebase.database().ref('todos').child(userId)

  // Setup event handlers on ref
  ref.on('child_added', snapshot => dispatch({
    type: TODO_CREATED_SUCCESS,
    payload: snapshot
  }))
  ref.on('child_removed', snapshot => dispatch({
    type: TODO_DELETED_SUCCESS,
    payload: snapshot
  }))
  ref.on('child_changed', snapshot => dispatch({
    type: TODO_UPDATED_SUCCESS,
    payload: snapshot
  }))
  ref.on('child_moved', (snapshot, old_key) => {
    snapshot.old_key = old_key
    dispatch({
      type: TODO_MOVED_SUCCESS,
      payload: snapshot
    })
  })

  // Dispatch event to save the ref to store
  dispatch({
    type: SET_USER,
    payload: {
      ref,
    userId}
  })
}
