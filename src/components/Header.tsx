import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Vote, Users, Zap } from 'lucide-react';

interface HeaderProps {
  isConnected: boolean;
  totalProposals: number;
  totalVotes: number;
}

const Header = ({ isConnected, totalProposals, totalVotes }: HeaderProps) => {
  return (
    <div className="text-center space-y-6">
      {/* Main heading */}
      <div className="space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-hero rounded-xl shadow-lg">
            <Vote className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            ClubVote
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          A modern, cheerful voting platform for clubs and communities. 
          Make your voice heard and shape the future together! ✨
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
        <Card className="p-4 bg-gradient-card border-primary/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Vote className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-foreground">{totalProposals}</p>
              <p className="text-sm text-muted-foreground">Active Proposals</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card border-primary/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success/20 rounded-lg">
              <Users className="h-5 w-5 text-success" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-foreground">{totalVotes}</p>
              <p className="text-sm text-muted-foreground">Total Votes</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-card border-primary/20">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary/50 rounded-lg">
              <Zap className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-foreground">
                {isConnected ? 'Connected' : 'Disconnected'}
              </p>
              <p className="text-sm text-muted-foreground">Wallet Status</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Status badge */}
      <div className="flex justify-center">
        <Badge 
          variant={isConnected ? "default" : "secondary"}
          className={
            isConnected 
              ? "bg-success text-success-foreground border-success/30 px-4 py-2" 
              : "bg-muted text-muted-foreground border-muted-foreground/30 px-4 py-2"
          }
        >
          {isConnected ? '🟢 Ready to Vote' : '🟡 Connect Wallet to Start'}
        </Badge>
      </div>
    </div>
  );
};

export default Header;