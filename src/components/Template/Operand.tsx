import {OperandProps} from "./OperandProps";
import {useState} from "react";

export function Operand({onChange, autoFillInstruction, operator}: OperandProps) {

    const [greaterThan, setGreaterThan] = useState<number>();
    const [lessThan, setLessThan] = useState<number>();
    const [equals, setEquals] = useState<any>();
    const [isOneOf, setIsOneOf] = useState<string[]>();
    const [lowerBound, setLowerBound] = useState<number>();
    const [upperBound, setUpperBound] = useState<number>();

    return null;
}