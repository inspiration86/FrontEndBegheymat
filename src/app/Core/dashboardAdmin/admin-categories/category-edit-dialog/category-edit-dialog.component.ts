import {DynamicDialogRef, DynamicDialogConfig} from 'primeng/dynamicdialog';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {AdminserviceService} from '../../adminservice.service';
import {MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../../Auth/localStorageLogin/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category-edit-dialog',
  templateUrl: './category-edit-dialog.component.html',
  styleUrls: ['./category-edit-dialog.component.css'],
  providers: [
    MessageService
  ]
})
export class CategoryEditDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    title: [
      {type: 'required', message: 'عنوان دسته بندی را وارد کنید.'},
      {type: 'maxlength', message: 'عنوان دسته بندی نمی تواند از 500 کاراکتر بیشتر باشد.'}
    ]
  };

  constructor(private formBuilder: FormBuilder,
              private service: AdminserviceService,
              public messageService: MessageService,
              public localStorage: LocalStorageService,
              public ref: DynamicDialogRef,
              public config: DynamicDialogConfig) {
  }

  ngOnInit(): void {
   // this.localStorage.isNotSupportUser();

    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      title: new FormControl(
        this.config.data.title,
        [
          Validators.required,
          Validators.maxLength(500)
        ]
      )
    });
  }

  submitForm(): void {
    this.service.editCategory(this.config.data.id, this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }
}
