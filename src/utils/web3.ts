
import { ethers } from 'ethers';
import TokenFactoryABI from '../contracts/abis/TokenFactory.json';
import { toast } from 'sonner';

// This will be updated after deployment
const FACTORY_ADDRESS = '0x4d44C861Df33bF2E1c93a43644aeD7A2F06A4139';

export async function connectWallet(): Promise<string | null> {
  try {
    if (!window.ethereum) {
      toast({
        title: "MetaMask Required",
        description: "Please install MetaMask to use this feature",
      });
      return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    
    // Listen for account changes
    window.ethereum.on('accountsChanged', (accounts: string[]) => {
      window.location.reload();
    });

    // Listen for chain changes
    window.ethereum.on('chainChanged', (chainId: string) => {
      window.location.reload();
    });

    return accounts[0];
  } catch (error) {
    console.error('Error connecting wallet:', error);
    toast({
      title: "Connection Error",
      description: "Failed to connect to wallet",
    });
    return null;
  }
}

export async function createToken(
  name: string,
  symbol: string,
  totalSupply: string
): Promise<string | null> {
  try {
    if (!window.ethereum) {
      toast({
        title: "MetaMask Required",
        description: "Please install MetaMask to create tokens",
      });
      return null;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const factory = new ethers.Contract(FACTORY_ADDRESS, TokenFactoryABI, signer);

    const creationFee = await factory.creationFee();
    const tx = await factory.createToken(name, symbol, totalSupply, {
      value: creationFee,
    });
    
    toast({
      title: "Transaction Sent",
      description: "Please wait while your token is being created...",
    });

    const receipt = await tx.wait();
    const event = receipt.events.find((e: any) => e.event === 'TokenCreated');
    
    if (event) {
      toast({
        title: "Success!",
        description: "Token created successfully",
      });
      return event.args.tokenAddress;
    }
    return null;
  } catch (error: any) {
    console.error('Error creating token:', error);
    toast({
      title: "Creation Error",
      description: error.message || "Failed to create token",
    });
    return null;
  }
}
