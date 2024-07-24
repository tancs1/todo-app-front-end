import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CommonServiceService } from '../service/commonService.service';

export const authGuard: CanActivateFn = (route, state) => {
const authService =inject(CommonServiceService)
const router=inject(Router)
  if (authService.isAuthenticated()) {
  
    return true;
}else{
  router.navigate(["login"])
  return false
}
  
};
