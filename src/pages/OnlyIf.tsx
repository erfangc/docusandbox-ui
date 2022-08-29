import {IsBetween} from "./IsBetween";

export interface OnlyIf {
    dataProperty: string
    greaterThan?: number
    lessThan?: number
    equals?: any
    isOneOf?: any[]
    isBetween?: IsBetween
}