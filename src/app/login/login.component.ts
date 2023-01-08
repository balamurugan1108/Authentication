import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../Service/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup | any;
  authurl: any;

  constructor(private formBuilder: FormBuilder, public authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.loginValidate();
  }

  loginValidate() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    // debugger;
    let data = {
      "userName": this.loginForm.controls['username'].value,
      "userPassword": this.loginForm.controls['password'].value
    }

    this.authService.postlogin(data).subscribe({
      next: ((res: any) => {
        data = res;
        this.route.navigate(["home"]);
      })
    })
  }
}