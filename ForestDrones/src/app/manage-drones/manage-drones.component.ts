import { Component, OnInit } from '@angular/core';
import {
  DronesDataService,
  Position,
  TreeScanRoot,
} from '../drones-data.service';

@Component({
  selector: 'app-manage-drones',
  templateUrl: './manage-drones.component.html',
  styleUrls: ['./manage-drones.component.css'],
})
export class ManageDronesComponent implements OnInit {
  public activeDronesIds: number[];

  public damagedTreesData?: TreeScanRoot;
  public selectedDroneId: number;
  public currX: number;
  public currY: number;
  public inputTreeX: number;
  public inputTreeY: number;

  public nearestDamagedTreePos?: Position;
  public distToNearestDamagedTree?: Position;

  constructor(public droneService: DronesDataService) {
    this.activeDronesIds = [];
    this.selectedDroneId = 0;
    this.selectedDroneId = 0;
    this.currX = 0;
    this.currY = 0;
    this.inputTreeX = 0;
    this.inputTreeY = 0;
  }

  ngOnInit(): void {
    this.loadActiveDrones();
  }

  public scanAroundDrone(id: number) {
    this.droneService.scanAroundDrone(id).subscribe((data) => {
      this.damagedTreesData = data;

      this.nearestDamagedTreePos = this.getLocationOfNearestDamagedTree();

      console.log(this.nearestDamagedTreePos);
      console.log(this.distToNearestDamagedTree);
    });
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

  public markTreeAsExamined(x: number, y: number) {
    this.droneService.markTreeAsExamined(x, y).subscribe(() => this.flyDroneToCurrLocAndScanForDamagedTree());
  }

  public getLocationOfNearestDamagedTree(): Position {
    let treeX = 0;
    let treeY = 0;
    let minDistance = Number.MAX_SAFE_INTEGER;
    let manhattanDistance = 0;

    for (let tree of this.damagedTreesData?.damagedTrees!) {
      manhattanDistance = this.getManhattanDistanceToTree(tree.x, tree.y);
      if (manhattanDistance < minDistance) {
        minDistance = manhattanDistance;

        treeX = tree.x;
        treeY = tree.y;
      }
    }

    this.distToNearestDamagedTree = this.getDistanceToTree(treeX, treeY);
    this.distToNearestDamagedTree.x *= -1;
    this.distToNearestDamagedTree.y *= -1;
    return { x: treeX, y: treeY };
  }

  public getDistanceToTree(treeX: number, treeY: number): Position {
    let xDiff = this.currX - treeX;
    let yDiff = this.currY - treeY;

    return { x: xDiff, y: yDiff };
  }

  private getManhattanDistanceToTree(treeX: number, treeY: number): number {
    let temp = this.getDistanceToTree(treeX, treeY);

    return Math.abs(temp.x) + Math.abs(temp.y);
  }

  public flyDroneToCurrLocAndScanForDamagedTree() {
    this.droneService
      .flyDroneTo(this.selectedDroneId, this.currX, this.currY)
      .subscribe(() => this.scanAroundDrone(this.selectedDroneId));
  }
}
