/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(){
    this.todo=[];
  }
  add(task){
    this.todo.splice(this.todo.length, 0, task);
  }
  remove(indx){
    this.todo.splice(indx, 1);
  }
  update(idx,task){
    if(idx<this.todo.length){
      this.todo[idx]=task;
    }
  }
  getAll(){
    return this.todo;
  }
  get(idx){
    if(idx>=this.todo.length){
      return null;
    }
    return this.todo[idx];
  }
  clear(){
    this.todo=[];
  }
}

module.exports = Todo;
