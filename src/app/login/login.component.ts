import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
    submitted = false;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('userId') !== null || undefined && localStorage.getItem('username') !== null || undefined) {
      this.router.navigate(["/clients"]);
 }
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    })
  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }
    const data = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }
    this.http.post('http://localhost:8000/api/login', data)
    .subscribe(res => {
      if(res['status'] === 200) {
            console.log(res['data'][0].username);
            localStorage.setItem('userId', res['data'][0].userId);
            localStorage.setItem('name', res['data'][0].name);
            localStorage.setItem('username', res['data'][0].username);
            this.router.navigate(["/clients"]);
      } else if(res['status'] === 500) {
        alert(res['message']);
      } else {
        alert('Some errors occured');
      }
    })
}
}
