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

const MainBody: React.FC = () => {

    const [modalOpen, setModalOpen] = React.useState(false)
    const {address, connectProvider} = useContext(EthersProviderContext)

    return (
        <div className={clsx([css.root], "p-4")}>
            <div className="flex justify-between">
                <div className="flex items-center">
                    <Image className="mr-4" src={"/btc.svg"} width={33} height={33} alt="BTC_IMG" />
                    <text className="text-white">wbtc.garden</text>
                </div>
                {
                    address == "" ?
                    <PrimaryButton text="Connect wallet" onClick={() => connectProvider()} /> :
                    <div>
                        <PrimaryButton className="" text={address} onClick={() => true}
                    </div>

                }
            </div>

            <div className="m-auto flex flex-col items-center justify-between">
                <SwapCard src="/BTC.svg" heading="Swap" />
                <IconButton className={css["swap-button"]} src="/arrow.svg" width={36} height={36} onClick={() => false} alt="image" />
                <SwapCard src="/wbtc.svg" heading="Recieve" />
                <BottomCard heading="Recieve Address" body="Connect Wallet" />
                <BottomCard heading="Fees" body="--" />
                <PrimaryButton text="Connect wallet" onClick={() => setModalOpen(true)} />
                <ConnectWallet open={modalOpen} setOpen={setModalOpen} />
            </div>
            
        </div>
    )
}

export default MainBody;