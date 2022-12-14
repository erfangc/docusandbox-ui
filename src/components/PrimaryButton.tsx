import React from "react";

export function PrimaryButton({
                                  children,
                                  ...props
                              }: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) {
    return (
        <button className="bg-blue-600 px-2 py-1.5 text-blue-100 rounded" {...props}>
            {children}
        </button>
    );
}