import { Component, OnInit } from '@angular/core';
import { DronesDataService, TreeScanRoot } from '../drones-data.service';

@Component({
  selector: 'app-manage-drones',
  templateUrl: './manage-drones.component.html',
  styleUrls: ['./manage-drones.component.css'],
})
export class ManageDronesComponent implements OnInit {
  public activeDronesIds: number[];

  public damagedTreesData?: TreeScanRoot;
  public selectedFlyDroneId: number;
  public selectedScanDroneId: number;
  public currX: number;
  public currY: number;
  public treeX: number;
  public treeY: number;

  constructor(public droneService: DronesDataService) {
    this.activeDronesIds = [];
    this.selectedFlyDroneId = 0;
    this.selectedScanDroneId = 0;
    this.currX = 0;
    this.currY = 0;
    this.treeX = 0;
    this.treeY = 0;
  }

  ngOnInit(): void {
    this.loadActiveDrones();
  }

  public scanAroundDrone(id: number) {
    this.droneService
      .scanAroundDrone(id)
      .subscribe((data) => (this.damagedTreesData = data));
  }

  public flyDroneTo(id: number, x: number, y: number) {
    this.droneService.flyDroneTo(id, x, y).subscribe();
  }

  public loadActiveDrones() {
    this.droneService.loadDrones().subscribe((data) => {
      for (let drone of data) {
        if (drone.isActive) {
          this.activeDronesIds.push(drone.id);
        }
      }
    });
  }

  public markTreeAsExamined(x: number, y: number){
    this.droneService.markTreeAsExamined(x, y).subscribe();
  }
}
