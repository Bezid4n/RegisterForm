import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  myForm = new FormGroup({

    userData: new FormGroup({
      userName: new FormControl(null,[Validators.required, this.forbiddenUsername]),
      password: new FormControl(null,[Validators.required,
        Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})')]),
      rePassword: new FormControl(null,[Validators.required], [this.checkPass.bind(this) as AsyncValidatorFn] ),
      email: new FormControl(null,[Validators.required, Validators.email], [this.forbiddenEmail as AsyncValidatorFn] )

    }),

    secretData: new FormGroup({
      secretQuestion: new FormControl('team'),
      secretAnswer: new FormControl(null,[Validators.required]),
    }),

      address: new FormArray([ new FormGroup({
        city: new FormControl(),
        street: new FormControl(),
        alley: new FormControl(),
        no: new FormControl()
      })]),




  })

  submit(){
    console.log(this.myForm);

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

  suggest(){
    this.myForm.patchValue({userData:{userName:'Bezid4n'}})
  }

  addAddress(){
    this.getAddressCtrls().push(new FormGroup({
      city: new FormControl(),
      street: new FormControl(),
      alley: new FormControl(),
      no: new FormControl()
    }));
  }

  getAddressCtrls(){
    return (this.myForm.get('address') as FormArray);
  }

  forbiddenUsername(control: FormControl): {[s:string] : boolean} | null{
    let users= ['admin','modir'];
    if(users.indexOf(control.value)>-1){
      return {forbidden: true}
    }
    return null
  }

  forbiddenEmail(control: FormControl): Promise<ValidationErrors | null>{
    let p= new Promise<ValidationErrors | null>((resolve,reject) => {
     setTimeout(() => {
      if(control.value === "bezid4n@gmail.com")
        resolve({forbidden: true})
      resolve(null)

     }, 2000);
    });
    return p;
  }

  checkPass(control: FormControl): Promise<ValidationErrors | null>{
    let Pass= this.myForm.get('userData.password')?.value;
    let p= new Promise<ValidationErrors | null>((resolve,reject) => {
     setTimeout(() => {
      if(control.value != Pass)
        resolve({forbidden: true})
      resolve(null)

     }, 2000);
    });
    return p;
  }

  constructor(){}
  ngOnInit(): void {

  }
  title = 'RegisterForm';
}
