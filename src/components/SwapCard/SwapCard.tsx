import React from "react";
import css from "./swapCard.module.css"
import clsx from "clsx";
import Image from "next/image";

interface SwapCardProps {
    heading: string,
    src: string,
    disabled?: boolean
    amount?: number
    setAmount?: Function
}

export const SwapCard: React.FC<SwapCardProps> = ({heading, src, setAmount,amount, disabled = false}) => {


    return (
        <div className={clsx([css.root, "flex flex-col items-start justify-between"])}>
            <p className="text-light-grey">{heading}</p>
            <div className="flex items-center justify-between w-full">
                <input disabled={disabled}  className="text-3xl w-60 border-none outline-none" defaultValue={0} value={amount ? amount*0.99999 : undefined} onChange={(e) => setAmount && setAmount(Number(e.currentTarget.value))} />
                <Image src={src} width={32} height={32} alt="btc-image" />
            </div>
        </div>
    )
}