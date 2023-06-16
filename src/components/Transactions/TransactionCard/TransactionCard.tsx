'use client';
import clsx from "clsx";
import React from "react";
import css from './transactionCard.module.css'
import Image from "next/image";
import { PrimaryButton } from "src/components/PrimaryButton/PrimaryButton";

interface TransactionCardProps {
    amount: number
    isComplete: boolean
    address?: string
    status: string
    timeRemaining?: number
    swappingBTC?: boolean
}

export const TransactionCard: React.FC<TransactionCardProps> = ({amount, isComplete: is, status: st, address, timeRemaining, swappingBTC = true}) => {
    const [isComplete, setIsComplete] = React.useState(is)
    const [status, setStatus] = React.useState(st)


    React.useEffect(() => {
        if(!isComplete) {
            setTimeout(() => {
                setIsComplete(true)
                setStatus("Successful!")
            }, timeRemaining)
        }
    },[])

    console.log(swappingBTC)


    return (
        <div className={clsx([css.root, "flex items-center justify-between"])}>
            <div className="flex">
                {
                    swappingBTC ?
                    <div className="flex mr-4">
                        <Image className="mr-2" src={"/BTC.svg"} width={32} height={32} alt="BTC" />
                        <Image className="mr-2" src={"/arrow-left.svg"} width={16} height={16} alt="BTC" />
                        <Image className="mr-2" src={"/wbtc.svg"} width={32} height={32} alt="BTC" />
                    </div> :
                    <div className="flex mr-4">
                        <Image className="mr-2" src={"/wbtc.svg"} width={32} height={32} alt="BTC" />
                        <Image className="mr-2" src={"/arrow-left.svg"} width={16} height={16} alt="BTC" />
                        <Image className="mr-2" src={"/BTC.svg"} width={32} height={32} alt="BTC" />
                    </div>
                }
                <div>
                    <p>{amount} BTC</p>
                    <p className="text-dark-green">{status}</p>
                </div>
            </div>
            <div>
                {
                    isComplete ? 
                    <PrimaryButton text="Claim wBTC" onClick={() => true} /> :
                    <div className="flex flex-col items-end">
                        <p><span className="text-light-grey">Received at </span>{address ? (address?.slice(0, 4) + "...." + address!.slice(address?.length ?? 10 -4)) : "Loading..."}</p>
                        <p>View Transaction</p>
                    </div>
                }
            </div>
        </div>
    )
}