import { ethers } from 'ethers';

const erc20TokenAddress = '0x8Ef1AEB9e2D5edD9C1fb6a87C96Ebc8f9A3bB14B';
const swapContractAddress = "0xE98331f44e03aa2b20843B781DFb70E05da3586F"

interface UsdcToEthConverter {
  convertUSDCtoETH(contractAddress: string, amountUSDC: number, recipient: string): Promise<void>;
  convertETHtoUSDC(amountETH: number, recipient: string): Promise<void>;
}

class UsdcToEthConverterClient implements UsdcToEthConverter {
  private contract: ethers.Contract;
  private usdcToken: ethers.Contract; 

  constructor(contractAddress: string, signer: ethers.Signer, usdcTokenAddress:string) {
    this.contract = new ethers.Contract(contractAddress, ['function convertUSDCtoETH(uint256, address)', 'function convertETHtoUSDC(uint256, address)'], signer);
    this.usdcToken = new ethers.Contract(usdcTokenAddress, ['function approve(address spender, uint256 amount)'], signer); 
  }

  async convertUSDCtoETH(contractAddress: string, amountUSDC: number, recipient: string): Promise<void> {
    const approvalTx = await this.usdcToken.approve(contractAddress, ethers.parseEther(amountUSDC.toString()));
    await approvalTx.wait();

    const conversionTx = await this.contract.convertUSDCtoETH(ethers.parseEther(amountUSDC.toString()), recipient);
    await conversionTx.wait();
  }

  async convertETHtoUSDC(amountETH: number, recipient: string): Promise<void> {
    var txHash = await this.contract.convertETHtoUSDC(ethers.parseEther(amountETH.toString()), recipient, { value: ethers.parseEther(amountETH.toString()), gasPrice: 20000000000 });
    await txHash.wait();
  }
}

export async function swapETHToUSDC( amount: number) {
    //@ts-ignore
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner()

    const some = new UsdcToEthConverterClient( swapContractAddress , signer, erc20TokenAddress);
    // some.convertETHtoUSDC(1, "0xb2628D7c26Eeca3C33b54757fc1dd7365231741f");
    await some.convertETHtoUSDC( amount, await signer.getAddress())
    console.log("ETH CONVERTED TO USDC")
}

export async function swapUSDCToETH(amount : number ) {
    //@ts-ignore
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner()

    const some = new UsdcToEthConverterClient( swapContractAddress , signer, erc20TokenAddress);
    // some.convertETHtoUSDC(1, "0xb2628D7c26Eeca3C33b54757fc1dd7365231741f");
    await some.convertUSDCtoETH( swapContractAddress, amount , await signer.getAddress())
    console.log("ETH CONVERTED TO USDC")
}

// Example usage


export default UsdcToEthConverterClient;
