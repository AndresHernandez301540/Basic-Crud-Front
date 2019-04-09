import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RestService} from '../services/rest.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  public reactiveForm: FormGroup;
  public confirmPass;
  public user;

  public show=false;
  public type="password";
  public icon="visibility";

  public show2=false;
  public type2="password";
  public icon2="visibility";

  constructor(private formBuilder:FormBuilder, private rest:RestService) {}

  ngOnInit() {
    this.reactiveForm=this.formBuilder.group({
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      nick_name:['',[Validators.required,Validators.minLength(6)]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmPass:['',[Validators.required]],
      birthdayDate:['',Validators.required]
    },{validator : this.checkPass});
  }

  createuser(){
    this.user=this.reactiveForm.value;
    let date=''+this.user.birthdayDate
    let newDate=date.slice(4,15);
    this.user.birthdayDate=newDate;
    this.rest.createUser(this.user).subscribe((result)=>{
      console.log("The user has been added");
    },(err)=>{
      console.log(err);
    });
  }

  checkPass(group:FormGroup){
    let pass=group.controls.password.value;
    let confirmPas=group.controls.confirmPass.value;
    return pass===confirmPas ? null : {notSame:true}
  }
  seePassword(){
    this.show=!this.show;
    return this.show ? (
      this.type='text',
      this.icon='visibility'
      ): 
      (
         this.type='password',
         this.icon='visibility_off'
      )
  }
  seeConfirmPassword(){
    this.show2=!this.show2;
    return this.show2 ? (
      this.type2='text',
      this.icon2='visibility'
      ): 
      (
         this.type2='password',
         this.icon2='visibility_off'
      )
  }
}
