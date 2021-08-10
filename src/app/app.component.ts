import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  myForm = new FormGroup({
    personalData: new FormGroup({
      firstName: new FormControl(null,[Validators.required]),
      lastName: new FormControl(null,[Validators.required]),
      birthDate: new FormControl()
    }),

    userData: new FormGroup({
      userName: new FormControl(null,[Validators.required]),
      password: new FormControl(null,[Validators.required]),
      rePassword: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required, Validators.email])

    }),

    secretData: new FormGroup({
      secretQuestion: new FormControl('team'),
      secretAnswer: new FormControl(null,[Validators.required]),
    }),

      address: new FormArray([new FormGroup({
        city: new FormControl(),
        street: new FormControl(),
        alley: new FormControl(),
        no: new FormControl()
      })])


  })

  submit(){
    console.log(this.myForm)
  }
  reset(){
    this.myForm.reset()
  }

  checkError(controlName: string, errorName: string){
    let ctrl= this.myForm.get(controlName);
    if(ctrl){
      if(ctrl.invalid && ctrl.touched && ctrl.errors && ctrl.errors[errorName]) {
        return true;
      }
    }
    return false;

  }

  constructor(){}
  ngOnInit(): void {
  }
  title = 'RegisterForm';
}
