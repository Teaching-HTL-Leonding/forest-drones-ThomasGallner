import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DRONE_BASE_URL } from './app.module';

export interface Drone {
  id: number;
  isActive: boolean;
  position?: Position;
}

export interface Position {
  x: number;
  y: number;
}

export interface TreeScanRoot {
  dronePosition: Position
  damagedTrees: Position[]
}

@Injectable({
  providedIn: 'root',
})
export class DronesDataService {
  constructor(
    private http: HttpClient,
    @Inject(DRONE_BASE_URL) private droneBaseUrl: string
  ) {}

  public loadDrones(): Observable<Drone[]> {
    return this.http.get<Drone[]>(`${this.droneBaseUrl}/drones`);
  }

  public scanAroundDrone(id: number): Observable<TreeScanRoot>{
    return this.http.get<TreeScanRoot>(`${this.droneBaseUrl}/drones/${id}/scan`);
  }

  public activateDroneById(id: number) {
    return this.http.post(`${this.droneBaseUrl}/drones/${id}/activate`, '');
  }

  public shutdownDroneById(id: number) {
    return this.http.post(`${this.droneBaseUrl}/drones/${id}/shutdown`, '');
  }

  public flyDroneTo(id: number, x: number, y: number) {
    let body = {
      x: x,
      y: y,
    };

    return this.http.post(`${this.droneBaseUrl}/drones/${id}/flyTo`, body);
  }

  public markTreeAsExamined(x: number, y: number) {
    let body = {
      x: x,
      y: y,
    };

    return this.http.post(`${this.droneBaseUrl}/trees/markAsExamined`, body);
  }
}
