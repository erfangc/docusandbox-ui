import {Type} from "./Type";
import {AutoCheckIf} from "./AutoCheckIf";
import {RadioOption} from "./RadioOption";

export interface Field {
    name: string
    type: Type
    pages: number[]
    radioOptions?: RadioOption[]
    autoFillFormula?: string
    autoCheckIf?: AutoCheckIf
}