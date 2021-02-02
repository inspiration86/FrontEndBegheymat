import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import {SellerService} from '../seller.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  public listPurchases: any[];
  rowGroupMetadata: any;
  cols: any[];
  userID: any;
  display:boolean;
  constructor(private sellerService: SellerService,
              private serviceStorage: LocalStorageService,
              private spinner: NgxSpinnerService) {
    this.cols = [
      {field: 'candidateNumber', header: 'شماره داوطلب'},
      {field: 'nationalCode', header: 'شماره ملی'},
      {field: 'firstName', header: 'نام'},
      {field: 'lastName', header: 'نام خانوادگی'},
      {field: 'fatherName', header: 'نام پدر'},
      {field: 'mobile', header: 'شماره همراه '},
      {field: 'birthday', header: 'تاریخ تولد  '},
      {field: 'serialNumber', header: 'سریال شناسنامه'}
    ];

  }

  ngOnInit(): void {
    this.spinner.show()
    if (this.serviceStorage.getCurrentUser() === true) {
      let data = {
        sellerID: this.serviceStorage.userJson['_id']
      };

      this.sellerService.onDisplayBasket(data).subscribe((response) => {
        if (response['success'] === true) {
         this.spinner.hide();
          // if(response['data'].success==='موفق'){
          this.listPurchases = response['data'];
          // }
        }

      });
    }
  }
  showDialog() {
    this.display = true;
  }


}
