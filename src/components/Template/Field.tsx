import {Type} from "./Type";
import {AutoFillInstruction} from "./AutoFillInstruction";

export interface Field {
    name: string
    type: Type
    pages: number[]
    autoFillInstruction?: AutoFillInstruction
}