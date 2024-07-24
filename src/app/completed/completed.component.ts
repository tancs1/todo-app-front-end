import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { custom_axios } from '../axious/AxiosSetup';
import { ApiConstants } from '../api/ApiConstants';
import { getLoginInfo } from '../utils/loginInfo';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-completed',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.scss'
})
export class CompletedComponent {
  private todosSubject = new Subject<any>();
  toDotext:any
  // Observable stream that components will subscribe to
  todos$ = this.todosSubject.asObservable();
  todoData: any;
  constructor(private toastr: ToastrService){
    this.todos$.subscribe(todos=>{
      
      this.todoData=todos })

  }
ngOnInit(): void {
    this.getAllComleted()
    this.todos$.subscribe(todos=>{
      this.todoData=todos })

}
  getAllComleted= async()=>{
    const userId=getLoginInfo()?.userId
    if(userId){
      const response=await custom_axios.get(ApiConstants.TODO.FIND_ALL_COMPLETED(userId))
      this.todosSubject.next(response.data);
      return
    
    }else{}
    
    }
    async deleteTodo(todoId:any){
      const response=await custom_axios.delete(ApiConstants.TODO.Delete_Todo(todoId))
      
      if (response.status== 200) {
        this.toastr.success('todo delete successfully!', 'Success');
        this.getAllComleted()
        this.todos$.subscribe(todos=>{
          this.todoData=todos })    
      }else{
        this.toastr.error('todo delete not successfully !', 'Error');
      }
      
      
      }
}
