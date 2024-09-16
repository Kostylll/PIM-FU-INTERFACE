import { SupplyInterface } from "../SupplyInterface";

export interface SupplyTable{
    header: string[];
    footer: string[];
    dataRows: Array<SupplyInterface>;
}