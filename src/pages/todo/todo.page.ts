import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
// import { Observable } from 'rxjs/Observable';
// import { TodoService } from '../../services/todo.service';
// import { ItemSelectedOutput, ReorderItemsOutput, TodosInput, TodoListComponent } from '../../components/todo-list/todo-list.component';
import { ToDo } from '../../models/todo';
import { Validators, FormBuilder } from '@angular/forms';
// import { ControlMessages } from '../../components/control-messages/control-messages.component';
import { assign } from '../../utils/assign';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'todo.page.html'
})
export class TodoPage {
  public todoForm;

  private todo: ToDo =
  {
    $key: '',
    description: null,
    name: '',
    index: 0,
    isComplete: false
  };

  private isEditing: boolean;

  constructor(
    public formBuilder: FormBuilder,
    params: NavParams,
    public viewController: ViewController
  ) {
    console.log('### TodoPage');
    console.log('params:get>', params.get('todo'));

    let paramTodo: ToDo = params.get('todo');    

    this.isEditing = !!paramTodo;

    if (this.isEditing) {
      this.todo = paramTodo;
    }

    this.todoForm = this.formBuilder.group({
      name: [this.todo.name, Validators.required],
      description: [this.todo.description],
      isComplete: [this.todo.isComplete]
    });      
  }

  dismiss() {
    console.log('dismiss');
    this.viewController.dismiss();
  }

  save() {
    console.log('save');

    if (!this.todoForm.valid) {
      return;
    }

    console.log(this.todoForm.value);
    console.log('this.todo>', this.todo);

    // Get error here with private todo when using popover.
    // Hence local.

    let localTodo = assign(this.todo, {
      name: this.todoForm.value.name,
      isComplete: this.todoForm.value.isComplete
    });

    // assign did not like optional property.
    localTodo.description = this.todoForm.value.description;
    /*
    let localTodo: ToDo = {
        $key: this.todo.$key,
        description: this.todoForm.value.description,
        name: this.todoForm.value.name,
        index: this.todo.index,
        isComplete: this.todoForm.value.isComplete
      };
*/
    this.viewController.dismiss(localTodo);
  }
}
