import React, { MouseEventHandler } from "react";
import css from './button.module.css'
import clsx from "clsx";


interface ButtonProps {
    text: string
    onClick: Function
    className?: string
}

export const PrimaryButton: React.FC<ButtonProps> = ({text, onClick, className}) => {
    return (
        <button className={clsx([css.root], 'text-black', className)} onClick={() => onClick()}>
            {text}
        </button>
    )
}