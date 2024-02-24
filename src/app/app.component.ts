import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(public authenticationService: AuthenticationService,private router: Router

    ){}
    logout() {
      this.authenticationService.logout().subscribe(() => {
        this.router.navigate(['/']);
      });
    }
}
