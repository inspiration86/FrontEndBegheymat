import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdminserviceService} from '../../adminservice.service';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../../Auth/localStorageLogin/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-administrator-edit-dialog',
  templateUrl: './administrator-edit-dialog.component.html',
  styleUrls: ['./administrator-edit-dialog.component.css']
})
export class AdministratorEditDialogComponent implements OnInit {

  public form: FormGroup;
  errorMessages = {
    adminName: [
      {type: 'required', message: 'نام را وارد کنید.'}
    ],
    username: [
      {type: 'required', message: 'نام کاربری را وارد کنید.'}
    ],
    type: [
      {type: 'required', message: 'نوع کاربر ادمین را انتخاب کنید.'}
    ],
    image: [
      {type: 'required', message: 'تصویر را وارد کنید.'}
    ]
  };
  admin: any;
  types: any[] = [];
  isLogged = false;

  constructor(private formBuilder: FormBuilder,
              private service: AdminserviceService,
              public ref: DynamicDialogRef,
              public localStorage: LocalStorageService,
              public router: Router,
              public messageService: MessageService,
              public config: DynamicDialogConfig) {
    this.types = [
      {name: 'Master', code: 'Master'},
      {name: 'Admin', code: 'Admin'},
      {name: 'Support', code: 'Support'}
    ];
  }

  ngOnInit(): void {
    this.isLogged = this.localStorage.getCurrentUser();
    if (!this.isLogged) {
      this.router.navigate(['/admin']);
    }
    if (this.localStorage.userJson['type'] !== 'Master') {
      this.router.navigate(['/admin/index']);
    }

    this.admin = this.config.data.admin;
    this.createform();
  }

  createform(): void {
    this.form = this.formBuilder.group({
      adminName: new FormControl(
        this.admin.adminName,
        [
          Validators.required
        ]
      ),
      username: new FormControl(
        this.admin.username,
        [
          Validators.required
        ]
      ),
      type: new FormControl(
        this.admin.type,
        [
          Validators.required
        ]
      ),
      image: new FormControl(
        this.admin.image,
        [
          Validators.required
        ]
      )
    });
  }

  imageUploader(event): void {
    const formData = new FormData();
    formData.append('image', event.files[0], event.files[0].name);
    this.service.uploadFile(formData).subscribe((response) => {
      if (response.success === true) {
        this.form.controls.image.setValue(response.imagePath);
        this.messageService.add({
          severity: 'success',
          summary: ' آپلود تصویر ',
          detail: 'تصویر با موفقیت آپلود شد.'
        });
      } else {
        this.messageService.add({severity: 'error', summary: ' آپلود تصویر محصول ', detail: response.data});
      }
    });
  }

  submitForm(): void {
    this.service.editAdmin(this.admin._id, this.form.value).subscribe((response) => {
      if (response.success === true) {
        this.ref.close(true);
      } else {
        this.messageService.add({severity: 'error', summary: ' ثبت اطلاعات ', detail: response.data});
      }
    });
  }


}
