import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',Validators.required)
  });

  constructor(private authenticationService:AuthenticationService, private router: Router
    ){}
  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  submit() {
    const { email, password } = this.loginForm.value;

    if (!this.loginForm.valid || !email || !password) {
      return;
    }
    this.authenticationService.login(email, password)
    .subscribe(
      () => {
        // Handle successful login
        this.router.navigate(['/home']);
      },
      (error) => {
        // Handle error and display it to the user
        const errorMessage = this.getErrorMessage(error);
        // You can choose to display the error message in different ways:
        // - Use an alert: `alert(errorMessage);`
        // - Show it in a dedicated error message element:
        //   - Create an error element in your template with an `*ngIf` directive
        //   based on a boolean error flag.
        //   - Update the error flag and assign `errorMessage` to it within this
        //   error handler.
      }
    );
  }
  private getErrorMessage(error: any): string {
    // Handle different types of errors and return appropriate messages
    if (error.code === 'auth/invalid-email') {
      return 'Invalid email address.';
    } else if (error.code === 'auth/wrong-password') {
      return 'Incorrect password.';
    } else {
      // Handle other errors or provide a generic message
      return 'An error occurred during login. Please try again later.';
    }
  }
}

