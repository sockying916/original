import { useMemo, useState } from 'react';
import {
  ArrowLeftRight,
  Calculator,
  CheckCircle2,
  CreditCard,
  Lock,
  Plus,
  ShieldAlert,
  Ticket,
  Unlock,
} from 'lucide-react';
import {
  CONCESSION_PROFILES,
  CardPreset,
  INITIAL_CARD_PRESETS,
  MRT_STATIONS,
} from '../data/simplygoData';

type ToolTab = 'fare' | 'card' | 'concession';
type CommuterType = 'adult' | 'student' | 'senior' | 'workfare';

export function TravelToolsSection() {
  const [activeTab, setActiveTab] = useState<ToolTab>('fare');

  // Fare Calculator state
  const [originId, setOriginId] = useState('clementi');
  const [destId, setDestId] = useState('raffles-place');
  const [commuterType, setCommuterType] = useState<CommuterType>('adult');
  const [isMorningOffPeak, setIsMorningOffPeak] = useState(false);

  // Card Checker state
  const [cards, setCards] = useState<CardPreset[]>(INITIAL_CARD_PRESETS);
  const [selectedCan, setSelectedCan] = useState(INITIAL_CARD_PRESETS[0].can);
  const [customCanInput, setCustomCanInput] = useState('');
  const [canFeedback, setCanFeedback] = useState<string | null>(null);
  const [topUpChoice, setTopUpChoice] = useState(20);

  // Concession Finder state
  const [selectedProfileId, setSelectedProfileId] = useState(CONCESSION_PROFILES[0].id);

  // Fare estimation math based on Singapore distance-based transit fare brackets
  const fareEstimate = useMemo(() => {
    const origin = MRT_STATIONS.find((s) => s.id === originId) ?? MRT_STATIONS[0];
    const dest = MRT_STATIONS.find((s) => s.id === destId) ?? MRT_STATIONS[7];
    const distanceKm = Math.max(1.2, Math.abs(dest.kmFromOrigin - origin.kmFromOrigin));
    const estMinutes = Math.max(4, Math.round(distanceKm * 1.9 + 3));

    // Base Singapore distance-fare curve (SGD)
    let adultFare = 1.09;
    if (distanceKm > 3.2 && distanceKm <= 6.2) adultFare = 1.32;
    else if (distanceKm > 6.2 && distanceKm <= 10.2) adultFare = 1.56;
    else if (distanceKm > 10.2 && distanceKm <= 15.2) adultFare = 1.79;
    else if (distanceKm > 15.2 && distanceKm <= 21.2) adultFare = 1.96;
    else if (distanceKm > 21.2 && distanceKm <= 27.2) adultFare = 2.09;
    else if (distanceKm > 27.2) adultFare = 2.26;

    if (origin.id === dest.id) {
      adultFare = 1.09;
    }

    let finalFare = adultFare;
    if (commuterType === 'student') {
      finalFare = Math.min(0.75, Number((adultFare * 0.45).toFixed(2)));
    } else if (commuterType === 'senior') {
      finalFare = Math.min(1.09, Number((adultFare * 0.56).toFixed(2)));
    } else if (commuterType === 'workfare') {
      finalFare = Number((adultFare * 0.82).toFixed(2));
    }

    if (isMorningOffPeak && commuterType === 'adult') {
      finalFare = Math.max(0.59, Number((finalFare - 0.5).toFixed(2)));
    }

    return {
      origin,
      dest,
      distanceKm: origin.id === dest.id ? 0 : Number(distanceKm.toFixed(1)),
      estMinutes: origin.id === dest.id ? 0 : estMinutes,
      fare: finalFare,
      adultBaseline: adultFare,
    };
  }, [originId, destId, commuterType, isMorningOffPeak]);

  const activeCard = cards.find((c) => c.can === selectedCan) ?? cards[0];

  const handleSwapStations = () => {
    setOriginId(destId);
    setDestId(originId);
  };

  const handleLookupCan = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = customCanInput.replace(/\s+/g, '');
    if (!/^\d{16}$/.test(cleaned)) {
      setCanFeedback('Please enter a valid 16-digit CAN ID (numbers only), or pick a sample card below.');
      return;
    }
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    const existing = cards.find((c) => c.can.replace(/\s+/g, '') === cleaned);
    if (existing) {
      setSelectedCan(existing.can);
      setCanFeedback(null);
      return;
    }
    const newCard: CardPreset = {
      can: formatted,
      label: `Linked Card · ${cleaned.slice(-4)}`,
      cardType: 'SimplyGo EZ-Link Card',
      holderName: 'Commuter Account',
      balance: 22.8,
      autoTopUp: false,
      autoTopUpAmount: 20,
      status: 'Active',
      expiry: '11/2030',
      transactions: [
        {
          id: `new-${Date.now()}`,
          date: 'Today',
          time: '08:15',
          description: 'City Hall MRT → Dhoby Ghaut MRT',
          mode: 'MRT',
          amount: -1.09,
        },
      ],
    };
    setCards((prev) => [newCard, ...prev]);
    setSelectedCan(newCard.can);
    setCustomCanInput('');
    setCanFeedback(`Linked card ending in ${cleaned.slice(-4)} to this preview.`);
  };

  const handleTopUpCard = () => {
    if (activeCard.status === 'Blocked') {
      setCanFeedback('This card is currently blocked. Unblock it before performing a top-up.');
      return;
    }
    setCards((prev) =>
      prev.map((card) =>
        card.can === activeCard.can
          ? {
              ...card,
              balance: Number((card.balance + topUpChoice).toFixed(2)),
              transactions: [
                {
                  id: `topup-${Date.now()}`,
                  date: 'Just now',
                  time: 'Now',
                  description: 'SimplyGo Instant Top-Up via PayNow',
                  mode: 'Top-Up',
                  amount: topUpChoice,
                },
                ...card.transactions,
              ],
            }
          : card
      )
    );
    setCanFeedback(`Added S$${topUpChoice.toFixed(2)} to card ending in ${activeCard.can.slice(-4)}.`);
  };

  const handleToggleAutoTopUp = () => {
    setCards((prev) =>
      prev.map((card) =>
        card.can === activeCard.can ? { ...card, autoTopUp: !card.autoTopUp } : card
      )
    );
  };

  const handleToggleCardBlock = () => {
    setCards((prev) =>
      prev.map((card) =>
        card.can === activeCard.can
          ? { ...card, status: card.status === 'Active' ? 'Blocked' : 'Active' }
          : card
      )
    );
    setCanFeedback(
      activeCard.status === 'Active'
        ? 'Card blocked immediately. Remaining balance is protected.'
        : 'Card reactivated for transit taps.'
    );
  };

  const activeProfile =
    CONCESSION_PROFILES.find((p) => p.id === selectedProfileId) ?? CONCESSION_PROFILES[0];

  return (
    <section id="travel-tools" className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#E40046]">
              Commuter Utilities
            </p>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
              Plan fares, check card balances, and verify concession eligibility.
            </h2>
          </div>

          {/* Interactive Tool Switcher */}
          <div
            className="inline-flex p-1 bg-slate-200/80 rounded-xl shrink-0 overflow-x-auto max-w-full"
            role="tablist"
            aria-label="Commuter tools"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'fare'}
              onClick={() => setActiveTab('fare')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'fare'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Fare Calculator</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'card'}
              onClick={() => setActiveTab('card')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'card'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-4 h-4" />
              <span>Card Checker</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'concession'}
              onClick={() => setActiveTab('concession')}
              className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'concession'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Ticket className="w-4 h-4" />
              <span>Concession Finder</span>
            </button>
          </div>
        </div>

        {/* Workspace Panel */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8">
          {activeTab === 'fare' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
                  <div>
                    <label
                      htmlFor="origin-station"
                      className="block text-xs font-semibold text-slate-600 mb-1.5"
                    >
                      Boarding MRT Station
                    </label>
                    <select
                      id="origin-station"
                      value={originId}
                      onChange={(e) => setOriginId(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E40046]/25 focus:border-[#E40046]"
                    >
                      {MRT_STATIONS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.code})
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={handleSwapStations}
                    aria-label="Swap boarding and destination stations"
                    className="h-11 w-11 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-center text-slate-600 transition-colors cursor-pointer mx-auto sm:mx-0"
                  >
                    <ArrowLeftRight className="w-4 h-4" />
                  </button>

                  <div>
                    <label
                      htmlFor="dest-station"
                      className="block text-xs font-semibold text-slate-600 mb-1.5"
                    >
                      Alighting MRT Station
                    </label>
                    <select
                      id="dest-station"
                      value={destId}
                      onChange={(e) => setDestId(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E40046]/25 focus:border-[#E40046]"
                    >
                      {MRT_STATIONS.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <span className="block text-xs font-semibold text-slate-600 mb-2">
                    Commuter Fare Profile
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {(
                      [
                        { id: 'adult', label: 'Adult / Bank Card' },
                        { id: 'student', label: 'Student' },
                        { id: 'senior', label: 'Senior / PWD' },
                        { id: 'workfare', label: 'Workfare' },
                      ] as { id: CommuterType; label: string }[]
                    ).map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setCommuterType(opt.id)}
                        className={`px-3 py-2.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap truncate ${
                          commuterType === opt.id
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <label className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isMorningOffPeak}
                    onChange={(e) => setIsMorningOffPeak(e.target.checked)}
                    disabled={commuterType !== 'adult'}
                    className="mt-0.5 w-4 h-4 accent-[#E40046] rounded cursor-pointer"
                  />
                  <div>
                    <span className="block text-sm font-semibold text-slate-900">
                      Morning Pre-Peak Rail Discount (Tap in before 7:45am)
                    </span>
                    <span className="block text-xs text-slate-600 mt-0.5">
                      Save up to S$0.50 on weekday morning MRT/LRT rides for Adult SimplyGo cards and contactless bank cards.
                    </span>
                  </div>
                </label>
              </div>

              {/* Calculated Fare Output */}
              <div className="lg:col-span-5 rounded-xl bg-slate-900 text-white p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs text-slate-400">Estimated Card Fare</p>
                    <p className="mt-1 font-display text-4xl font-bold tracking-tight tabular-nums">
                      S${fareEstimate.fare.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Est. Travel Time</p>
                    <p className="mt-1 font-display text-xl font-semibold tabular-nums">
                      {fareEstimate.estMinutes} min
                    </p>
                  </div>
                </div>

                <dl className="space-y-2.5 text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Route</dt>
                    <dd className="font-medium text-right">
                      {fareEstimate.origin.name} → {fareEstimate.dest.name}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Rail Distance</dt>
                    <dd className="font-mono tabular-nums">
                      {fareEstimate.distanceKm.toFixed(1)} km
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">Standard Adult Fare</dt>
                    <dd className="font-mono tabular-nums">
                      S${fareEstimate.adultBaseline.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-400">45-Min Transfer Rule</dt>
                    <dd className="text-emerald-300 font-medium">
                      Bus-to-Rail Eligible
                    </dd>
                  </div>
                </dl>

                {originId === destId && (
                  <p className="text-xs text-amber-300">
                    Select two different stations to calculate an inter-station journey.
                  </p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'card' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left: Card Selector & CAN Lookup */}
              <div className="lg:col-span-5 space-y-5">
                <form onSubmit={handleLookupCan} className="space-y-2">
                  <label
                    htmlFor="can-lookup"
                    className="block text-xs font-semibold text-slate-600"
                  >
                    Enter 16-Digit Transit Card CAN ID
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="can-lookup"
                      type="text"
                      value={customCanInput}
                      onChange={(e) => setCustomCanInput(e.target.value)}
                      placeholder="e.g. 1004882109435512"
                      maxLength={19}
                      className="flex-1 h-11 px-3.5 rounded-lg border border-slate-300 font-mono text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#E40046]/25 focus:border-[#E40046]"
                    />
                    <button
                      type="submit"
                      className="px-4 h-11 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Check Card
                    </button>
                  </div>
                </form>

                {canFeedback && (
                  <p className="text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-lg px-3 py-2">
                    {canFeedback}
                  </p>
                )}

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-500">
                    Linked Commuter Cards
                  </p>
                  <div className="space-y-2">
                    {cards.map((card) => {
                      const isSelected = card.can === activeCard.can;
                      return (
                        <button
                          key={card.can}
                          type="button"
                          onClick={() => {
                            setSelectedCan(card.can);
                            setCanFeedback(null);
                          }}
                          className={`w-full text-left p-3.5 rounded-xl border transition-colors cursor-pointer ${
                            isSelected
                              ? 'border-[#E40046] bg-rose-50/40'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-sm font-semibold text-slate-900">
                              {card.label}
                            </span>
                            <span className="font-mono text-sm font-bold text-slate-900 tabular-nums">
                              S${card.balance.toFixed(2)}
                            </span>
                          </div>
                          <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                            <span className="font-mono tabular-nums">{card.can}</span>
                            <span aria-hidden="true">·</span>
                            <span
                              className={
                                card.status === 'Active'
                                  ? 'text-emerald-700 font-medium'
                                  : 'text-rose-700 font-medium'
                              }
                            >
                              {card.status}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Active Card Management & History */}
              <div className="lg:col-span-7 space-y-6">
                <div className="p-5 sm:p-6 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <span>{activeCard.cardType}</span>
                      <span aria-hidden="true">·</span>
                      <span className="inline-flex items-center gap-1 font-semibold">
                        {activeCard.status === 'Active' ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Active</span>
                          </>
                        ) : (
                          <>
                            <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
                            <span className="text-rose-300">Blocked</span>
                          </>
                        )}
                      </span>
                    </div>
                    <p className="font-mono text-sm text-slate-300 tabular-nums">
                      CAN {activeCard.can}
                    </p>
                    <p className="text-xs text-slate-400">
                      Holder: {activeCard.holderName} · Valid thru {activeCard.expiry}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-xs text-slate-400">Stored Value Balance</p>
                    <p className="font-display text-3xl font-bold tabular-nums">
                      S${activeCard.balance.toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Quick Card Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
                  <div className="flex flex-wrap items-center gap-2">
                    {[10, 20, 50].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => setTopUpChoice(amt)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors tabular-nums cursor-pointer ${
                          topUpChoice === amt
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        S${amt}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={handleTopUpCard}
                      className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-[#E40046] hover:bg-[#C0003B] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Top Up S${topUpChoice}</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleToggleAutoTopUp}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Auto Top-Up: {activeCard.autoTopUp ? 'On' : 'Off'}
                    </button>
                    <button
                      type="button"
                      onClick={handleToggleCardBlock}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer whitespace-nowrap ${
                        activeCard.status === 'Active'
                          ? 'border-rose-200 text-rose-700 hover:bg-rose-50'
                          : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50'
                      }`}
                    >
                      {activeCard.status === 'Active' ? (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Block Card</span>
                        </>
                      ) : (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>Unblock Card</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Recent Transactions Table */}
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 mb-3">
                    Recent Transit &amp; Wallet Activity
                  </h3>
                  <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                    {activeCard.transactions.map((tx) => (
                      <div
                        key={tx.id}
                        className="px-4 py-3 flex items-center justify-between gap-4 bg-white text-sm"
                      >
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900 truncate">
                            {tx.description}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {tx.mode} · {tx.date} · {tx.time}
                          </p>
                        </div>
                        <span
                          className={`font-mono font-semibold tabular-nums whitespace-nowrap shrink-0 ${
                            tx.amount > 0
                              ? 'text-emerald-700'
                              : tx.amount === 0
                              ? 'text-slate-500'
                              : 'text-slate-900'
                          }`}
                        >
                          {tx.amount > 0
                            ? `+S$${tx.amount.toFixed(2)}`
                            : tx.amount === 0
                            ? 'S$0.00'
                            : `-S$${Math.abs(tx.amount).toFixed(2)}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'concession' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-4 space-y-2">
                <p className="text-xs font-semibold text-slate-500 mb-2">
                  Select Commuter Category
                </p>
                {CONCESSION_PROFILES.map((profile) => {
                  const isActive = profile.id === activeProfile.id;
                  return (
                    <button
                      key={profile.id}
                      type="button"
                      onClick={() => setSelectedProfileId(profile.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <p className="text-sm font-semibold">{profile.group}</p>
                      <p
                        className={`text-xs mt-0.5 ${
                          isActive ? 'text-slate-300' : 'text-slate-500'
                        }`}
                      >
                        {profile.cardName}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-8 p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-[#E40046]">
                    {activeProfile.group}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
                    {activeProfile.cardName}
                  </h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {activeProfile.eligibility}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <p className="text-xs text-slate-500">Monthly Concession Pass</p>
                    <p className="mt-1 font-display text-base font-bold text-slate-900 tabular-nums">
                      {activeProfile.monthlyPassPrice}
                    </p>
                  </div>
                  <div className="p-4 rounded-xl bg-white border border-slate-200">
                    <p className="text-xs text-slate-500">Per-Ride Subsidy</p>
                    <p className="mt-1 font-display text-base font-bold text-slate-900">
                      {activeProfile.perRideDiscount}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 mb-3">
                    How to Apply or Renew
                  </h4>
                  <ol className="space-y-2.5">
                    {activeProfile.applySteps.map((step, idx) => (
                      <li key={step} className="flex items-start gap-3 text-sm text-slate-700">
                        <span className="font-mono text-xs font-bold text-[#E40046] mt-0.5 tabular-nums">
                          0{idx + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
