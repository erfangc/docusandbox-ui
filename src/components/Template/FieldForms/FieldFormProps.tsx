import {Field} from "../models/Field";

export interface FieldFormProps {
    field: Field
    onChange: (field: Field) => void
}