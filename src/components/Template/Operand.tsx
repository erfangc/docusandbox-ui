import {OperandProps} from "./OperandProps";
import {useState} from "react";
import {ListView} from "./ListView";
import {AutoFillInstruction} from "./AutoFillInstruction";

export function Operand({onChange, autoFillInstruction, operator}: OperandProps) {

    const onlyIf = autoFillInstruction?.onlyIf;
    const [greaterThan, setGreaterThan] = useState<number | undefined>(onlyIf?.greaterThan);
    const [lessThan, setLessThan] = useState<number | undefined>(onlyIf?.lessThan);
    const [equals, setEquals] = useState<any | undefined>(onlyIf?.equals);
    const [isOneOf, setIsOneOf] = useState<string[] | undefined>(onlyIf?.isOneOf);
    const [lowerBound, setLowerBound] = useState<number | undefined>(onlyIf?.isBetween?.lowerBound);
    const [upperBound, setUpperBound] = useState<number | undefined>(onlyIf?.isBetween?.upperBound);

    function submitChange() {
        if (!onlyIf) {
            return;
        }
        let autoFillInstruction: AutoFillInstruction | undefined = undefined;

        // only update the current operator
        const dataProperty = onlyIf.dataProperty;
        if (!dataProperty) {
            return;
        }
        switch (operator) {
            case "NA":
                return;
            case "LESS_THAN":
                if (lessThan) {
                    autoFillInstruction = {
                        onlyIf: {
                            dataProperty,
                            lessThan,
                        }
                    };
                }
                break;
            case "EQUALS":
                if (equals) {
                    autoFillInstruction = {
                        onlyIf: {
                            dataProperty,
                            equals,
                        }
                    };
                }
                break;
            case "GREATER_THAN":
                if (greaterThan) {
                    autoFillInstruction = {
                        onlyIf: {
                            dataProperty,
                            greaterThan,
                        }
                    };
                }
                break;
            case "IS_ONE_OF":
                if (isOneOf) {
                    autoFillInstruction = {
                        onlyIf: {
                            dataProperty,
                            isOneOf,
                        }
                    };
                }
                break;
            case "IS_BETWEEN":
                if (upperBound && lowerBound) {
                    autoFillInstruction = {
                        onlyIf: {
                            dataProperty,
                            isBetween: {upperBound, lowerBound},
                        }
                    };
                }
                break;
            default:
                return;
        }
        if (autoFillInstruction) {
            onChange(autoFillInstruction);
        }
    }

    let operand = null;

    switch (operator) {
        case "GREATER_THAN":
            operand = (
                <input
                    key='greaterThan'
                    type="number" value={greaterThan}
                    onChange={e => setGreaterThan(parseFloat(e.currentTarget.value))}
                    onBlur={submitChange}
                />
            );
            break;
        case "EQUALS":
            operand = (
                <input
                    key='equals'
                    type="text"
                    value={equals}
                    onChange={e => setEquals(e.currentTarget.value)}
                    onBlur={submitChange}
                />
            );
            break;
        case "IS_ONE_OF":
            operand = (
                <ListView
                    isOneOf={isOneOf}
                    onChange={v => setIsOneOf(v)}
                    onSubmit={submitChange}
                />
            );
            break;
        case "LESS_THAN":
            operand = (
                <input
                    key='lessThan'
                    type="number"
                    value={lessThan}
                    onChange={(e) => setLessThan(parseFloat(e.currentTarget.value))}
                    onBlur={submitChange}
                />
            )
            break
        case "IS_BETWEEN":
            operand = (
                <>
                    <input
                        key='lowerBound'
                        type="number"
                        value={lowerBound}
                        onChange={e => setLowerBound(parseFloat(e.currentTarget.value))}
                        onBlur={submitChange}
                    />
                    <input
                        key='upperBound'
                        type="number"
                        value={upperBound}
                        onChange={e => setUpperBound(parseFloat(e.currentTarget.value))}
                        onBlur={submitChange}
                    />
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

