import clsx from "clsx";
import React from "react";
import css from './transactions.module.css'
import { TransactionCard } from "./TransactionCard/TransactionCard";



export const Transactions: React.FC = () => {

    return (
        <div className="mb-16">
            <p className="text-dark-green font-bold text-xl mb-2">Transactions</p>
            <div className={clsx([css.root])}>
                <TransactionCard amount={0.05} isComplete={true} status="Successful!"  />
                <TransactionCard amount={1.25678} isComplete={false} status="Remaining time: 47H" address="0xhgksdnfKJfnK" />
            </div>
        </div>
    )
}