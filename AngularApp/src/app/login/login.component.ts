import { Component, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
// import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  // styleUrls: ['./login.component.scss'],
  imports: [FormsModule],
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/game']);
      },
      error: err => alert('Login failed')
    });
  }
}
