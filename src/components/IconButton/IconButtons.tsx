import clsx from "clsx";
import Image from "next/image";
import React from "react";

import css from "./iconButton.module.css"


interface IconButtonProps {
    src: string
    onClick: Function
    width: number
    height: number
    alt: string
    className?: string
}

export const IconButton: React.FC<IconButtonProps> = ({src, width, height, alt, onClick, className}) => {


    return (
        <button className={clsx([css.root,"rounded-full" ,className])} onClick={() => onClick()}>
            <Image src={src} width={width} height={height} alt={alt} />
        </button>
    )
}