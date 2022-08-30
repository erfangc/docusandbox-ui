import {AutoFillInstruction} from "./AutoFillInstruction";
import {Type} from "./Type";

export interface AutoFillInstructionFormProps {
    type: Type
    autoFillInstruction?: AutoFillInstruction
    onChange: (autoFillInstruction: AutoFillInstruction) => void
}

