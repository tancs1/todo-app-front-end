import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { getLoginInfo } from '../utils/loginInfo';
import { custom_axios } from '../axious/AxiosSetup';
import { ApiConstants } from '../api/ApiConstants';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
interface TodoModal{
  title:string,
  date:string,
  id:string
}
@Component({
  selector: 'app-active',
  standalone: true,
  imports: [FormsModule,HeaderComponent,CommonModule],
  templateUrl: './active.component.html',
  styleUrls: ['./active.component.scss']
})
export class ActiveComponent implements OnInit {
  private todosSubject = new Subject<any>();
  toDotext:any
  // Observable stream that components will subscribe to
  todos$ = this.todosSubject.asObservable();
 
  submittedText: string = '';
  todoData: any=[];
  constructor(private toastr: ToastrService){
    this.todos$.subscribe(todos=>{
      
      this.todoData=todos })

  }
ngOnInit(): void {
    this.getAllNotComleted()
    this.todos$.subscribe(todos=>{
      this.todoData=todos })

}
 getAllNotComleted= async()=>{
  try{
const userId=getLoginInfo()?.userId
if(userId){
  let response=await custom_axios.get(ApiConstants.TODO.FIND_NOT_COMPLETED(userId))
  this.todosSubject.next(response.data);
  console.log(response.data);
  
  return

}else{}
  }catch(error){
    console.log(error);
    
  }
}
 async onSubmit() {
    if (this.submittedText == "") {
      this.toastr.error('Please fille the form.', 'Error');
      return;
    }

    try {
      const userId:any=getLoginInfo()?.userId
      const response = await custom_axios.post(ApiConstants.TODO.ADD(userId), {
        title: this.submittedText

      });

      if (response.data) {
        this.toastr.success('add todo successful!', 'Success');
        this.getAllNotComleted()
        this.todos$.subscribe(todos=>{
          this.todoData=todos })    
          this.submittedText=''
      }
    } catch (error) {
      this.toastr.error('add todo failed. Please try again later.', 'Error');
      console.error('add todo Error:', error);
    }
  
    // this.submittedText = this.todos;
    console.log(this.submittedText);
  }

  async deleteTodo(todoId:any){
  const response=await custom_axios.delete(ApiConstants.TODO.Delete_Todo(todoId))
  
  if (response.status== 200) {
    this.toastr.success('todo delete successfully!', 'Success');
    this.getAllNotComleted()
    this.todos$.subscribe(todos=>{
      this.todoData=todos })    
  }else{
    this.toastr.error('todo  delete not successfully !', 'Error');
  }
  
  
  }
  async updateTodo(todoId:any){
    const response=await custom_axios.patch(ApiConstants.TODO.Mark_Completed(todoId))
  
    if (response.status== 200) {
      this.toastr.success('todo update successfully!', 'Success');
      this.getAllNotComleted()
      this.todos$.subscribe(todos=>{
        this.todoData=todos })    
    }else{
      this.toastr.error('todo update not successfully!', 'Error');
    }
   
    
    }
  }

