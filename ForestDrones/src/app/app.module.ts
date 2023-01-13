import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DronesComponent } from './drones/drones.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ManageDronesComponent } from './manage-drones/manage-drones.component';

export const DRONE_BASE_URL = new InjectionToken<string>('DroneBaseUrl');

@NgModule({
  declarations: [
    AppComponent,
    DronesComponent,
    ManageDronesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: DRONE_BASE_URL,
      useValue: 'http://localhost:5110',
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
