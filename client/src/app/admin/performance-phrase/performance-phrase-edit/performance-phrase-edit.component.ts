import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PerformancePhraseService} from "../../../services/performance-phrase.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PerformancePhraseModel} from "../../../models/performance-phrase.model";

@Component({
  selector: 'app-performance-phrase-edit',
  templateUrl: './performance-phrase-edit.component.html',
  styleUrls: ['./performance-phrase-edit.component.scss']
})
export class PerformancePhraseEditComponent implements OnInit {

  performancePhraseForm: FormGroup;
  title: any='Add PerformancePhrase';
  errorMessage: any='Please fill up the form';
  performancePhrase: PerformancePhraseModel
  hasFormErrors: boolean;

  constructor(
      private formBuilder: FormBuilder,
      private performancePhraseService: PerformancePhraseService,
      private dialogRef: MatDialogRef<PerformancePhraseEditComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.performancePhrase = this.data
    if (this.performancePhrase){
      this.title = 'Edit User'
    } else {
      this.performancePhrase = new PerformancePhraseModel()
    }

    this.createForm();
  }

  createForm(){
    this.performancePhraseForm = this.formBuilder.group({
      name: [this.performancePhrase.name, Validators.required],
    });
  }

  savePerformancePhrase(){
    this.hasFormErrors = false;
    const controls = this.performancePhraseForm.controls;
    if (this.performancePhraseForm.invalid) {
      Object.keys(controls).forEach(controlName =>
          controls[controlName].markAsTouched()
      );
      this.hasFormErrors = true;
      this.errorMessage = "Please fill up the form"
      return;
    }
    let newPerformancePhrase = new PerformancePhraseModel()
    newPerformancePhrase.name = this.performancePhraseForm.controls.name.value;
    if (this.performancePhrase.id){
      this.performancePhraseService.editPerformancePhrase(this.performancePhrase.id, newPerformancePhrase).subscribe((performancePhrase)=>{
        this.dialogRef.close(123);
      })
    } else {
      this.performancePhraseService.createPerformancePhrase(newPerformancePhrase).subscribe((performancePhrase)=>{
        this.dialogRef.close(123);
      })
    }
  }
}
