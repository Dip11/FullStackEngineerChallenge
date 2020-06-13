import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserModel} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})

export class EmployeeEditComponent implements OnInit {

  employeeForm: FormGroup;
  title: any='Add Employee';
  errorMessage: any='Please fill up the form';
  user: UserModel;
  hasFormErrors: boolean;

  constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private dialogRef: MatDialogRef<EmployeeEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.user = this.data
    if (this.user){
      this.title = 'Edit Employee'
    } else {
      this.user = new UserModel()
    }
    this.createForm();
  }

  createForm(){
    this.employeeForm = this.formBuilder.group({
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.compose([Validators.required, Validators.email])],
      password: ['']
    });
  }

  saveEmployee(){
    this.hasFormErrors = false;
    const controls = this.employeeForm.controls;
    if (this.employeeForm.invalid) {
      Object.keys(controls).forEach(controlName =>
          controls[controlName].markAsTouched()
      );

      this.hasFormErrors = true;
      this.errorMessage = "Please fill up the form"
      return;
    }
    let newUser = new UserModel()
    newUser.firstName = this.employeeForm.controls.firstName.value;
    newUser.lastName = this.employeeForm.controls.lastName.value;
    newUser.email = this.employeeForm.controls.email.value;
    newUser.password = this.employeeForm.controls.password.value;
    if (this.user.id){
      this.userService.editEmployee(this.user.id, newUser).subscribe((user)=>{
        this.dialogRef.close(123);
      })
    } else {
      this.userService.createEmployee(newUser).subscribe((user)=>{
        this.dialogRef.close(123);
      })
    }
  }
}
