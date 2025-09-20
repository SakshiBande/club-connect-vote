import { useState, useEffect } from 'react';
import mascotImage from '@/assets/voting-mascot.png';

interface VotingMascotProps {
  isConnected: boolean;
  proposalCount: number;
}

const VotingMascot = ({ isConnected, proposalCount }: VotingMascotProps) => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const messages = {
      notConnected: [
        "Hi there! 👋 Connect your wallet to get started!",
        "Welcome to ClubVote! Let's connect your wallet first.",
        "Ready to vote? Connect your wallet and join the fun!"
      ],
      connected: [
        "Great! You're all set to vote and create proposals! ✨",
        "Your wallet is connected! Time to make your voice heard!",
        "Perfect! Now you can participate in club decisions!"
      ],
      hasProposals: [
        `Awesome! There are ${proposalCount} proposals to vote on!`,
        `${proposalCount} proposals are waiting for your vote!`,
        "Don't forget to vote on the proposals below! 🗳️"
      ]
    };

    let selectedMessages;
    if (!isConnected) {
      selectedMessages = messages.notConnected;
    } else if (proposalCount > 0) {
      selectedMessages = messages.hasProposals;
    } else {
      selectedMessages = messages.connected;
    }

    const randomMessage = selectedMessages[Math.floor(Math.random() * selectedMessages.length)];
    setMessage(randomMessage);
  }, [isConnected, proposalCount]);

  return (
    <div className="fixed bottom-6 right-6 hidden lg:block z-50">
      <div className="flex items-end gap-3">
        {/* Speech bubble */}
        <div className="relative bg-card border border-primary/20 rounded-2xl p-3 shadow-lg max-w-xs animate-pulse-soft">
          <p className="text-sm text-foreground font-medium">
            {message}
          </p>
          {/* Arrow pointing to mascot */}
          <div className="absolute bottom-3 right-[-8px] w-0 h-0 border-l-8 border-l-card border-t-8 border-t-transparent border-b-8 border-b-transparent"></div>
        </div>

        {/* Mascot */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-hero p-2 shadow-lg animate-bounce-gentle">
            <img
              src={mascotImage}
              alt="ClubVote Mascot"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-hero opacity-50 blur-md -z-10 animate-pulse-soft"></div>
        </div>
      </div>
    </div>
  );
};

export default VotingMascot;