import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kontak } from '../models/kontaklar/kontaklar';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  mockApp: any = {
    access: 1,
    appCode: "task",
    applicationId: "44643636854134588511",
    applicationLink: "task-44643636854134588511-155152",
    applicationStatus: 1,
    creationDate: "01/21/2022 11:40:14",
    description: "Task Management and programmig",
    domain: "155152",
    groups: ['48464852585153113513', '25822265578753143542'],
    icon: "/BussionImages/Application/BussionApplication.png",
    name: "Task Management App",
    openerMethod: 2,
    owner: "Bussion TR",
    ownerId: "77821745565883438625",
    updateDate: "01/21/2022 11:40:14",
    updatedBy: "Bussion TR"
  }

  getToken() { // ************
    return "57487654872244417543"
    //return localStorage.getItem('token')
  }
  getCurrentUserId() {
    return localStorage.getItem('userId')
  }

  getAppInfo() {
    //appin hitap ettiği grup idlerini alacağız ve bu idlere göre kullanıcı çekeceğiz =>localStorage.getItem('app')
    let App = localStorage.getItem('app')
    if (App)
      return JSON.parse(App)
    else
      return null;
  }


  getUserRole() {
    let user = localStorage.getItem('user');
    if (user)
      return JSON.parse(user)
    else
      return null;
  }

  
  register(user: Kontak) {
    alert("calisti")
     return this.http.post('/users/register', user);
      
  }
    
  
}