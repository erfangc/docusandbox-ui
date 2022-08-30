import {AutoFillInstructionFormProps} from "./AutoFillInstructionFormProps";
import {useState} from "react";

export function CopyFromForm({autoFillInstruction, onChange}: AutoFillInstructionFormProps) {

    const [value, setValue] = useState<string>(autoFillInstruction?.copyFrom || '');

    function submitChange() {
        onChange({...autoFillInstruction, copyFrom: value});
    }

    return (
        <label htmlFor="">
            <p>Copy from</p>
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.currentTarget.value)}
                onBlur={submitChange}
            />
        </label>
    )
}