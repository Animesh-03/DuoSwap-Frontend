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
    isUSDC?: boolean
}

export const SwapCard: React.FC<SwapCardProps> = ({heading, src, setAmount,amount = 0, disabled = false, isUSDC = false}) => {

    return (
        <div className={clsx([css.root, "flex flex-col items-start justify-between"])}>
            <p className="text-light-grey">{heading}</p>
            <div className="flex items-center justify-between w-full">
                {
                    disabled ? 
                    <input disabled={true} className="text-3xl w-60 border-none outline-none" value={isUSDC ? amount*2000 : amount/2000} />
                    :
                    <input disabled={false}  className="text-3xl w-60 border-none outline-none" defaultValue={0} onChange={(e) => setAmount && setAmount(e.target.value)} />
                }
                <Image src={src} width={32} height={32} alt="btc-image" />
            </div>
        </div>
    )
}