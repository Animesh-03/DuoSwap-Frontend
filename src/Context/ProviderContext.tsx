'use client'
import { ethers } from "ethers";
import React from "react";

interface EthersProviderProps {
    children: any
}

interface EthersProviderValue {
    provider: ethers.BrowserProvider
    connectProvider: Function
    address: string
}

export const EthersProviderContext = React.createContext({} as EthersProviderValue)

export const EthersProvider: React.FC<EthersProviderProps> = ({children}) => {
    let provider: ethers.BrowserProvider
    const [address, setAddress] = React.useState<string>("")

    React.useEffect(() => {
        //@ts-ignore
        provider = new ethers.BrowserProvider(window.ethereum)
    },[])

    async function connectProvider() {
        let address = await provider?.send("eth_requestAccounts", [])
        setAddress(address)
    }

    return (
        //@ts-ignore
        <EthersProviderContext.Provider value={{provider: provider, connectProvider: connectProvider, address: address}}>
            {children}
        </EthersProviderContext.Provider>
    )
}

