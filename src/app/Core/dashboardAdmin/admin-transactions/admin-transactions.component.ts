import {Component, OnInit} from '@angular/core';
import {AdminserviceService} from '../adminservice.service';
import {MessageService} from 'primeng/api';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-admin-transactions',
  templateUrl: './admin-transactions.component.html',
  styleUrls: ['./admin-transactions.component.css'],
})
export class AdminTransactionsComponent implements OnInit {

  transactions: any[] = [];
  successfulTransactions: any[] = [];
  unsuccessfulTransactions: any[] = [];

  constructor(private service: AdminserviceService,
              private localStorage: LocalStorageService) {
  }


  ngOnInit(): void {
    //this.localStorage.isNotSupportUser();

    this.service.getAllSuccessfulTransactions().subscribe((response) => {
      if (response.success === true) {
        this.successfulTransactions = response.data;
      }
    });

    this.service.getAllUnsuccessfulTransactions().subscribe((response) => {
      if (response.success === true) {
        this.unsuccessfulTransactions = response.data;
      }
    });

    this.service.getAllTransactions().subscribe((response) => {
      if (response.success === true) {
        this.transactions = response.data;
      }
    });
  }
}
