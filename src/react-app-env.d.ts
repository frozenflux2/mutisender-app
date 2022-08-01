interface Window {
  ethereum?: {
    isMetaMask?: true;
    providers?: any[];
    request: (...args: any[]) => Promise<any>;
    selectedAddress?: string;
    sendAsync: any;
  };
}

type SerializedBigNumber = string;
