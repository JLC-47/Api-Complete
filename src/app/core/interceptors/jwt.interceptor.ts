import { HttpInterceptorFn } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';





export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  
  return next(req);

 
};
