export const ApiConstants = {
  TODO: {
    ADD: (userid: number) => {
      return '/todo/' + userid;
    },
    FIND_NOT_COMPLETED: (userId: number) => {
      return '/todo/findAllNotCompleted/' + userId;
    },
    FIND_ALL_COMPLETED: (userId: number) => {
      return '/todo/findAllCompleted/' + userId;
    },
    
   
    Delete_Todo: (todoId: number) => {
        return '/todo/' + todoId;
      },
    
    Mark_Completed: (todoId: number) => {
      return '/todo/' + todoId;
    },
    FIND_TODO_USERID:(userId:number) =>{
      return '/todo/findAllTodo/' + userId;
    }
  },
  USER:{
    SignUp:()=>{
return "/users/signUp"
    },
    Get_All_User: () => {
        return '/users';
      },
      Get_All_User_ForLogin:()=>{
        return '/users/findAllForLogin'
      },
      Delete_User: (userId: number) => {
        return '/users/' + userId;
      },
  },
  LOGIN:{
    Login: () => {
      return '/auth/login';
    },
  }
};
