import { Component, OnInit } from '@angular/core';
import { DronesDataService, Drone, TreeScanRoot } from '../drones-data.service';

@Component({
  selector: 'app-drones',
  templateUrl: './drones.component.html',
  styleUrls: ['./drones.component.css'],
})
export class DronesComponent implements OnInit {
  public dronesData?: Drone[];

  constructor(public droneService: DronesDataService) {}

  ngOnInit(): void {
    this.loadDrones();
  }

  public loadDrones() {
    this.droneService
      .loadDrones()
      .subscribe(data => this.dronesData = data);
  }

  public activateDroneById(id: number) {
    this.droneService.activateDroneById(id).subscribe(() => this.loadDrones());
  }

  public shutdownDroneById(id: number) {
    this.droneService.shutdownDroneById(id).subscribe(() => this.loadDrones());
  }
}
