import { Component } from '@angular/core';
import { Kontak } from './models/kontaklar/kontaklar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  kontak:Kontak[]=[]

  
}
