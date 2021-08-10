import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  myForm = new FormGroup({
    personalData: new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      birthDate: new FormControl()
    }),

    userData: new FormGroup({
      userName: new FormControl(),
      password: new FormControl(),
      rePassword: new FormControl(),
      email: new FormControl()

    }),

    secretData: new FormGroup({
      secretQuestion: new FormControl(),
      secretAnswer: new FormControl(),
    }),

    contactData: new FormGroup({
      tell: new FormArray([new FormGroup({
        home: new FormControl(),
        mobile: new FormControl(),
        work: new FormControl()

      })]),
      address: new FormArray([new FormGroup({
        city: new FormControl(),
        street: new FormControl(),
        alley: new FormControl(),
        no: new FormControl()
      })])
    })

  })

  constructor(){}
  ngOnInit(): void {
  }
  title = 'RegisterForm';
}
