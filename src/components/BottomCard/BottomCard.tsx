import React from "react";
import css from "./bottomCard.module.css"
import clsx from "clsx";
import Image from "next/image";

interface BottomCardProps {
    heading: string,
    body: string
}

export const BottomCard: React.FC<BottomCardProps> = ({heading, body}) => {


    return (
        <div className={clsx([css.root, "flex flex-col items-start justify-between"])}>
            <p className="text-white text-xl">{heading}</p>
            <p className="text-white text-xl">{body}</p>
        </div>
    )
}