import {Operator} from "./Operator";
import {AutoFillInstruction} from "./AutoFillInstruction";

export interface OperandProps {
    operator: Operator
    autoFillInstruction?: AutoFillInstruction
    onChange: (autoFillInstruction: AutoFillInstruction) => void
}