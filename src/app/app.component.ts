import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoObj } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  public mode = 'list'
  public todos: TodoObj[] = [];
  public title: String = 'Minhas tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(50),
        Validators.required,
      ])]
    });
     this.getLocalStorage();
  }

  setLocalStorage() {
    const data = JSON.stringify(this.todos);
    localStorage.setItem('tarefas', data);
    this.mode = 'list';
  }

  getLocalStorage() {
    this.todos = JSON.parse(localStorage.getItem('tarefas')!);
  }

  // getLocalStorage() {
  //   const data = localStorage.getItem('tarefas');
  //   this.todos = JSON.parse(data);
  // }

  clear() {
    this.form.reset();
  }

  addNewTask() {
    const  valueInput  = this.form.controls['title'].value
    const id = this.todos.length + 1;
    this.todos.push(new TodoObj(id, valueInput, false));
    this.setLocalStorage();
    this.clear();
  }

  remove(todo: TodoObj) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.setLocalStorage()
  }

  markAsDone(todo: TodoObj) {
    todo.done = true;
    this.setLocalStorage()
  }

  markAsUndone(todo: TodoObj) {
    todo.done = false;
    this.setLocalStorage()
  }

  changeMode(mode: string) {
    this.mode = mode;
  }

}


