import React, { MouseEventHandler } from "react";
import css from './button.module.css'
import clsx from "clsx";


interface ButtonProps {
    text: string
    onClick: Function
    className?: string
    variant?: string
}

const variants = {
    "primary": css.root,
    "light": css.light
}

export const PrimaryButton: React.FC<ButtonProps> = ({text, onClick, className, variant = "primary"}) => {
    return (
        //@ts-ignore
        <button className={clsx([css.root, variants[variant], 'text-black', className])} onClick={() => onClick()}>
            {text}
        </button>
    )
}