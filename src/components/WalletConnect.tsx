import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Wallet, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import '@/types/ethereum';

interface WalletConnectProps {
  onConnectionChange: (isConnected: boolean, account?: string) => void;
}

const WalletConnect = ({ onConnectionChange }: WalletConnectProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    checkConnection();
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', () => window.location.reload());
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
      }
    };
  }, []);

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          onConnectionChange(true, accounts[0]);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      setIsConnected(false);
      setAccount('');
      onConnectionChange(false);
    } else {
      setAccount(accounts[0]);
      setIsConnected(true);
      onConnectionChange(true, accounts[0]);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask to use this dApp",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      setAccount(accounts[0]);
      setIsConnected(true);
      onConnectionChange(true, accounts[0]);
      
      toast({
        title: "Wallet connected!",
        description: "You're now ready to vote and create proposals",
      });
    } catch (error: any) {
      toast({
        title: "Connection failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setAccount('');
    onConnectionChange(false);
    toast({
      title: "Wallet disconnected",
      description: "You've been disconnected from your wallet",
    });
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Card className="p-4 bg-gradient-card border-primary/20">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            {isConnected ? (
              <CheckCircle className="h-5 w-5 text-success" />
            ) : (
              <Wallet className="h-5 w-5 text-primary" />
            )}
          </div>
          <div>
            <p className="font-medium text-foreground">
              {isConnected ? 'Wallet Connected' : 'Connect Your Wallet'}
            </p>
            {isConnected && (
              <p className="text-sm text-muted-foreground">
                {formatAddress(account)}
              </p>
            )}
          </div>
        </div>
        
        {isConnected ? (
          <Button 
            variant="outline" 
            onClick={disconnectWallet}
            className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
          >
            Disconnect
          </Button>
        ) : (
          <Button 
            onClick={connectWallet} 
            disabled={isConnecting}
            className="bg-gradient-button hover:opacity-90 shadow-lg"
          >
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default WalletConnect;