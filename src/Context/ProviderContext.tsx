'use client'
import { ethers } from "ethers";
import React from "react";
import erc20abi from "../config/erc20abi.json"

interface EthersProviderProps {
    children: any
}

interface EthersProviderValue {
    provider: ethers.BrowserProvider
    connectProvider: Function
    address: string
    isConnected: boolean
    balance: string
    logout: Function
}

export const EthersProviderContext = React.createContext({} as EthersProviderValue)

export const EthersProvider: React.FC<EthersProviderProps> = ({children}) => {
    let provider: ethers.BrowserProvider
    const [address, setAddress] = React.useState<string>()
    const [isConnected, setConnected] = React.useState(false)
    const [balance, setBalance] = React.useState<string>()

    React.useEffect(() => {
        //@ts-ignore
        provider = new ethers.BrowserProvider(window.ethereum)
        let isc = localStorage.getItem("isConnected")
        // setConnected(isc === "true" ? true : false)
        if(isc === "true") connectProvider()
    },[])

    async function connectProvider() {
        let address = await provider?.send("eth_requestAccounts", [])
        setAddress(address[0] ?? undefined)
        setConnected(true)
        getBalance()
        localStorage.setItem("isConnected", "true")
    }

    function logout() {
        localStorage.setItem("isConnected", "false")
        setConnected(false)
        setAddress(undefined)
    }

    async function getBalance() {
        const contract = new ethers.Contract("0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",  erc20abi, provider)
        const balance = (await contract.balanceOf((await provider.getSigner()).address)).toString();
        setBalance(balance)
    }

    return (
        //@ts-ignore
        <EthersProviderContext.Provider value={{provider: provider, connectProvider: connectProvider, address: address, isConnected: isConnected, balance: balance, logout: logout}}>
            {children}
        </EthersProviderContext.Provider>
    )
}

