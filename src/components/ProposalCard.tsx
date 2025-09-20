import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Vote, Users, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Proposal {
  id: number;
  description: string;
  voteCount: number;
  created: Date;
  hasVoted: boolean;
}

interface ProposalCardProps {
  proposal: Proposal;
  onVote: (proposalId: number) => void;
  isConnected: boolean;
}

const ProposalCard = ({ proposal, onVote, isConnected }: ProposalCardProps) => {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to vote",
        variant: "destructive",
      });
      return;
    }

    if (proposal.hasVoted) {
      toast({
        title: "Already voted",
        description: "You have already voted on this proposal",
        variant: "destructive",
      });
      return;
    }

    setIsVoting(true);
    try {
      await onVote(proposal.id);
      toast({
        title: "Vote cast!",
        description: "Your vote has been recorded",
      });
    } catch (error: any) {
      toast({
        title: "Voting failed",
        description: error.message || "Failed to cast vote",
        variant: "destructive",
      });
    } finally {
      setIsVoting(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-all duration-300 animate-slide-up">
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="text-foreground font-medium leading-relaxed">
              {proposal.description}
            </p>
          </div>
          {proposal.hasVoted && (
            <Badge variant="secondary" className="bg-success/20 text-success-foreground border-success/30">
              Voted
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{proposal.voteCount} votes</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(proposal.created)}</span>
            </div>
          </div>

          <Button
            onClick={handleVote}
            disabled={!isConnected || proposal.hasVoted || isVoting}
            variant={proposal.hasVoted ? "outline" : "default"}
            className={
              proposal.hasVoted 
                ? "opacity-50 cursor-not-allowed" 
                : "bg-gradient-button hover:opacity-90 shadow-lg"
            }
          >
            <Vote className="mr-2 h-4 w-4" />
            {isVoting ? 'Voting...' : proposal.hasVoted ? 'Voted' : 'Vote'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProposalCard;