import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DronesComponent } from './drones/drones.component';
import { ManageDronesComponent } from './manage-drones/manage-drones.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'drones'},
  { path: 'drones', component: DronesComponent },
  { path: 'drones/manage', component: ManageDronesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
