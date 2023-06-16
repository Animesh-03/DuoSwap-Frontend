import React from "react";
import css from './connectWallet.module.css'
import clsx from "clsx";
import { WalletCard } from "./WalletCard/WalletCard";
import { Modal } from "@mui/material";


interface ConnectWalletProps {
    open: boolean
    setOpen: Function
}

export const ConnectWallet: React.FC<ConnectWalletProps> = ({open, setOpen}) => {


    return (
        <Modal className="flex items-center justify-center" open={open} onClose={() => setOpen(false)} BackdropProps={{style: {backgroundColor: "#b6eeacA0"}}}>
            <div className={clsx([css.root])}>
                <p className={clsx(["text-white text-xl mb-2"])}>Connect Wallet</p>
                <WalletCard src="/catalog.svg" width={32} height={32} alt="catalog" title="Catalog Wallet" />
                <WalletCard src="/metamask.svg" width={32} height={32} alt="catalog" title="Metamask Wallet" />
            </div>
        </Modal>
    )
}