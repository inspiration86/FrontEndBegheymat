import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {LocalStorageService} from '../../../../Auth/localStorageLogin/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-feature-value-edit-dialog',
  templateUrl: './feature-value-edit-dialog.component.html',
  styleUrls: ['./feature-value-edit-dialog.component.css']
})
export class FeatureValueEditDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    value: [
      {type: 'required', message: 'مقدار ویژگی محصول را وارد کنید.'},
      {type: 'maxlength', message: 'مقدار ویژگی محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private localStorage: LocalStorageService,
              public config: DynamicDialogConfig) { }

  ngOnInit(): void {
   // this.localStorage.isNotSupportUser();

    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      value: new FormControl(
        this.config.data.value,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      )
    });
  }

  submitForm(): void {
    console.log('done');
  }
}
