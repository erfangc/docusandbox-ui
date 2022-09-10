import React from "react";

export function SecondaryButton({
                                  children,
                                  ...props
                              }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className="bg-gray-500 px-2 py-1.5 text-white rounded" {...props}>
            {children}
        </button>
    );
}