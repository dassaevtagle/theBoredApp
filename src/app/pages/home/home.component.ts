import { Component, OnInit } from '@angular/core';
import swal from'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  notBored(): void {
     
    swal.fire(
      'Are you sure?',
      'Come on, say yes.',
      'question'
    )
  }

}
