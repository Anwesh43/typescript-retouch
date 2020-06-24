import axios, { AxiosResponse } from 'axios'

interface TodoItem {
  userId: number,
  id: number,
  title: String,
  completed: boolean,
}

class TodoContainer {
  todos: Array<TodoItem> = []

  addTodoItem(todoItem: TodoItem) {
    this.todos.push(todoItem)
  }

  getTodoItem(i: number): TodoItem {
    return this.todos[i]
  }

  size() : number {
    return this.todos.length;
  }

  pop() : TodoItem {
    return this.todos.splice(0, 1)[0];
  }
}

const todoContainer: TodoContainer = new TodoContainer()

async function fetchTodos() {
  const todos : AxiosResponse<any> = await axios.get("http://jsonplaceholder.typicode.com/todos");
  
  todos.data.forEach(element => {
    todoContainer.addTodoItem(element);
  });
}

(async () => {
  await fetchTodos();
  console.log(todoContainer.getTodoItem(1));
  let k : number = 0;
  const interval : NodeJS.Timeout = setInterval(() => {
    if (todoContainer.size() == 0) {
      clearInterval(interval);
    }
    console.log(`printing item at ${k++}`);
    console.log(todoContainer.pop());
  }, 1000);
})();