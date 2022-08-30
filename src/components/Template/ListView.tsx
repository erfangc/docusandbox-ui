import {ListViewProps} from "./ListViewProps";

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