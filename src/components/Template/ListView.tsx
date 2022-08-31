import {ListViewProps} from "./ListViewProps";

export function ListView({}: ListViewProps) {
    return (
        <div>
            <ul className="space-y-2">
                <li>
                    <input type="text" className="w-32 rounded"/>
                    <button className="bg-red-600 text-white p-1.5 rounded text-xs ml-2">
                        Remove
                    </button>
                </li>
            </ul>
            <button className="bg-blue-600 text-white px-2 py-1.5 text-xs rounded mt-2">
                + Add
            </button>
        </div>
    );
}