import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {UserService} from "../User.service";
import {Router} from "@angular/router";
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import * as moment from 'jalali-moment';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  getInfoUser: any;
  firstName;
  lastName;

  isLogged = false;
  public date = moment(Date.now()).locale('fa').format('YYYY/M/D');
  public time;
  constructor(private serviceStorage:LocalStorageService,
              private breakpointObserver: BreakpointObserver,
              private userService: UserService,
              private router:Router,
              public localStorage: LocalStorageService) {
  }

  ngOnInit(): void {

    setInterval(() => {
      this.time = moment(Date.now()).locale('fa').format('HH:mm:ss');
    }, 1000);
    this.isLogged = this.localStorage.getCurrentUser();

    if (this.isLogged === true) {
      this.getInfoUser = this.serviceStorage.userJson;
      let data = {
        mobile: this.serviceStorage.userJson['mobile']
      }
      this.userService.onfindUser(data).subscribe((response) => {
        if (response['success'] === true) {
          this.firstName = response['data']['firstName'];
          this.lastName = response['data']['lastName'];

        }
      })
    }

  }

  logOut(): void {
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/');
  }
}
