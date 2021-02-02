import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminserviceService } from './../../adminservice.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import {LocalStorageService} from '../../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-add-banner-dialog',
  templateUrl: './add-banner-dialog.component.html',
  styleUrls: ['./add-banner-dialog.component.css'],
  providers: [MessageService]
})
export class AddBannerDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    tag: [
      {type: 'required', message: 'تگ اسلایدر را وارد کنید.'}
    ],
    imageurl: [
      {type: 'required', message: 'تصویر اسلایدر را آپلود کنید.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              public service: AdminserviceService,
              private localStorage: LocalStorageService,
              public messageService: MessageService,
              public dialogRef: DynamicDialogRef) { }

  ngOnInit(): void {
   // this.localStorage.isNotSupportUser();
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      link: new FormControl(
        null
      ),
      tag: new FormControl(
        null,
        [
          Validators.required
        ]
      ),
      imageurl: new FormControl(
        null,
        [
          Validators.required
        ]
      )
    });

  }

  submitForm(): void {
    this.service.addBanner(this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.dialogRef.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }

  imageUploader(event): void {
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.service.uploadFile(formData).subscribe((response) => {
      if (response['success'] === true) {
        this.form.controls.imageurl.setValue(response['imagePath']);
        this.messageService.add({
          severity: 'success',
          summary: ' آپلود تصویر بنر ',
          detail: 'تصویر با موفقیت آپلود شد.'
        });
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر بنر ', detail: response['data']});
      }
    });
  }

}
