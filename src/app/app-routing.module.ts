import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { BagisGridComponent } from './bagis-grid/bagis-grid.component';
import { BagisUpdateComponent } from './bagis-update/bagis-update.component';
import { BagisComponent } from './bagis/bagis.component';
import { GridComponent } from './grid/grid.component';
import { HomeComponent } from './home/home.component';
import { LeftbarComponent } from './leftbar/leftbar.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'home', component: HomeComponent },
  { path: 'bagis', component: BagisComponent },
  { path: 'bagis-grid', component: BagisGridComponent },
  { path: 'bagis/:id', component: BagisComponent },
  { path: 'bagis-update', component: BagisUpdateComponent },
  { path: 'grid', component: GridComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
