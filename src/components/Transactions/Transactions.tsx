import clsx from "clsx";
import React from "react";
import css from './transactions.module.css'
import { TransactionCard } from "./TransactionCard/TransactionCard";
import { TransactionsContext } from "src/Context/TransactionsContext";



export const Transactions: React.FC = () => {
    const {transactions} = React.useContext(TransactionsContext)


    return (
        <div className="mb-16">
            <p className="text-dark-green font-bold text-xl mb-2">Transactions</p>
            <div className={clsx([css.root])}>
                {transactions.map(t => <TransactionCard key={t.amount}  amount={t.amount} isComplete={t.isComplete} status={t.status} swappingBTC={t.swappingBTC} address={t.address} timeRemaining={t.timeRemaining} />)}
            </div>
        </div>
    )
}