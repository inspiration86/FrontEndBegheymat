import {EditBannerDialogComponent} from './edit-banner-dialog/edit-banner-dialog.component';
import {DialogService} from 'primeng/dynamicdialog';
import {AddBannerDialogComponent} from './add-banner-dialog/add-banner-dialog.component';
import {AdminserviceService} from './../adminservice.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class BannerComponent implements OnInit {

  banners: any[] = [];

  constructor(private service: AdminserviceService,
              private  messageService: MessageService,
              private localStorage: LocalStorageService,
              public dialogService: DialogService,
              private  confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    //this.localStorage.isNotSupportUser();
    this.getBanners();
  }

  getBanners(): any {
    this.service.getBanners().subscribe((response) => {
      if (response.success === true) {
        this.banners = response.data;
      }
    });
  }

  showAddBannerDialog(): void {
    const ref = this.dialogService.open(AddBannerDialogComponent, {
      header: 'ثبت بنر جدید',
      width: '70%'
    });
    ref.onClose.subscribe(res => {
      if (res === true) {
        this.getBanners();
      }
    });
  }

  showEditBannerDialog(id: any, link: string, tag: string, imageurl: string): void {
    const ref = this.dialogService.open(EditBannerDialogComponent, {
      data: {
        id,
        link,
        tag,
        imageurl
      },
      header: 'ویرایش بنر',
      width: '70%',
      contentStyle: {'direction': 'rtl'}
    });
    ref.onClose.subscribe(res => {
      if (res === true) {
        this.getBanners();
      }
    });
  }

  deleteBanner(id: any): void {
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteBanner(id).subscribe((response) => {
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
