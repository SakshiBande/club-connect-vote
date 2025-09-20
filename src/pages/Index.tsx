import { useState, useEffect } from 'react';
import WalletConnect from '@/components/WalletConnect';
import ProposalForm from '@/components/ProposalForm';
import ProposalCard from '@/components/ProposalCard';
import VotingMascot from '@/components/VotingMascot';
import Header from '@/components/Header';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface Proposal {
  id: number;
  description: string;
  voteCount: number;
  created: Date;
  hasVoted: boolean;
}

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState<string>('');
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      description: "Should we organize a monthly tech meetup for club members?",
      voteCount: 15,
      created: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      hasVoted: false
    },
    {
      id: 2,
      description: "Proposal to allocate budget for new club equipment and workspace upgrades",
      voteCount: 8,
      created: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      hasVoted: true
    },
    {
      id: 3,
      description: "Should we create a mentorship program pairing senior and junior members?",
      voteCount: 23,
      created: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
      hasVoted: false
    }
  ]);

  const handleConnectionChange = (connected: boolean, walletAccount?: string) => {
    setIsConnected(connected);
    setAccount(walletAccount || '');
  };

  const handleSubmitProposal = async (description: string) => {
    // Simulate blockchain transaction delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newProposal: Proposal = {
      id: proposals.length + 1,
      description,
      voteCount: 0,
      created: new Date(),
      hasVoted: false
    };
    
    setProposals(prev => [newProposal, ...prev]);
  };

  const handleVote = async (proposalId: number) => {
    // Simulate blockchain transaction delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setProposals(prev => 
      prev.map(proposal => 
        proposal.id === proposalId 
          ? { ...proposal, voteCount: proposal.voteCount + 1, hasVoted: true }
          : proposal
      )
    );
  };

  const totalVotes = proposals.reduce((sum, proposal) => sum + proposal.voteCount, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-primary-light/20 via-background to-accent/30 -z-10" />
      
      <div className="container mx-auto px-4 py-8 space-y-8 relative">
        {/* Header */}
        <Header 
          isConnected={isConnected}
          totalProposals={proposals.length}
          totalVotes={totalVotes}
        />

        {/* Wallet Connection */}
        <div className="max-w-2xl mx-auto">
          <WalletConnect onConnectionChange={handleConnectionChange} />
        </div>

        <Separator className="my-8 bg-border/50" />

        {/* Proposal Form */}
        <div className="max-w-2xl mx-auto">
          <ProposalForm 
            onSubmit={handleSubmitProposal}
            isConnected={isConnected}
          />
        </div>

        <Separator className="my-8 bg-border/50" />

        {/* Proposals List */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
              <FileText className="h-6 w-6" />
              Active Proposals
            </h2>
            <p className="text-muted-foreground">
              Vote on proposals that matter to your club community
            </p>
          </div>

          {proposals.length > 0 ? (
            <div className="grid gap-4">
              {proposals.map((proposal) => (
                <ProposalCard
                  key={proposal.id}
                  proposal={proposal}
                  onVote={handleVote}
                  isConnected={isConnected}
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center bg-muted/20 border-dashed border-2 border-muted-foreground/20">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-muted-foreground mb-2">
                No proposals yet
              </h3>
              <p className="text-sm text-muted-foreground">
                Be the first to create a proposal for your club!
              </p>
            </Card>
          )}
        </div>

        {/* Voting Mascot */}
        <VotingMascot 
          isConnected={isConnected}
          proposalCount={proposals.length}
        />
      </div>
    </div>
  );
};

export default Index;
