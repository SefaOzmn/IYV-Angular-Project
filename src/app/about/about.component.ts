import { Kontak } from './../models/kontaklar/kontaklar';
import { Component, Input,AfterViewInit,ViewChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';
import { GridComponent } from '../grid/grid.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})


export class AboutComponent implements OnInit {
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

  kontakArray:Kontak[]=[]
  

  constructor(public dialog:MatDialog,public task:TaskService,private fb:FormBuilder,private auth:AuthService, private router:Router,private ngbmodal:NgbModal) { }
  formGrup!:FormGroup


  ngOnInit(): void {
    this.formGrup = this.fb.group({
      id:['', Validators.required],
      tc:['', Validators.required],
      ad:['', Validators.required],
      soyad:['', Validators.required],
      cep_tel:['', Validators.required],
      tel:['', Validators.required],
      adres:['', Validators.required],
      gk_uye:['', Validators.required],
      mt_guncel:['', Validators.required],
      durum:['', Validators.required],
      kategori:['', Validators.required],
      referans:['', Validators.required],
      email:['', Validators.required],
      //burda kaldık
      

    })
    console.log(this.formGrup.value.id)
    this.readKontak()
  }
  
  routeContact(){
    this.router.navigateByUrl("/bagis-grid")
  }
  readKontak(){
    this.task.getTasks().subscribe(res => {
      this.kontakArray=res as any;
    })
  }

  update(Kontak:Kontak):void{
    if (!Kontak) {
      return;
    }
    console.log(Kontak)
    this.router.navigate([`bagis-update/${Kontak.id}`]);
  }
  deleteTable(id:any){
    console.log(id)
    
    this.task.deleteKontak(id).subscribe(res => {
      console.log(res)
      alert("Kayıt silindi!")
    })
  }
  updateKontak(){
      let kontakci = Object.assign(this.formGrup.value, {} as Kontak)
      console.log(kontakci)
      this.task.updateKontak(kontakci).subscribe(res => {
        console.log(res)
      })
    }
    openDialog2(kontak: Kontak){
      this.dialog.open(GridComponent, {
        data: {kontak: kontak}
      })
    }
    refresh(){
      window.location.reload(); 
  
    }

  }

  //   this.readBagis()
  // }

  // readBagis(){
  //   this.task.getBagis().subscribe(res => {
  //     console.log(res);
  //     this.kontakArray=res as any;
  //   })
  // }




  // // remove(){
  // //   .slice(0,1)
  // // }

