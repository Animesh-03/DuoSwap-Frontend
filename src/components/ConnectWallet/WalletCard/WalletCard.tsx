import React, { useContext } from "react";
import css from './walletCard.module.css'
import clsx from "clsx";
import Image from "next/image";
import { ethers } from "ethers";
import { EthersProviderContext } from "src/Context/ProviderContext";

interface WalletCardProps {
    src: string
    width: number
    height: number
    alt: string
    title: string
}

export const WalletCard: React.FC<WalletCardProps> = ({src, width, height, alt, title}) => {
    const {connectProvider} = useContext(EthersProviderContext)

    return (
        <div className={clsx([css.root, "flex items-center justify-start w-full hover:cursor-pointer"])}
            onClick={async () => {
                connectProvider()
            }}
        >
            <Image className="mr-4" src={src} width={width} height={height} alt={alt} />
            <p className="text-white">{title}</p>
        </div>
    )
}