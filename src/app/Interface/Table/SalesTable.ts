import { SalesInterface } from '../SalesInterface';

export interface SalesTable {
  header: string[];
  footer: string[];
  dataRows: Array<SalesInterface>;
}
