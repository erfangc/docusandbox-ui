import {OperandProps} from "./OperandProps";
import {useState} from "react";

export function Operand({onChange, autoFillInstruction, operator}: OperandProps) {
    const onlyIf = autoFillInstruction?.onlyIf;
    const [greaterThan, setGreaterThan] = useState<number | undefined>(onlyIf?.greaterThan);
    const [lessThan, setLessThan] = useState<number | undefined>(onlyIf?.lessThan);
    const [equals, setEquals] = useState<any | undefined>(onlyIf?.equals);
    const [isOneOf, setIsOneOf] = useState<string[] | undefined>(onlyIf?.isOneOf);
    const [lowerBound, setLowerBound] = useState<number | undefined>(onlyIf?.isBetween?.lowerBound);
    const [upperBound, setUpperBound] = useState<number | undefined>(onlyIf?.isBetween?.upperBound);

    function submitChange() {
        onChange({...autoFillInstruction});
    }

    let operand = null;

    switch (operator) {
        case "GREATER_THAN":
            operand = <input
                type="number" value={greaterThan}
                onChange={e => setGreaterThan(parseFloat(e.currentTarget.value))}
            />;
            break;
        case "EQUALS":
            operand = <input
                type="text" value={equals}
                onChange={e => setEquals(parseFloat(e.currentTarget.value))}
            />;
            break;
        case "IS_ONE_OF":
            operand = <ListView isOneOf={isOneOf} onChange={v => setIsOneOf(v)}/>;
            break;
        case "LESS_THAN":
            operand =
                <input type="text" value={lessThan} onChange={(e) => setLessThan(parseFloat(e.currentTarget.value))}/>
            break
        case "IS_BETWEEN":
            operand = (
                <>
                    <input type="text" value={lowerBound}
                           onChange={e => setLowerBound(parseFloat(e.currentTarget.value))}/>
                    <input type="text" value={upperBound}
                           onChange={e => setUpperBound(parseFloat(e.currentTarget.value))}/>
                </>
            );
            break;
        case "NA":
            break;
        default:
            break;
    }
    return operand;
}

interface ListViewProps {
    isOneOf?: string[]
    onChange: (v: string[]) => void
}

export function ListView({}: ListViewProps) {
    return (
        <div>
            <ul>
                <li>
                    <input type="text"/>
                    <button>Remove</button>
                </li>
            </ul>
            <button>+ Add</button>
        </div>
    );
}