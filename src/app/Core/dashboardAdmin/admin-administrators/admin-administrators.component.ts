import {Component, OnInit} from '@angular/core';
import {AdminserviceService} from '../adminservice.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {AdministratorEditDialogComponent} from './administrator-edit-dialog/administrator-edit-dialog.component';
import {DialogService} from 'primeng/dynamicdialog';
import {AdministratorAddDialogComponent} from './administrator-add-dialog/administrator-add-dialog.component';
import {AdministratorChangePasswordDialogComponent} from './administrator-change-password-dialog/administrator-change-password-dialog.component';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-administrators',
  templateUrl: './admin-administrators.component.html',
  styleUrls: ['./admin-administrators.component.css'],
  providers: [
    MessageService, ConfirmationService, DialogService
  ]
})
export class AdminAdministratorsComponent implements OnInit {

  admins: any[] = [];

  constructor(private service: AdminserviceService,
              private messageService: MessageService,
              private dialogService: DialogService,
              private localStorage: LocalStorageService,
              private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    //this.localStorage.isMasterUser();

    this.service.getAllAdmins().subscribe((response) => {
      if (response.success === true) {
        this.admins = response.data;
      }
    });
  }

  showAddDialog(): void {
    const ref = this.dialogService.open(AdministratorAddDialogComponent, {
      header: 'ثبت ادمین',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true) {
        this.ngOnInit();
      }
    });

  }

  showEditDialog(id: any, admin: any): void {
    const ref = this.dialogService.open(AdministratorEditDialogComponent, {
      data: {
        id,
        admin
      },
      header: 'ویرایش ادمین',
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true) {
        this.ngOnInit();
      }
    });

  }

  showChangePasswordDialog(id: any, username: any): void {
    const ref = this.dialogService.open(AdministratorChangePasswordDialogComponent, {
      data: {
        id
      },
      header: 'تغییر رمز عبور ادمین ' + username,
      width: '70%'
    });

    ref.onClose.subscribe(res => {
      if (res === true) {
        this.ngOnInit();
      }
    });

  }

  delete(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteAdmin(id).subscribe((response) => {
          if (response.success === true) {
            this.messageService.add({severity: 'success', summary: ' حذف ', detail: response.data});
            this.ngOnInit();
          } else {
            this.messageService.add({severity: 'error', summary: ' حذف ', detail: response.data});
          }
        });
      },
      reject: () => {
        // close
        this.confirmationService.close();
      }
    });


  }

}
