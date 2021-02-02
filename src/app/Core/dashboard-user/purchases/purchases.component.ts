import {Component, OnInit} from '@angular/core';
import {UserService} from '../User.service';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.css']
})
export class PurchasesComponent implements OnInit {
  public listProducts: any[];
  spinnerSuccess: boolean = true;
  cols: any[];
  userID: any;

  constructor(private userService: UserService,
              private localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    if (this.localStorage.getCurrentUser() === true) {
      this.userService.getAllPurchases(this.localStorage.userJson['id']).subscribe((response) => {
        if (response.success === true) {
          this.spinnerSuccess = false;
          this.listProducts = response.data;
        }

      });
    }
  }

}
