import { Kontak } from './../models/kontaklar/kontaklar';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { first } from 'rxjs';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  userId:any;
  data: Kontak = {
    id: 0,
    tc: 0,
    ad: '',
    soyad: '',
    cep_tel: 0,
    tel_no: 0,
    adres: '',
    gk_uye: false,
    mt_guncel: false,
    durum:false,
    kategori:"",
    referans:"",
    email:""

  }
  constructor(private fb:FormBuilder, private auth:AuthService , private task:TaskService) { 

  }

  Kontaklar:Kontak[]=[]
  formGrup!:FormGroup;

  ngOnInit(): void {
    this.formGrup = this.fb.group({
      
      tc:['', Validators.required],
      ad:['', Validators.required],
      soyad:['', Validators.required],
      cep_tel:['', Validators.required],
      tel_no:['', Validators.required],
      adres:['', Validators.required],
      email:['', Validators.required],
      gk_uye:['', Validators.required],
      mt_guncel:['', Validators.required],
      durum:['', Validators.required],
      kategori:['', Validators.required],
      referans:['', Validators.required]
    })
    console.log(this.formGrup.value.id)
  }
  get f() { 
    return this.formGrup.controls; 
  }
  
  saveTable(){
    if(this.formGrup.valid){
      let kontak = Object.assign(this.formGrup.value, {} as Kontak)
      this.task.insertKontak(kontak).subscribe(res => {
        console.log(res)
        alert("Kaydedildi!")
      })
    }
    else{
      alert("Lütfen tüm boşlukları doldurunuz")
    }
    
  }
  
  readTable(){
    let kontak = Object.assign(this.formGrup.value, {} as Kontak)
    this.task.getTasks().subscribe(res => {
      
    })
  }
  deleteTable(){
    let kontak = Object.assign(this.formGrup.value, {} as Kontak)
    this.task.deleteKontak(kontak).subscribe(res => {
      console.log(res)
    })
  }
 updateTable(){
  let kontak = Object.assign(this.formGrup.value, {} as Kontak)
  this.task.updateKontak(kontak).subscribe(res => {
    console.log(res)
  })
 }
}