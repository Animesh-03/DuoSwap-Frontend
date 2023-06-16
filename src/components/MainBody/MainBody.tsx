'use client';

import React, { useContext } from "react";
import css from './mainBody.module.css'
import clsx from "clsx";
import Image from "next/image";
import { PrimaryButton } from "../PrimaryButton/PrimaryButton";
import { SwapCard } from "../SwapCard/SwapCard";
import { IconButton } from "../IconButton/IconButtons";
import { BottomCard } from "../BottomCard/BottomCard";
import { ConnectWallet } from "../ConnectWallet/ConnectWallet";
import { EthersProviderContext } from "src/Context/ProviderContext";
import { TransactionsContext } from "src/Context/TransactionsContext";

const MainBody: React.FC = () => {

    const [modalOpen, setModalOpen] = React.useState(false)
    const {address, connectProvider, isConnected, balance} = useContext(EthersProviderContext)
    const [swappingBTC, setSwappingBTC] = React.useState(true)
    const [swapAmount, setSwapAmount] = React.useState(0)

    const {transactions, setTransactions} = useContext(TransactionsContext)

    return (
        <div className={clsx([css.root], "p-4")}>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <Image className="mr-4" src={"/btc.svg"} width={33} height={33} alt="BTC_IMG" />
                    <text className="text-white">wbtc.garden</text>
                </div>
                {
                    !isConnected ?
                    <PrimaryButton text="Connect wallet" onClick={() => connectProvider()} /> :
                    <div>
                        <PrimaryButton className="cursor-default mr-2" text={balance + " wBTC"} onClick={() => true} />
                        <PrimaryButton className="cursor-default" text={address?.slice(0,5) + "...." + address?.slice(address.length-3)} onClick={() => true} />
                    </div>

                }
            </div>

            <div className="m-auto flex flex-col items-center justify-between">
                {
                    swappingBTC ? 
                    <div>
                        <SwapCard setAmount={setSwapAmount} src="/BTC.svg" heading="Swap" />
                        <SwapCard amount={swapAmount} disabled={true} src="/wbtc.svg" heading="Recieve" />
                    </div> :
                    <div>
                        <SwapCard setAmount={setSwapAmount} src="/wbtc.svg" heading="Swap" />
                        <SwapCard amount={swapAmount} disabled={true} src="/BTC.svg" heading="Recieve" />
                    </div>
                }
                <IconButton className={css["swap-button"]} src="/arrow.svg" width={36} height={36} onClick={() => setSwappingBTC(!swappingBTC)} alt="image" />
                
                <BottomCard heading="Recieve Address" body={address ? address?.slice(0,5) + "...." + address?.slice(address.length-3) : "Connect Wallet"} />
                <BottomCard heading="Fees" body={isConnected ? (swapAmount*0.0001).toString() :"--"} />
                {
                    isConnected ?
                    <PrimaryButton text="Initiate" onClick={() => setTransactions([...transactions, {
                        amount: swapAmount*0.0001,
                        status: "35:12:25 Remaining",
                        isComplete: false,
                        address: "0xjfhljFfbbgalab",
                        timeRemaining: 5*1000,
                        swappingBTC: swappingBTC
                    }] )} /> : 
                    <PrimaryButton text="Connect wallet" onClick={() => setModalOpen(true)} />
                }
                <ConnectWallet open={modalOpen} setOpen={setModalOpen} />
            </div>
            
        </div>
    )
}

export default MainBody;