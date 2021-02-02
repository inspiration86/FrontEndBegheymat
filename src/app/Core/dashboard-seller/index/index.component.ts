import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map, shareReplay} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../../Auth/localStorageLogin/local-storage.service';
import {SellerService} from '../seller.service';
import * as moment from 'jalali-moment';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  activeSeller;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

public date=moment(Date.now()).locale('fa').format('YYYY/M/D');
public time;
  constructor(private breakpointObserver: BreakpointObserver,
              private router: Router,
              public localStorage: LocalStorageService) {
  }

  ngOnInit(): void {
    setInterval(()=>{
      this.time=moment(Date.now()).locale('fa').format('HH:mm:ss');
    },1000);
    const res = this.localStorage.getCurrentUser();
    this.activeSeller=this.localStorage.userJson['active']
    if (res === false) {
      this.router.navigateByUrl('/sellerBe/login');
    }

  }

  logOut(): void{
    this.localStorage.removeCurrentUser();
    this.router.navigateByUrl('/');
  }
}
