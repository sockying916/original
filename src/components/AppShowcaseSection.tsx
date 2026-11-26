import { useState } from 'react';
import {
  Bell,
  Check,
  Gift,
  Lock,
  Smartphone,
  Wallet,
} from 'lucide-react';

interface AppShowcaseSectionProps {
  onOpenDownloadModal: () => void;
}

const APP_FEATURES = [
  {
    id: 'history',
    title: 'Real-Time Journey & Fare History',
    description:
      'View itemised bus and MRT/LRT tap-in and tap-out fares, transfer rebates, and consolidated bank card charges the moment your trip posts.',
    icon: Bell,
    screenTitle: 'Recent Journeys',
    screenStatLabel: 'November Transit Spend',
    screenStatValue: 'S$64.80',
    screenRows: [
      { title: 'Botanic Gardens → City Hall', meta: 'DTL / EWL · Today, 08:38', value: '-S$1.66' },
      { title: 'Bus 174 · Orchard → Farrer Rd', meta: 'Transfer Rebate Applied · Yesterday', value: '-S$0.92' },
      { title: 'City Hall → Clementi', meta: 'EWL · Yesterday, 18:19', value: '-S$1.79' },
    ],
  },
  {
    id: 'topup',
    title: 'Remote Top-Up & Auto Top-Up',
    description:
      'Top up SimplyGo EZ-Link cards or family members’ Concession cards via PayNow and bank cards—or enable automatic top-ups when balance dips.',
    icon: Wallet,
    screenTitle: 'Auto Top-Up',
    screenStatLabel: 'Linked Card Balance',
    screenStatValue: 'S$28.45',
    screenRows: [
      { title: 'PayNow Instant Top-Up', meta: 'Threshold below S$10.00', value: '+S$30.00' },
      { title: 'Child School Smart Card', meta: 'Family Auto Top-Up · Active', value: '+S$20.00' },
      { title: 'EZ-Link Motoring (IU/OBU)', meta: 'ERP & Carpark Ready', value: 'Linked' },
    ],
  },
  {
    id: 'block',
    title: 'Instant Lost Card Blocking',
    description:
      'Misplaced your travel card? Lock it immediately inside the SimplyGo App to protect your remaining stored value and request a refund.',
    icon: Lock,
    screenTitle: 'Card Security',
    screenStatLabel: 'Protected Stored Value',
    screenStatValue: 'S$41.20',
    screenRows: [
      { title: 'Instant Block Status', meta: 'Deactivates tap-in within minutes', value: 'Ready' },
      { title: 'Balance Refund Transfer', meta: 'Direct to PayNow or replacement card', value: 'Eligible' },
      { title: 'Card Replacement Order', meta: 'Deliver to home address in 5 days', value: 'In-App' },
    ],
  },
  {
    id: 'rewards',
    title: 'Ride to Rewards & e-Vouchers',
    description:
      'Earn SimplyGo Rewards points on daily commutes and EZ-Link Wallet spends, then redeem transit credits or partner retail e-vouchers.',
    icon: Gift,
    screenTitle: 'SimplyGo Rewards',
    screenStatLabel: 'Available Points',
    screenStatValue: '2,450 pts',
    screenRows: [
      { title: 'S$5 Transit Credit Voucher', meta: 'Redeemable with 1,250 points', value: 'Claim' },
      { title: 'Pre-Peak Morning Bonus', meta: '2x points before 7:45am weekdays', value: '+120 pts' },
      { title: 'Partner Coffee e-Voucher', meta: 'Valid at 90+ islandwide outlets', value: '800 pts' },
    ],
  },
];

export function AppShowcaseSection({ onOpenDownloadModal }: AppShowcaseSectionProps) {
  const [selectedFeatureId, setSelectedFeatureId] = useState(APP_FEATURES[0].id);
  const activeFeature =
    APP_FEATURES.find((f) => f.id === selectedFeatureId) ?? APP_FEATURES[0];

  return (
    <section
      id="simplygo-app"
      className="py-16 lg:py-24 bg-[#0F1F3D] text-white border-b border-slate-800"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Interactive Feature List */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-wide text-rose-300">
                All-in-One Mobile Experience
              </p>
              <h2 className="mt-2 font-display text-2xl sm:text-4xl font-bold tracking-tight text-white text-balance">
                The enhanced SimplyGo App replaces legacy web portals.
              </h2>
              <p className="mt-3 text-base text-slate-300 leading-relaxed max-w-xl">
                EZ-Link and TransitLink digital services are now consolidated into a single mobile app for commuters across Singapore.
              </p>
            </div>

            <div className="space-y-2.5">
              {APP_FEATURES.map((feature) => {
                const Icon = feature.icon;
                const isSelected = feature.id === activeFeature.id;
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => setSelectedFeatureId(feature.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-colors duration-150 flex items-start gap-4 cursor-pointer ${
                      isSelected
                        ? 'bg-white/10 border-white/25'
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-[#E40046] text-white'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-bold text-white">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-300 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenDownloadModal}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-[#E40046] hover:bg-[#C0003B] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <Smartphone className="w-4 h-4" />
                <span>Download SimplyGo App</span>
              </button>
              <span className="text-xs text-slate-400">
                Available on Apple App Store &amp; Google Play · Singpass Supported
              </span>
            </div>
          </div>

          {/* Right: Interactive Mobile App Preview */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[360px] rounded-[28px] bg-slate-950 p-3 border border-white/15 shadow-2xl">
              <div className="rounded-[22px] bg-white text-slate-900 overflow-hidden">
                {/* Phone Top Bar */}
                <div className="px-5 pt-5 pb-4 bg-[#E40046] text-white">
                  <div className="flex items-center justify-between text-xs text-rose-100">
                    <span>SimplyGo App</span>
                    <span>{activeFeature.screenTitle}</span>
                  </div>
                  <p className="mt-4 text-xs text-rose-100">
                    {activeFeature.screenStatLabel}
                  </p>
                  <p className="mt-1 font-display text-3xl font-bold tabular-nums">
                    {activeFeature.screenStatValue}
                  </p>
                </div>

                {/* Screen Body */}
                <div className="p-5 space-y-3 bg-slate-50 min-h-[290px]">
                  {activeFeature.screenRows.map((row) => (
                    <div
                      key={row.title}
                      className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">
                          {row.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5 truncate">
                          {row.meta}
                        </p>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-900 tabular-nums whitespace-nowrap shrink-0">
                        {row.value}
                      </span>
                    </div>
                  ))}

                  <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Synced with NFC card balance &amp; PayNow</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
