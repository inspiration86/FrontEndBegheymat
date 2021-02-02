import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {LocalStorageService} from '../../../../Auth/localStorageLogin/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-feature-edit-dialog',
  templateUrl: './feature-edit-dialog.component.html',
  styleUrls: ['./feature-edit-dialog.component.css']
})
export class FeatureEditDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    titleFarsi: [
      {type: 'required', message: 'عنوان فارسی ویژگی محصول را وارد کنید.'},
      {type: 'maxlength', message: 'عنوان فارسی ویژگی محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ],
    titleLatin: [
      {type: 'required', message: 'عنوان انگلیسی ویژگی محصول را وارد کنید.'},
      {type: 'maxlength', message: 'عنوان انگلیسی ویژگی محصول نمی تواند از 200 کاراکتر بیشتر باشد.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              public ref: DynamicDialogRef,
              private localStorage: LocalStorageService,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    //this.localStorage.isNotSupportUser();

    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      titleFarsi: new FormControl(
        this.config.data.titleFarsi,
        [
          Validators.required,
          Validators.maxLength(200)
        ]
      ),
      titleLatin: new FormControl(
        this.config.data.titleLatin,
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
