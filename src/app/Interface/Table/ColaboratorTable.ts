import { ColaboratorInterface } from "../ColaboratorInterface"

export interface ColaboratorTable{

    header : string[]
    footer : string[]
    dataRows : Array<ColaboratorInterface>

}