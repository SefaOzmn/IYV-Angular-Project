import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { baseUrl } from '../utils/baseurl';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private authService: AuthService,private http:HttpClient) { }

  sendMail(mailAddresList: string, subject: string, title: string, taskDesc: string) {
    const body = {
      "Token": this.authService.getToken(),
      "BussionScript": {
        "BussionScriptId": "",
        "Name": "Test Script",
        "Params": [
          mailAddresList,
          subject,
          title,
          taskDesc
        ],
        "FilePath": "/opt/bussion/Server/wwwroot/Apps/TaskManager-22657217463883172522-143541/Scripts/mail.py",
        "Description": "Description test",
        "Type": "python3",
        "CreatedByUserId": "",
        "SourceDatabaseType": "mongo",
        "SourceServer": "192.168.42.169",
        "SourcePort": "271017",
        "SourceUsername": "",
        "SourcePassword": "",
        "SourceDB": "Test",
        "SourceTimeOut": 5,
        "DestinatioDatabaseType": "mongo",
        "DestinationServer": "192.168.42.169",
        "DestinationPort": 27017,
        "DestinationUsername": "",
        "DestinationPassword": "",
        "DestinationDB": "",
        "DestinationTimeOut": 10
      }
    }
    return this.http.post(baseUrl + 'AI/StartScript', body).pipe(
      map((response: any) => {
        console.log('mail',response.message)
        return response.message
      })
    );
  }



}
