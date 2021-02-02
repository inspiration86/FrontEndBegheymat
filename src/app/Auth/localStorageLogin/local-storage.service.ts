import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  public userData: any;
  public userJson: any;
  public userType: any = null;

  constructor(private router: Router) {

  }

  saveCurrentUser(data: any) {
    localStorage.setItem('currentUser', data);
  }

  getCurrentUser(): boolean {
    this.userData = localStorage.getItem('currentUser');
    this.userJson = JSON.parse(this.userData);
    if (this.userData !== undefined && this.userData !== null) {
      this.userJson = JSON.parse(this.userData);
      this.userType = this.userJson['type'];
      return true;
    } else {
      return false;
    }
  }

  removeCurrentUser(): void {
    // alert('del');
    localStorage.removeItem('currentUser');
  }

  public isNotSupportUser(): any {
    if (this.userType !== null) {
      if (this.userType === 'Admin' || this.userType === 'Master') {
        this.router.navigate(['/admin/index']);
      }
    } else {
      this.router.navigate(['/admin']);
    }
  }

  public isMasterUser(): any {
    if (this.userType !== null) {
      if (this.userType !== 'Master') {
        this.router.navigate(['/admin/index']);
      }
    } else {
      this.router.navigate(['/admin']);
    }
  }
}
