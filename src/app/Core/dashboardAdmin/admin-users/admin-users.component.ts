import {Component, OnInit} from '@angular/core';
import {AdminserviceService} from '../adminservice.service';
import {Router} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class AdminUsersComponent implements OnInit {

  users: any[] = [];

  constructor(private service: AdminserviceService,
              private router: Router,
              private localStorage: LocalStorageService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) {
  }


  ngOnInit(): void {
    //this.localStorage.isNotSupportUser();

    this.getUsers();
  }

  getUsers(): any {
    this.service.getAllUsers().subscribe((response) => {
      if (response.success === true) {
        this.users = response.data;
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
        this.service.deleteUser(id).subscribe((response) => {
          if (response.success === true) {
            this.confirmationService.close();
            this.messageService.add({severity: 'success', summary: ' حذف اطلاعات ', detail: response.data});
            this.getUsers();
          } else {
            this.messageService.add({severity: 'error', summary: ' حذف اطلاعات ', detail: response.data});
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
