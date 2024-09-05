import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

import { RouterLink } from "@angular/router";
import { CarInterface } from "../../Interface/CarInterface";
import { CarService } from "../../Services/car.service";

@Component({
    selector: 'app-supply',
    standalone: true,
    imports: [CommonModule,RouterLink],
    templateUrl: './supply.component.html',
    styleUrls: ['./supply.component.css']
})

export class SupplyComponent {

    selectedItem: any;
    cars: CarInterface[] = []

    constructor(private carService : CarService) {}
    
     ngOnInit(): void {
        this.getCars()
     }
 
 
     getCars(){
         this.carService.getCars().subscribe((res) =>{
             this.cars = res
             console.log(this.cars)
         })
     }
     
     onSelect(car : any): void{
        this.selectedItem = car
        console.log(this.selectedItem)
     }
     
    
}