import {AutoFillInstructionFormProps} from "./AutoFillInstructionFormProps";
import {OnlyIfForm} from "./OnlyIfForm";
import {CopyFromForm} from "./CopyFromForm";

export function AutoFillInstructionForm({type, autoFillInstruction, onChange}: AutoFillInstructionFormProps) {
    return (
        <div>
            {
                type === 'TEXT_FIELD' &&
                <CopyFromForm autoFillInstruction={autoFillInstruction} onChange={onChange} type={type}/>
            }
            {
                type !== 'TEXT_FIELD' &&
                <OnlyIfForm type={type} autoFillInstruction={autoFillInstruction} onChange={onChange}/>
            }
        </div>
    );
}

