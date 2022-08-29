import {OnlyIf} from "./OnlyIf";

export interface AutoFillInstruction {
    copyFrom?: string;
    onlyIf?: OnlyIf;
}