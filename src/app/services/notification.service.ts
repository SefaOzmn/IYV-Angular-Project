import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { appnotification } from '../models/kontaklar/notification';
import { baseUrl } from '../utils/baseurl';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  getNotifications() {
    const body = {
      "Token": this.authService.getToken(),
      "DataStoreId": "68216734857877757634",
      "Operation": "read",
      "Data": `select * from \"TaskManagement\".public.notifications where userid='${this.authService.getCurrentUserId()}' and delivered='0'`
    }
    return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  upsertNotification(values: appnotification) {
    const body = {
      "Token": this.authService.getToken(),
      "DataStoreId": "68216734857877757634",
      "Operation": "read",
      "Data": `insert into \"TaskManagement\".public.notifications (createdate,delivered,message,userid,tag,recordid) ` +
        // `values(Now(),0,'deneme','deneme','Task','deneme') `

        `values(Now(),'${values.delivered}','${values.message}','${values.user}','${values.tag}','${values.recordid}') `
    }
    return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }

  updateNotification(id: any) {
    const body = {
      "Token": this.authService.getToken(),
      "DataStoreId": "68216734857877757634",
      "Operation": "read",
      "Data": `Update notifications ` +
        `Set delivered='1' where id='${id}'`
    }
    return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
      map((response: any) => {
        return response.message
      })
    );
  }
}
