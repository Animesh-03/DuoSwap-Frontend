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
    const [shouldClaim, setShouldClaim] = React.useState(false)
    const [rt, setRT] = React.useState(timeRemaining)


    React.useEffect(() => {
        if(!isComplete) {
            setTimeout(() => {
                setIsComplete(false)
                setStatus("Successful!")
                setShouldClaim(true)
                
                setInterval(() => {
                    if(rt ?? 0 > 0) setRT(rt ?? 1 - 1)
                }, 1000)
            }, timeRemaining)
        }
        else {
            setShouldClaim(true)
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
                    isComplete && !shouldClaim ? 
                    <div className="flex flex-col items-end">
                        <p><span className="text-light-grey">Received at </span>{address ? (address?.slice(0, 6) + "...." + address!.slice((address?.length ?? 10) -4)) : "Loading..."}</p>
                        <p>View Transaction</p>
                    </div> :
                    shouldClaim ?
                    <PrimaryButton text="Claim wBTC" onClick={() => {
                        setShouldClaim(false)
                        setIsComplete(true)
                    }} /> :                    
                    <div className="flex flex-col items-end w-full">
                        <span className="flex"><span className="text-light-grey mr-1">Send to </span><span className="mr-1">{address ? (address?.slice(0, 6) + "...." + address?.slice((address?.length ?? 10) -4)) : "Loading..."}</span> <Image className="cursor-pointer" src="/copy.svg" width={13} height={16} alt="copy" onClick={() => address && navigator.clipboard.writeText(address)} /></span>
                        <p>View Transaction</p>
                    </div>
                    
                    
                }
            </div>
        </div>
    )
}