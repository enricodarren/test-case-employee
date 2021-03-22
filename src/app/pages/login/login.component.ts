import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = "";
  password = "";

  constructor(
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  login() {
    if (this.username == 'admin' && this.password == 'admin123') {
      this.router.navigate(['/dashboard']);
      this.openSnackBar('Login Success', 'Dismiss');
    } else {
      this.openSnackBar('Wrong Credential!', 'Dismiss');
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
