import {Operator} from "./Operator";

export interface AutoCheckIf {
    formula?: string
    operator?: Operator
    greaterThan?: number
    lessThan?: number
    equals?: string
    isOneOf?: string[]
}