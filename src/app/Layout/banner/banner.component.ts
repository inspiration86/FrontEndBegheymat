import { Component, OnInit } from '@angular/core';
import {LayoutService} from '../layout.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  banners: any[] = [];
  constructor(private service: LayoutService) { }

  ngOnInit(): void {
    this.service.getBanners().subscribe((response) => {
        this.banners = response['data'];
      });
  }

}
