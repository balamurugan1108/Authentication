import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class InterceptInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  let tokenes = req.clone({
    setHeaders: {
      Authorization : "Bala"
    }
  })
    return next.handle(tokenes).pipe(
     catchError((error: HttpErrorResponse)=>{
      let errorMsg ='';
      if(error.error instanceof ErrorEvent){
        console.log('this is clientside error');
        errorMsg = 'Error : ${error.error.message}';
      }else{
        console.log('this is serverside error');
        errorMsg = 'Error code : $ {error.status},Message : ${error.message}' ;
      }
      console.log(errorMsg);
      return throwError (errorMsg)
      
     }) 
    );
  }
}
