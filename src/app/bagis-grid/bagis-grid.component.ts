import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BagisUpdateComponent } from '../bagis-update/bagis-update.component';
import { Bagis } from '../models/kontaklar/bagis';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-bagis-grid',
  templateUrl: './bagis-grid.component.html',
  styleUrls: ['./bagis-grid.component.css']
})
export class BagisGridComponent implements OnInit {
  bagisArray:Bagis[]=[]
  data: Bagis = {
    bagis_id: 0,
    bagisci_id: 0,
    miktar:0,
    bagis_tarih: new Date(),
    bagis_tipi:''
    
  }
  options:any = []

  constructor(public task:TaskService,private fb:FormBuilder,private auth:AuthService, private router:Router,public dialog:MatDialog) { 
  }
  
  formGrup!:FormGroup

  ngOnInit(): void {
    this.formGrup = this.fb.group({
      bagis_id:['', Validators.required],
      bagisci_id:['', Validators.required],
      miktar:['', Validators.required],
      bagis_tarihi:['', Validators.required],
      bagis_tipi:['', Validators.required]  
    })
      this.readBagis()
      this.getJoin()
  }
  readBagis(){
    this.task.getBagis().subscribe(res => {
      console.log(res);
      this.bagisArray=res;
      // as any 
    })
  }

  update(bagis:Bagis):void{
    if (!bagis) {
      return;
    }
    console.log(bagis)
    this.router.navigate([`bagis-update/${bagis.bagisci_id}`]);
  }
  deleteBagis(id:any){
    console.log(id)

    this.task.deleteBagis(id).subscribe(res => {
      console.log(res)
      alert("Kayıt Silindi!")
    })
  }
  openDialog(bagis: Bagis){
    this.dialog.open(BagisUpdateComponent, {
      data: {bagis: bagis}
    })
  }
  getComboBox(){
    this.task.getComboBoxName().subscribe(res => {
      this.options =  res
      console.log(this.options)
      
    })
  }
  getJoin(){
    this.task.getBagisKontakJoin().subscribe(res => {
      this.options =  res
      console.log(this.options)    
    })
  }
}
