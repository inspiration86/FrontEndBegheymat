import { Component, OnInit } from '@angular/core';
import {AdminserviceService} from '../adminservice.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  orders: any[] = [];

  constructor(private service: AdminserviceService,
              private localStorage: LocalStorageService) {
  }


  ngOnInit(): void {
   // this.localStorage.isNotSupportUser();

    this.service.getAllAdvices().subscribe((response) => {
      if (response.success === true) {
        this.orders = response.data;
      }
    });
  }
}
