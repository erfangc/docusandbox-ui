import {AutoFillInstructionFormProps} from "./AutoFillInstructionFormProps";
import {useCallback, useState} from "react";
import {Operator} from "./Operator";
import {Operand} from "./Operand";
import {OnlyIf} from "./OnlyIf";

function activeOperator(onlyIf?: OnlyIf): Operator {
    if (!onlyIf) {
        return 'NA';
    }
    if (onlyIf.equals) {
        return 'EQUALS';
    } else if (onlyIf.isOneOf) {
        return 'IS_ONE_OF';
    } else if (onlyIf.greaterThan) {
        return 'GREATER_THAN';
    } else if (onlyIf.lessThan) {
        return 'LESS_THAN';
    } else if (onlyIf.isBetween) {
        return 'IS_BETWEEN';
    } else {
        return 'NA';
    }
}

export function OnlyIfForm({autoFillInstruction, onChange}: AutoFillInstructionFormProps) {

    const [operator, setOperator] = useState<Operator>(activeOperator(autoFillInstruction?.onlyIf));
    const [dataProperty, setDataProperty] = useState<string | undefined>(autoFillInstruction?.onlyIf?.dataProperty);

    /**
     * Triggers (and decides whether) to submit a change. Changes may not be ready for
     * submission yet
     */
    const submitChange = useCallback(() => {
        if (!dataProperty) {
            return;
        }
        onChange({
            ...autoFillInstruction,
            onlyIf: {
                ...autoFillInstruction?.onlyIf,
                dataProperty
            }
        });
    }, [dataProperty]);

    return (
        <div className="flex space-x-4">
            <div className="flex space-x-4">
                <input
                    type="text"
                    value={dataProperty}
                    onChange={e => setDataProperty(e.currentTarget.value)}
                    onBlur={submitChange}
                />
                {/* This select only toggles on/off other form inputs */}
                {/* it's up to the individual inputs to decide whether they are ready to be submitted */}
                <select
                    name="operator"
                    onChange={e => setOperator(e.currentTarget.value as Operator)}
                    value={operator}
                >
                    <option value={'NA'}>N/A</option>
                    <option value={'GREATER_THAN'}>Greater Than</option>
                    <option value={'IS_BETWEEN'}>Is Between</option>
                    <option value={'LESS_THAN'}>Less Than</option>
                    <option value={'EQUALS'}>Equals</option>
                    <option value={'IS_ONE_OF'}>Is One Of</option>
                </select>
            </div>
            {
                operator != 'NA' &&
                <Operand operator={operator} autoFillInstruction={autoFillInstruction} onChange={onChange}/>
            }
        </div>
    );
}