import { CarInterface } from "./CarInterface"

export interface CarTable{

    header : string[]
    footer : string[]
    dataRows : Array<CarInterface>
}