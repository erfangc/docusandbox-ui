import {AutoFillInstructionFormProps} from "./AutoFillInstructionFormProps";
import {useState} from "react";
import {Operator} from "./Operator";

export function CheckboxAutoFillInstruction({autoFillInstruction}: AutoFillInstructionFormProps) {

    const [operator, setOperator] = useState<Operator>('NA');

    return (
        <div>
            <label>
                Operator
                <select
                    name="operator"
                    onSelect={({currentTarget: {value}}) => setOperator(value as Operator)}
                    value={operator}
                >
                    <option value={'NA'}>N/A</option>
                    <option value={'GREATER_THAN'}>Greater Than</option>
                    <option value={'LESS_THAN'}>Less Than</option>
                    <option value={'EQUALS'}>Equals</option>
                    <option value={'IS_ONE_OF'}>Is One Of</option>
                </select>
            </label>
        </div>
    );
}