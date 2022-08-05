import { Kontak } from './../models/kontaklar/kontaklar';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Bagis } from '../models/kontaklar/bagis';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-bagis',
  templateUrl: './bagis.component.html',
  styleUrls: ['./bagis.component.css']
})
export class BagisComponent implements OnInit {
  userId:any
  bagisci:Bagis={
    bagis_id:0,
    bagisci_id:0,
    miktar:0,
    bagis_tarih: new Date(),
    bagis_tipi:""
  }

  constructor(private fb:FormBuilder,private auth:AuthService,private task:TaskService) { }

  Bagiscilar:Bagis[]=[]
  formGrup!:FormGroup
  options:any = []

  ngOnInit(): void {
    this.formGrup = this.fb.group({
      bagisci_id:['', Validators.required],
      miktar:['', Validators.required],
      bagis_tarih:['', Validators.required],
      bagis_tipi:['', Validators.required]
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
      alert("Bağış Kaydedildi")
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
    let bagisci = Object.assign(this.formGrup.value, {} as Bagis)
    this.task.updateBagis(bagisci).subscribe(res => {
      console.log(res)
    })
  }
  getComboBox(){
    this.task.getComboBoxName().subscribe(res => {
      this.options =  res
      console.log(this.options)
      
    })
  }
  
}
