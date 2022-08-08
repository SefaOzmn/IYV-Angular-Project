import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { Bagis } from '../models/kontaklar/bagis';
import { Kontak } from '../models/kontaklar/kontaklar';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-bagis-update',
  templateUrl: './bagis-update.component.html',
  styleUrls: ['./bagis-update.component.css'],
})
export class BagisUpdateComponent implements OnInit {
  selected!: Bagis;

  userId:any
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: {bagis: Bagis},private fb:FormBuilder,private auth:AuthService,private task:TaskService,
    private route: ActivatedRoute,
    private router:Router,
    private taskService: TaskService
  ) {}

  Bagiscilar:Bagis[]=[]
  formGrup!:FormGroup
  options:any = []

  ngOnInit(): void {
    this.formGrup = this.fb.group({
      bagis_id:[this.data.bagis.bagis_id, Validators.required],
      bagisci_id:[this.data.bagis.bagisci_id, Validators.required],
      miktar:[this.data.bagis.miktar, Validators.required],
      bagis_tarih:[this.data.bagis.bagis_tarih, Validators.required],
      bagis_tipi:[this.data.bagis.bagis_tipi, Validators.required]
    })
    console.log(this.formGrup.value.id)
    this.getComboBox()
  }
  get f() { 
    return this.formGrup.controls; 
  }
  
  saveBagis(){
    if (this.formGrup.valid){
      console.log(this.formGrup.value)
    let bagisci = Object.assign(this.formGrup.value, {} as Bagis)
    this.task.insertBagis(bagisci).subscribe(res => {
      console.log(res)
    })
    }
    else{
      alert("Tüm boşlukları doldurunuz")
    }
    
  }
  
  readBagis(){
    let bagisci = Object.assign(this.formGrup.value, {} as Bagis)
    this.task.getBagis().subscribe(res => {
      console.log(res)
    })
  }
  deleteBagis(){
    let bagisci = Object.assign(this.formGrup.value, {} as Bagis)
    this.task.getBagis().subscribe(res => {
      console.log(res)
    })
  }
  updateBagis(){
    
    let bagis = Object.assign(this.formGrup.value, {} as Bagis)
    // bagis.bagis_id=this.data.bagis.bagis_id
    console.log(bagis)
    this.task.updateBagis(bagis).subscribe(res => {
      console.log(res)
      alert("Başarıyla Güncellendi!")
    
    })
  }

  getComboBox(){
    this.task.getComboBoxName().subscribe(res => {
      this.options =  res
      console.log(this.options)
      
    })
  }

  updateKontak(){
    let kontakci = Object.assign(this.formGrup.value, {} as Kontak)
    console.log(kontakci)
    this.task.updateKontak(kontakci).subscribe(res => {
      console.log(res)
      alert("Kayıt Güncellendi!")
      
    })
  }
  getJoin(){
    this.task.getBagisKontakJoin().subscribe(res => {
      this.options =  res
      console.log(this.options)    
    })
  }
  refresh(){
    window.location.reload(); 

  }
  
}



  //   this.route.paramMap
  //   .pipe(switchMap(route => {
  //     const id = route.get('id') || 0;
  //     this.taskService.get('id')
  //     return of(null);
  //   }))
  //   .subscribe((route) => {
  //     console.log(route?.get('id'));
  //   });
 

