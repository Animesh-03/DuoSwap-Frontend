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
import { swapETHToUSDC, swapUSDCToETH } from "src/lib/utils/swap";

const MainBody: React.FC = () => {

    const [modalOpen, setModalOpen] = React.useState(false)
    const {address, connectProvider, isConnected, balance, logout} = useContext(EthersProviderContext)
    const [swappingETH, setSwappingBTC] = React.useState(true)
    const [swapAmount, setSwapAmount] = React.useState(0)

    return (
        <div className={clsx([css.root], "p-4")}>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <Image className="mr-4" src={"/ether.png"} width={33} height={33} alt="BTC_IMG" />
                    <text className="text-white text-bold text-2xl tracking-wide">DuoSwap</text>
                </div>
                {
                    !isConnected ?
                    <PrimaryButton text="Connect wallet" onClick={() => connectProvider()} /> :
                    <div className="flex">
                        <PrimaryButton variant="light" className="cursor-default mr-2 text-white" text={balance + " eth"} onClick={() => true} />
                        <PrimaryButton className="cursor-default mr-2" text={address?.slice(0,6) + "...." + address?.slice(address.length-4)} onClick={() => true} />
                        <Image className="cursor-pointer" src={"/logout.svg"} width={16} height={16} alt="logout" onClick={() => logout()} />
                    </div>

                }
            </div>

            <div className="m-auto flex flex-col items-center justify-between">
                {
                    swappingETH ? 
                    <div>
                        <SwapCard setAmount={setSwapAmount} src="/ether.png" heading="Swap ETH" />
                        <SwapCard isUSDC amount={swapAmount} disabled={true} src="/usdc.png" heading="Recieve USDC" />
                    </div> :
                    <div>
                        <SwapCard isUSDC setAmount={setSwapAmount} src="/usdc.png" heading="Swap USDC" />
                        <SwapCard amount={swapAmount} disabled={true} src="/ether.png" heading="Recieve ETH" />
                    </div>
                }
                <IconButton className={css["swap-button"]} src="/arrow.svg" width={36} height={36} onClick={() => setSwappingBTC(!swappingETH)} alt="image" />
                
                <BottomCard heading="Recieve Address" body={address ? address?.slice(0,6) + "...." + address?.slice(address.length-4) : "0x00...0000"} />
                {
                    isConnected ?
                    <PrimaryButton text="Initiate" onClick={() => swappingETH ? swapETHToUSDC(swapAmount) : swapUSDCToETH(swapAmount)} /> : 
                    <PrimaryButton text="Connect wallet" onClick={() => setModalOpen(true)} />
                }
                <ConnectWallet open={modalOpen} setOpen={setModalOpen} />
            </div>
            <></>
        </div>
    )
}

export default MainBody;