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
  },
  USER:{
    SignUp:()=>{
return "/user/signUp"
    },
    Get_All_User: () => {
        return '/user';
      },
      Delete_User: (userId: number) => {
        return '/user/' + userId;
      },
  },
  LOGIN:{
    Login: () => {
      return '/auth/login';
    },
  }
};
