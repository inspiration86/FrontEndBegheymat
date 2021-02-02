import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private  http: HttpClient) {
  }

  getAllPurchases(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/user/basketList/' + id);
  }

  getPayment(id: any): any {
    return this.http.get('http://194.5.175.25:3005/api/v1/user/getPayment/' + id);
  }

  onfindUser(data: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/user/user', data);
  }

  updateUser(id: any, data: any) {
    return this.http.put('http://194.5.175.25:3005/api/v1/user/updateUser/' + id, data);
  }

  changePasswordUser(id: any, data: any) {
    return this.http.put('http://194.5.175.25:3005/api/v1/user/changePassword/' + id, data);
  }

  uploadFile(image: any): any {
    return this.http.post('http://194.5.175.25:3005/api/v1/admin/image', image);
  }

  changeMobile(id: any, data: any): any {
    return this.http.put('http://194.5.175.25:3005/api/v1/user/changeMobile/' + id, data);
  }

  getTokenSms() {
    let data = {
      UserApiKey: 'f2a1c337366e0cd3ddffc337',
      SecretKey: 'it66)%#teBC!@*&'
    };
    return this.http.post('https://RestfulSms.com/api/Token', data);
  }

  sendSms(data: any, token: any) {
    const headers = {
      'content-type': 'application/json',
      'x-sms-ir-secure-token': token
    };

    return this.http.post('https://RestfulSms.com/api/UltraFastSend', data, {'headers': headers});
  }
}
