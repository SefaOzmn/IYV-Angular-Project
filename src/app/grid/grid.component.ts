import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kontak } from '../models/kontaklar/kontaklar';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  userId:any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {kontak: Kontak}, private fb:FormBuilder, private auth:AuthService , private task:TaskService) { 

  }

  Kontaklar:Kontak[]=[]
  formGrup!:FormGroup;

  ngOnInit(): void {
    this.formGrup = this.fb.group({
      //mail eklenecek
      tc:[this.data.kontak.tc, Validators.required],
      ad:[this.data.kontak.ad, Validators.required],
      soyad:[this.data.kontak.soyad, Validators.required],
      cep_tel:[this.data.kontak.cep_tel, Validators.required],
      tel_no:[this.data.kontak.tel_no, Validators.required],
      adres:[this.data.kontak.adres, Validators.required],
      email:[this.data.kontak.email, Validators.required],
      gk_uye:[this.data.kontak.gk_uye, Validators.required],
      mt_guncel:[this.data.kontak.mt_guncel, Validators.required],
      durum:[this.data.kontak.durum, Validators.required],
      kategori:[this.data.kontak.kategori, Validators.required],
      referans:[this.data.kontak.referans, Validators.required]

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
  kontak.id = this.data.kontak.id
  this.task.updateKontak(kontak).subscribe(res => {
    console.log(res)
    alert("Başarıyla Güncellendi!")
  })
 }

 refresh(){
  window.location.reload(); 

}

}
