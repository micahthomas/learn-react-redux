import {TodoStore} from "../stores/TodoStore";

export function createTodo(text) {
  TodoStore.dispatch({type: "CREATE_TODO", text});
}

export function deleteTodo(id) {
  TodoStore.dispatch({type: "DELETE_TODO", id});
}

export function reloadTodos() {
  TodoStore.dispatch({type: "FETCH_TODOS"});

  setTimeout(() => {
    TodoStore.dispatch({
      type: "LOAD_TODOS",
      todos: [
        {
          id: Date.now(),
          text: "Go Shopping Again",
          complete: false
        }, {
          id: Date.now()+1,
          text: "Pay Water Bill Again",
          complete: true
        }
      ]
    })
  })
}
