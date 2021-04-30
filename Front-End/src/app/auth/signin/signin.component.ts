import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SigninRequestPayload} from './signin.request.payload';
import {AuthService} from '../shared/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  signingRequestPayload: SigninRequestPayload;
  registerSuccessMessage: string;
  isError: boolean;


  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {
    this.signingRequestPayload = {
      username: '',
      password: ''
    };
  }


  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {

    this.signingRequestPayload.username=this.loginForm.get('username' ).value;
    this.signingRequestPayload.password=this.loginForm.get('password' ).value;

    this.authService.signin(this.signingRequestPayload).subscribe(data => {

      console.log("login successful");

    });

  }
}
