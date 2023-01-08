import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable,  } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authurl: any;


  constructor(private http: HttpClient) { }
  postlogin(datas: any): Observable<any> {
    return this.http.get("assets/Jwt-Token/tokens.json").pipe(map((res: any) => {
      this.authurl = res.token;
      if (this.authurl) {
        let jwtData = this.authurl.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData)
        let decodedJwtData = JSON.parse(decodedJwtJsonData)
        if (decodedJwtData) {
          if (decodedJwtData.name == datas.userName) {
            localStorage.setItem("name", decodedJwtData.name);
    
          } else {
            alert("Username is incorrect");
            return false;
          }
          decodedJwtData.Role == 1 ? alert("Admin") : alert("Others");
          localStorage.setItem("token", res.token);
        }
      } return res;
    }))
  }
 
  }
