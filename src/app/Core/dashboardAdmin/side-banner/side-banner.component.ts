import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {AdminserviceService} from '../adminservice.service';
import {AddBannerDialogComponent} from '../banner/add-banner-dialog/add-banner-dialog.component';
import {EditBannerDialogComponent} from '../banner/edit-banner-dialog/edit-banner-dialog.component';
import {EditSideBannerDialogComponent} from './edit-side-banner-dialog/edit-side-banner-dialog.component';
import {AddSideBannerDialogComponent} from './add-side-banner-dialog/add-side-banner-dialog.component';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-side-banner',
  templateUrl: './side-banner.component.html',
  styleUrls: ['./side-banner.component.css'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class SideBannerComponent implements OnInit {

  sideBanners: any[] = [];
  constructor(private service: AdminserviceService,
              private  messageService: MessageService,
              public dialogService: DialogService,
              private localStorage: LocalStorageService,
              private  confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    //this.localStorage.isNotSupportUser();
    this.getSideBanners();
  }

  getSideBanners(): any{
    this.service.getSideBanners().subscribe((response) => {
      if (response.success === true) {
        this.sideBanners = response.data;
      }
    });
  }
  showAddBannerDialog(): void {
    const ref = this.dialogService.open(AddSideBannerDialogComponent, {
      header: 'ثبت بنر جدید',
      width: '70%'
    });
    ref.onClose.subscribe(res => {
      if (res === true){
        this.getSideBanners();
      }
    });
  }
  showEditBannerDialog(id: any, link: string, tag: string, imageurl: string): void {
    const ref = this.dialogService.open(EditSideBannerDialogComponent, {
      data: {
        id,
        link,
        tag,
        imageurl
      },
      header: 'ویرایش بنر',
      width: '70%',
      contentStyle: {"direction": "rtl"}
    });
    ref.onClose.subscribe(res => {
      if (res === true){
        this.getSideBanners();
      }
    });
  }

  deleteBanner(id: any): void{
    this.confirmationService.confirm({
      message: 'آیا از حذف رکورد انتخابی مطمین هستید؟',
      header: 'تایید حذف',
      icon: 'pi pi-exclamation-triangle',
      rejectLabel: 'خیر',
      acceptLabel: 'بله',
      defaultFocus: 'reject',
      accept: () => {
        // delete from db
        this.service.deleteSideBanner(id).subscribe((response) => {
          if (response.success === true) {
            this.messageService.add({severity: 'success', summary: ' حذف ', detail: response.data});
            this.ngOnInit();
          }
          else{
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
