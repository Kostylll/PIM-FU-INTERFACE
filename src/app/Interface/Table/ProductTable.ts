import { ProductInterface } from "../ProductInterface";

export interface ProductTable {
  header: string[];
  footer: string[];
  dataRows: Array<ProductInterface>;
}
