import React, { useState, useMemo } from 'react';
import { CAMPAIGN_GOALS, AD_CHANNELS } from '../data/marketingData.ts';
import { Calculator, ArrowRight, Eye, Users, MousePointerClick, Target, TrendingUp, Check } from 'lucide-react';

interface CampaignArchitectProps {
  onOpenProposalWithPlan: (planSummary: string) => void;
}

export const CampaignArchitect: React.FC<CampaignArchitectProps> = ({ onOpenProposalWithPlan }) => {
  const [selectedGoalId, setSelectedGoalId] = useState<string>('leads');
  const [selectedChannels, setSelectedChannels] = useState<string[]>(['instagram', 'facebook']);
  const [budget, setBudget] = useState<number>(2500);

  const toggleChannel = (channelId: string) => {
    if (selectedChannels.includes(channelId)) {
      if (selectedChannels.length > 1) {
        setSelectedChannels(selectedChannels.filter((id) => id !== channelId));
      }
    } else {
      setSelectedChannels([...selectedChannels, channelId]);
    }
  };

  const currentGoal = useMemo(
    () => CAMPAIGN_GOALS.find((g) => g.id === selectedGoalId) || CAMPAIGN_GOALS[0],
    [selectedGoalId]
  );

  // Math calculations for estimated reach & conversions
  const metrics = useMemo(() => {
    const activeChannels = AD_CHANNELS.filter((c) => selectedChannels.includes(c.id));
    const avgCPM =
      activeChannels.reduce((sum, c) => sum + c.cpm, 0) / (activeChannels.length || 1);
    const avgCTR =
      activeChannels.reduce((sum, c) => sum + c.ctr, 0) / (activeChannels.length || 1);
    const avgConvRate =
      activeChannels.reduce((sum, c) => sum + c.convRate, 0) / (activeChannels.length || 1);

    // Total Impressions = (Budget / CPM) * 1000 * goalMultiplier
    const totalImpressions = Math.round((budget / avgCPM) * 1000 * currentGoal.multiplier);
    // Reach = ~60% of unique impressions
    const uniqueReach = Math.round(totalImpressions * 0.62);
    // Clicks = Impressions * CTR%
    const estimatedClicks = Math.round(totalImpressions * (avgCTR / 100));
    // Conversions = Clicks * ConvRate%
    const estimatedConversions = Math.round(estimatedClicks * (avgConvRate / 100));
    // CPA = Budget / Conversions
    const estimatedCPA = estimatedConversions > 0 ? (budget / estimatedConversions).toFixed(2) : '0';
    // Estimated ROAS
    const projectedROAS = (3.2 * currentGoal.multiplier).toFixed(1);

    return {
      impressions: totalImpressions.toLocaleString(),
      reach: uniqueReach.toLocaleString(),
      clicks: estimatedClicks.toLocaleString(),
      conversions: estimatedConversions.toLocaleString(),
      cpa: `$${estimatedCPA}`,
      roas: `${projectedROAS}x`,
    };
  }, [budget, selectedChannels, currentGoal]);

  const handleApplyToProposal = () => {
    const channelNames = AD_CHANNELS.filter((c) => selectedChannels.includes(c.id))
      .map((c) => c.name)
      .join(', ');
    const planSummary = `${currentGoal.name} Campaign | Budget: $${budget.toLocaleString()}/mo | Channels: ${channelNames} | Est. Reach: ${metrics.reach}`;
    onOpenProposalWithPlan(planSummary);
  };

  return (
    <section id="architect" className="py-20 md:py-28 relative bg-[#07070a] border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FFD700] flex items-center justify-center gap-2">
            <Calculator className="w-4 h-4" />
            <span>Interactive Campaign Architect</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-white">
            Model Your Ad Yield. <br />
            <span className="gold-gradient-text-bright">Real Mathematics, Not Guesswork.</span>
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-sans">
            Calibrate your marketing goal, select channel mix, and simulate audience reach, click yield, 
            and projected ROAS calibrated against VANDU’s historical campaign benchmarks.
          </p>
        </div>

        {/* 2-Column Split: Controls on Left, Live Yield Cockpit on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-8 glass-gold-card rounded-2xl p-6 sm:p-8">
            {/* Step 1: Objective */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">
                1. Select Strategic Objective
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {CAMPAIGN_GOALS.map((goal) => {
                  const isSelected = selectedGoalId === goal.id;
                  return (
                    <button
                      key={goal.id}
                      onClick={() => setSelectedGoalId(goal.id)}
                      className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FFD700]/15 border-[#FFD700] text-white shadow-[0_0_15px_rgba(255,215,0,0.15)]'
                          : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                      }`}
                    >
                      <div className="text-xs font-bold">{goal.name}</div>
                      <div className="text-[10px] text-neutral-400 mt-1 line-clamp-1">
                        {goal.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Channel Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-3">
                2. Target Ad Channels (Select 1 or more)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {AD_CHANNELS.map((channel) => {
                  const isSelected = selectedChannels.includes(channel.id);
                  return (
                    <button
                      key={channel.id}
                      onClick={() => toggleChannel(channel.id)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FFD700]/10 border-[#FFD700]/80 text-white'
                          : 'bg-neutral-900/40 border-neutral-800 text-neutral-400 hover:text-white'
                      }`}
                    >
                      <span className="text-xs font-semibold">{channel.name}</span>
                      <div
                        className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                          isSelected
                            ? 'bg-[#FFD700] border-[#FFD700] text-black'
                            : 'border-neutral-700'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Monthly Budget Slider */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  3. Monthly Media Budget
                </label>
                <span className="font-mono text-xl font-extrabold gold-gradient-text tabular-nums">
                  ${budget.toLocaleString()}
                </span>
              </div>

              <input
                type="range"
                min={500}
                max={25000}
                step={250}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#FFD700]"
              />

              <div className="flex justify-between text-[11px] font-mono text-neutral-500 mt-2">
                <span>$500/mo (Starter)</span>
                <span>$10,000/mo (Growth)</span>
                <span>$25,000+/mo (Dominance)</span>
              </div>
            </div>
          </div>

          {/* Real-Time Mathematical Yield Projection Cockpit */}
          <div className="lg:col-span-5 flex flex-col justify-between glass-gold-card rounded-2xl p-6 sm:p-8 border border-[#FFD700]/30 relative overflow-hidden">
            {/* Top gold beam highlight */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF9900] via-[#FFD700] to-amber-200" />

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                    Calculated Yield
                  </span>
                  <h3 className="font-cinzel text-xl font-bold text-white">
                    Campaign Projection
                  </h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#FFD700]/10 border border-[#FFD700]/30 text-xs font-mono font-bold text-[#FFD700]">
                  {metrics.roas} Target ROAS
                </div>
              </div>

              {/* Numerical Metrics Matrix */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Eye className="w-3.5 h-3.5 text-[#FFD700]" />
                    <span>Est. Impressions</span>
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-1 tabular-nums">
                    {metrics.impressions}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Users className="w-3.5 h-3.5 text-[#FF9900]" />
                    <span>Target Reach</span>
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-1 tabular-nums">
                    {metrics.reach}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <MousePointerClick className="w-3.5 h-3.5 text-amber-400" />
                    <span>High-Intent Clicks</span>
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-1 tabular-nums">
                    {metrics.clicks}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-900/70 border border-neutral-800">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Target className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Projected Leads</span>
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-bold text-[#FFD700] mt-1 tabular-nums">
                    {metrics.conversions}
                  </div>
                </div>
              </div>

              {/* Estimated CPA Tag */}
              <div className="p-3 rounded-xl bg-neutral-900/40 border border-neutral-800 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-400">Projected Cost Per Lead/Acquisition:</span>
                <span className="font-bold text-white">{metrics.cpa}</span>
              </div>
            </div>

            {/* Launch / Send to Proposal Action */}
            <div className="pt-6 border-t border-neutral-800/80 mt-6">
              <button
                onClick={handleApplyToProposal}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm text-black bg-gradient-to-r from-[#FFE57F] via-[#FFD700] to-[#FF9900] hover:brightness-110 active:scale-98 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] cursor-pointer"
              >
                <span>Request Custom Proposal for this Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
