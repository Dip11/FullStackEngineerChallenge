import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(
      private router: Router
  ) {
    let token = localStorage.getItem('token');
    if(token){
      let user = JSON.parse(localStorage.getItem('user'));
      if (user.role == 1){
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/employee']);
      }
    } else{
      this.router.navigate(['/login']);
    }
  }
  ngOnInit() {

  }
}
