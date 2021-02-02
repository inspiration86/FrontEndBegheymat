import { Component, OnInit } from '@angular/core';
import {AdminserviceService} from '../adminservice.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-track-orders',
  templateUrl: './admin-track-orders.component.html',
  styleUrls: ['./admin-track-orders.component.css']
})
export class AdminTrackOrdersComponent implements OnInit {
  orders: any[] = [];
  trackOrderNo: any;
  constructor(private service: AdminserviceService,
              private router: Router) {
  }


  ngOnInit(): void {

    this.service.getAllAdvices().subscribe((response) => {
      if (response.success === true) {
        this.orders = response.data;
      }
    });
  }

  search(): void {

  }
}
