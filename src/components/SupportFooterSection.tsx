import { useState } from 'react';
import {
  ChevronDown,
  Clock,
  MapPin,
  Phone,
  Search,
} from 'lucide-react';
import { FAQ_ITEMS, TICKET_OFFICES, TicketOffice } from '../data/simplygoData';

interface SupportFooterSectionProps {
  onOpenDownloadModal: () => void;
}

type RegionFilter = 'All' | TicketOffice['region'];

const REGIONS: RegionFilter[] = ['All', 'Central', 'North', 'East', 'West', 'North-East'];

export function SupportFooterSection({ onOpenDownloadModal }: SupportFooterSectionProps) {
  const [openFaqId, setOpenFaqId] = useState<string>(FAQ_ITEMS[0].id);
  const [selectedRegion, setSelectedRegion] = useState<RegionFilter>('All');
  const [officeQuery, setOfficeQuery] = useState('');

  const filteredOffices = TICKET_OFFICES.filter((office) => {
    const matchesRegion = selectedRegion === 'All' || office.region === selectedRegion;
    const q = officeQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      office.station.toLowerCase().includes(q) ||
      office.services.toLowerCase().includes(q) ||
      office.locationDetail.toLowerCase().includes(q);
    return matchesRegion && matchesQuery;
  });

  return (
    <>
      <section id="support" className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* FAQs + Hotline Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#E40046]">
                  FAQs &amp; Customer Care
                </p>
                <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 text-balance">
                  Answers for daily commutes, card upgrades, and fare claims.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                  Need assistance with a lost card, concession application, or fare adjustment? Reach our commuter care team or browse common guides.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#E40046] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-medium text-slate-500">
                      SimplyGo Hotline
                    </p>
                    <p className="font-display text-xl font-bold text-slate-900 tabular-nums">
                      1800-2255-663
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Daily · 8:00am – 6:00pm (Closed on Public Holidays)
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-xs text-slate-600">
                    Submit fare claims 24/7 in-app
                  </span>
                  <button
                    type="button"
                    onClick={onOpenDownloadModal}
                    className="text-xs font-semibold text-[#E40046] hover:text-[#C0003B] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Get SimplyGo App
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {FAQ_ITEMS.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    className="rounded-xl bg-white border border-slate-200 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors cursor-pointer"
                    >
                      <div>
                        <span className="block text-xs font-medium text-slate-500 mb-0.5">
                          {faq.category}
                        </span>
                        <span className="font-display text-base font-semibold text-slate-900">
                          {faq.question}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ticket Office Locator */}
          <div className="pt-12 border-t border-slate-200">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#E40046]">
                  Islandwide Counter Network
                </p>
                <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
                  SimplyGo Ticket Offices &amp; Kiosks
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="search"
                    value={officeQuery}
                    onChange={(e) => setOfficeQuery(e.target.value)}
                    placeholder="Search station or service..."
                    aria-label="Search SimplyGo ticket offices"
                    className="h-10 pl-9 pr-4 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-[#E40046]/25 focus:border-[#E40046]"
                  />
                </div>
              </div>
            </div>

            <div
              className="flex flex-wrap gap-1.5 mb-6"
              role="tablist"
              aria-label="Filter ticket offices by Singapore region"
            >
              {REGIONS.map((region) => (
                <button
                  key={region}
                  type="button"
                  role="tab"
                  aria-selected={selectedRegion === region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
                    selectedRegion === region
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {region === 'All' ? 'All Regions' : region}
                </button>
              ))}
            </div>

            {filteredOffices.length === 0 ? (
              <div className="p-8 rounded-xl bg-white border border-slate-200 text-center text-sm text-slate-600">
                No SimplyGo Ticket Offices matched “{officeQuery}”. Try clearing the search filter or selecting All Regions.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredOffices.map((office) => (
                  <div
                    key={office.id}
                    className="p-5 rounded-xl bg-white border border-slate-200 space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h4 className="font-display text-base font-bold text-slate-900">
                        {office.station}
                      </h4>
                      <span className="text-xs font-medium text-slate-500 whitespace-nowrap shrink-0">
                        {office.region}
                      </span>
                    </div>
                    <p className="flex items-start gap-2 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{office.locationDetail}</span>
                    </p>
                    <p className="flex items-start gap-2 text-xs text-slate-600">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{office.hours}</span>
                    </p>
                    <p className="pt-2 border-t border-slate-100 text-xs text-slate-500">
                      {office.services}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Quiet Structured Footer */}
      <footer className="bg-slate-950 text-slate-300 py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
            <div className="space-y-3">
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                Simply<span className="text-[#E40046]">Go</span>
              </span>
              <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
                Unified public transport ticketing, concession management, and contactless travel services in Singapore.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white mb-3">
                Products &amp; Services
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#products" className="hover:text-white transition-colors">SimplyGo EZ-Link Cards</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Contactless Bank Cards</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">Concession Cards &amp; Passes</a></li>
                <li><a href="#products" className="hover:text-white transition-colors">EZ-Link Motoring</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white mb-3">
                Commuter Resources
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#travel-tools" className="hover:text-white transition-colors">Fare &amp; Journey Calculator</a></li>
                <li><a href="#travel-tools" className="hover:text-white transition-colors">Card Balance Checker</a></li>
                <li><a href="#simplygo-app" className="hover:text-white transition-colors">Enhanced SimplyGo App</a></li>
                <li><a href="#newsroom" className="hover:text-white transition-colors">Campaigns &amp; Advisories</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-white mb-3">
                Support &amp; Governance
              </h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><a href="#support" className="hover:text-white transition-colors">SimplyGo Ticket Offices</a></li>
                <li><a href="#support" className="hover:text-white transition-colors">Hotline: 1800-2255-663</a></li>
                <li><a href="#support" className="hover:text-white transition-colors">Terms &amp; Conditions</a></li>
                <li><a href="#support" className="hover:text-white transition-colors">Data Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
            <p>© 2026 SimplyGo Pte. Ltd. All rights reserved.</p>
            <p>Public Transport Ticketing · Singapore</p>
          </div>
        </div>
      </footer>
    </>
  );
}
