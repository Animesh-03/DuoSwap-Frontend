import React from "react";
import css from './footerBody.module.css'
import clsx from "clsx";
import { Transactions } from "../Transactions/Transactions";

export const FooterBody: React.FC = () => {


    return (
        <div className={clsx([css.root, "flex flex-col items-center justify-between"])}>
            <Transactions />
            <div>
                <div className={clsx([css["footer-text"], "w-5/12 mb-4"])}>
                    wbtc.garden provides one of the easiest ways for you to acquire wBTC with real BTC. The Garden uses atomic swaps to facilitate trustless conversions. If you choose to use Catalog Wallet, the Garden is able to provide instant conversions. All of the code is open-source and can be viewed here.
                </div>
                <div className="w-full flex justify-between">
                    <text>Powered by Catalog</text>
                    <div className="w-32 flex justify-between">
                        <text>Contact</text>
                        <text>Twitter</text>
                    </div>
                </div>
            </div>
        </div>
    )
}