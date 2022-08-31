import {AutoFillInstructionFormProps} from "./AutoFillInstructionFormProps";
import {useState} from "react";

export function CopyFromForm({autoFillInstruction, onChange}: AutoFillInstructionFormProps) {

    const [value, setValue] = useState<string>(autoFillInstruction?.copyFrom || '');

    function submitChange() {
        onChange({...autoFillInstruction, copyFrom: value});
    }

    return (
        <label>
            <p className="text-gray-600 text-sm mt-2 mb-1">Copy From</p>
            <input
                type="text"
                className="rounded"
                value={value}
                onChange={e => setValue(e.currentTarget.value)}
                onBlur={submitChange}
            />
        </label>
    );
}