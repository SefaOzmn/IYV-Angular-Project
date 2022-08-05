import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TasksComponent } from './tasks/tasks.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { GridComponent } from './grid/grid.component';
import { LeftbarComponent } from './leftbar/leftbar.component';
import { BagisComponent } from './bagis/bagis.component';
import { BagisGridComponent } from './bagis-grid/bagis-grid.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BagisUpdateComponent } from './bagis-update/bagis-update.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatDialog, MatDialogModule} from '@angular/material/dialog'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    TasksComponent,
    NavbarComponent,
    GridComponent,
    LeftbarComponent,
    BagisComponent,
    BagisGridComponent,
    BagisUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatTableModule,
    NgbModule,
    MatDialogModule
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
