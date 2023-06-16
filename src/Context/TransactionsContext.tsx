'use client';
import React from "react";

export interface Transaction {
    amount: number
    isComplete: boolean
    address?: string,
    status: string,
    timeRemaining?: number,
    swappingBTC?: boolean
}

export const TransactionsContext = React.createContext({} as TransactionProviderType)

interface TransactionProviderType {
    transactions: Transaction[]
    setTransactions: Function
}

export const TransactionProvider: React.FC<any> = ({children}) => {
    const [transactions, setTransactions] = React.useState<Transaction[]>([
        {
            amount: 1.235,
            isComplete: true,
            status: "Successful!"
        },
        {
            amount: 1.24545,
            isComplete: false,
            status: "47:33:12 Remaining",
            address: "0xfaksndaksnfk",
            timeRemaining: 20*1000
        }
    ])

    return (
        <TransactionsContext.Provider value={{transactions: transactions, setTransactions: setTransactions}}>
            {children}
        </TransactionsContext.Provider>
    )
}