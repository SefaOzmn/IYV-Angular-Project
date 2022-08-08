import { Kontak } from './../models/kontaklar/kontaklar';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { NotificationService } from './notification.service';
import { baseUrl } from '../utils/baseurl';
import { AuthService } from './auth.service';
import { appnotification } from '../models/kontaklar/notification';
import { MailService } from './mail.service';
import { Bagis } from '../models/kontaklar/bagis';
import { GridComponent } from '../grid/grid.component';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(
    private notificationService: NotificationService,
    private http: HttpClient,
    private authService: AuthService,
    private mailService: MailService
  ) {}
  selectedTask!: any;
  //saveTable da çağırılan fonksiyon

  insertKontak(data: Kontak) {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '72712321368463872566',
      Operation: 'insert',
      Encrypted: 1951,
      Data: `Insert into "Turkuvaz".public.kontaklar(tc,ad,soyad,cep_tel,tel_no,adres,email,gk_uye,mt_guncel,durum,kategori,referans) values(${data.tc}, '${data.ad}', '${data.soyad}',${data.cep_tel},${data.tel_no},'${data.adres}','${data.email}','${data.gk_uye}','${data.mt_guncel}','${data.durum}','${data.kategori}','${data.referans}')`,
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body);
    
    // return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
    //   map((response: any) => {
    //     return response.message;
    //   })
    // );
  }
  updateKontak(data: Kontak) {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '72712321368463872566',
      Operation: 'update',
      Encrypted: 1951,
      Data:
        `Update "Turkuvaz".public.kontaklar Set tc=${data.tc},ad='${data.ad}',soyad='${data.soyad}',cep_tel=${data.cep_tel},tel_no=${data.tel_no},adres='${data.adres}',email='${data.email}',gk_uye='${data.gk_uye}',mt_guncel='${data.mt_guncel}',durum='${data.durum}',kategori='${data.kategori}',referans='${data.referans}' WHERE id = ${data.id}`,
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body);
  }
  deleteKontak(id: any) {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '72712321368463872566',
      Operation: 'delete',
      Encrypted: 1951,
      Data: `delete from \"Turkuvaz\".public.kontaklar where id=${id}`
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body)
      
  }
  //readTable da çağırılan fonksiyon
  getTasks() {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '72712321368463872566',
      Operation: 'read',
      Encrypted: 1951,
      Data: 'select * from "Turkuvaz".public.kontaklar',
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }

  getTasksWithDetail() {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '72712321368463872566',
      Operation: 'read',
      Data: 'select t.id,t.title,t.details,t.supporter,t.status,t.project,t.rtype,t.assignee,t.priority,t.createddate,t.duedate,t.startdate,t.createdby,t.assignedby ,t.plannedeffort ,s.text as statusText,p.name as projectName, r.text as priorityText,rt.text as rtypeText from tasks t , status s,projects p, priority r,types rt where t.status=s.id AND t.project=p.id AND t.priority=r.id AND t.rtype=rt.id',
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }

  getTaskById(id: any) {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '72712321368463872566',
      Operation: 'read',
      Data: `select t.id,t.title,t.details,t.status,t.project,t.rtype,t.assignee,t.priority,t.createddate,t.duedate,t.startdate,t.createdby,t.assignedby,t.plannedeffort ,s.text as statusText,p.name as projectName, r.text as priorityText,rt.text as rtypeText from tasks t , status s,projects p, priority r,types rt where t.status=s.id AND t.project=p.id AND t.priority=r.id AND t.rtype=rt.id AND t.id=${id}`,
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }

  getTasksByFollowerId() {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '72712321368463872566',
      Operation: 'read',
      Data: `select * from \"TaskManagement\".public.tasks where supporter like '%${this.authService.getCurrentUserId()}%'`,
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }

  deletetask(id: any) {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '72712321368463872566',
      Operation: 'delete',
      Data: `delete from \"TaskManagement\".public.tasks where id=${id}`,
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }

  getTypes() {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '72712321368463872566',
      Operation: 'read',
      Data: 'select * from "TaskManagement".public.types t where t.tag=\'Task\' order by t.order',
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }

  updateStatus(status: any, id: any) {


    const updateBody = {
      Token: this.authService.getToken(),
      DataStoreId: '72712321368463872566',
      Operation: 'upsert',
      Data:
        `Update tasks ` +
        `Set status='${status}', updatedate=Now() ` +
        `WHERE id = ${id}`,
    };
    return this.http.post(baseUrl + 'Applications/DataOps', updateBody).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }

  updatePrio(prio: any, id: any) {
    const updateBody = {
      Token: this.authService.getToken(),
      DataStoreId: '72712321368463872566',
      Operation: 'upsert',
      Data:
        `Update tasks ` +
        `Set priority='${prio}' ,updatedate=Now() ` +
        `WHERE id = ${id}`,
    };
    return this.http.post(baseUrl + 'Applications/DataOps', updateBody).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }

  getPriority() {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '72712321368463872566',
      Operation: 'read',
      Data: 'select * from "TaskManagement".public.priority p where p.tag=\'Task\' order by p.order',
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }

  getProjects() {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '72712321368463872566',
      Operation: 'read',
      Data: 'select * from "TaskManagement".public.projects',
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }

  getStatus() {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '72712321368463872566',
      Operation: 'read',
      Data: 'select * from "TaskManagement".public.status s where s.tag=\'Task\' order by s.order',
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }
  insertBagis(data: Bagis) {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '35612368858558141732',
      Operation: 'insert',
      Encrypted: 1951,
      Data: `Insert into public.bagis(bagisci_id,miktar,bagis_tarih,bagis_tipi) values(${data.bagisci_id},'${data.miktar}', '${data.bagis_tarih}','${data.bagis_tipi}')`,
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body);
  }
  updateBagis(data: Bagis) {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '35612368858558141732',
      Operation: 'update',
      Encrypted: 1951,
      Data:
        `Update public.bagis ` +
        `Set bagisci_id=${data.bagisci_id}, miktar=${data.miktar}, bagis_tarih='${data.bagis_tarih}',bagis_tipi='${data.bagis_tipi}' ` +
        `WHERE bagis_id = ${data.bagis_id}`,
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body);
  }
  deleteBagis(id:any) {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '35612368858558141732',
      Operation: 'delete',
      Encrypted: 1951,
      Data: `delete from \"Turkuvaz\".public.bagis where bagis_id=${id}`
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body);
  }
  getBagis() {
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '35612368858558141732',
      Operation: 'read',
      Encrypted: 1951,
      Data: 'select * from public.bagis',
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }


  getComboBoxName(){
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '35612368858558141732',
      Operation: 'read',
      Encrypted: 1951,
      Data: 'SELECT DISTINCT id,ad,soyad FROM public.kontaklar',
    };
    return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
      map((response: any) => {
        return response.message;
      })
    );
  }
  getBagisKontakJoin(){
    const body = {
      Token: this.authService.getToken(),
      DataStoreId: '35612368858558141732',
      Operation: 'read',
      Encrypted: 1951,
      Data: "select * from public.bagis " + 
      "Join kontaklar on public.bagis.bagisci_id=public.kontaklar.id"
  };
  return this.http.post(baseUrl + 'Applications/DataOps', body).pipe(
    map((response: any) => {
      return response.message;
    })
  );
  }
}
