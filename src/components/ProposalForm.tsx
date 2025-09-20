import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { PlusCircle, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProposalFormProps {
  onSubmit: (proposal: string) => void;
  isConnected: boolean;
}

const ProposalForm = ({ onSubmit, isConnected }: ProposalFormProps) => {
  const [proposal, setProposal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to submit a proposal",
        variant: "destructive",
      });
      return;
    }

    if (!proposal.trim()) {
      toast({
        title: "Invalid proposal",
        description: "Please enter a proposal description",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(proposal.trim());
      setProposal('');
      toast({
        title: "Proposal submitted!",
        description: "Your proposal has been added to the voting list",
      });
    } catch (error: any) {
      toast({
        title: "Submission failed",
        description: error.message || "Failed to submit proposal",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 bg-gradient-card border-primary/20 animate-slide-up">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-secondary/50 rounded-lg">
            <Sparkles className="h-5 w-5 text-secondary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Create New Proposal
            </h3>
            <p className="text-sm text-muted-foreground">
              Share your idea with the club community
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="proposal" className="text-sm font-medium">
              Proposal Description
            </Label>
            <Textarea
              id="proposal"
              placeholder="What would you like to propose? Be clear and descriptive..."
              value={proposal}
              onChange={(e) => setProposal(e.target.value)}
              className="min-h-[100px] resize-none border-primary/20 focus:border-primary bg-background"
              disabled={!isConnected}
            />
            <p className="text-xs text-muted-foreground">
              {proposal.length}/500 characters
            </p>
          </div>

          <Button
            type="submit"
            disabled={!isConnected || !proposal.trim() || isSubmitting || proposal.length > 500}
            className="w-full bg-gradient-button hover:opacity-90 shadow-lg disabled:opacity-50"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Submitting...' : 'Submit Proposal'}
          </Button>

          {!isConnected && (
            <p className="text-sm text-muted-foreground text-center">
              Connect your wallet to submit proposals
            </p>
          )}
        </form>
      </div>
    </Card>
  );
};

export default ProposalForm;