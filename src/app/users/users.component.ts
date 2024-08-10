import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { custom_axios } from '../axious/AxiosSetup';
import { getLoginInfo } from '../utils/loginInfo';
import { ApiConstants } from '../api/ApiConstants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [HeaderComponent,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  private userSubject = new Subject<any>();
  // Observable stream that components will subscribe to
  user$ = this.userSubject.asObservable();
 
  submittedText: string = '';
  userData: any=[];
  constructor(private toastr: ToastrService){
    this.user$.subscribe(user=>{
      
      this.userData=user })}

  ngOnInit(): void {
    this.getAllUsers()
    this.user$.subscribe((user: any)=>{
      this.userData=user })

}
 getAllUsers= async()=>{
  try{
const role=getLoginInfo()?.role
if( role && role=='ADMIN'){
  let response=await custom_axios.get(ApiConstants.USER.Get_All_User())
  this.userSubject.next(response.data);
  console.log(response.data);
  
  return

}else{  this.toastr.error('You have not permition to view users details.', 'Error');}
  
}catch(error){
    console.log(error);
      
    }
}
async deleteTodo(userid:any){
  
  const todoResponce=await custom_axios.get(ApiConstants.TODO.FIND_TODO_USERID(userid))
  for (const todo of todoResponce.data) {
    const response=await custom_axios.delete(ApiConstants.TODO.Delete_Todo(todo.id)) // or todo.completed = false; await this.todoRepository.save(todo);
  }
 

  
  const response=await custom_axios.delete(ApiConstants.USER.Delete_User(userid))
  
  if (response.status== 200) {
    this.toastr.success('user delete successfully!', 'Success');
    this.getAllUsers()
    this.user$.subscribe(user=>{
      this.userData=user })    
  }else{
    this.toastr.error('user  delete not successfully !', 'Error');
  }
  
  
  }
}

