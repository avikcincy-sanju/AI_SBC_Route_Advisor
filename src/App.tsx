import React, { useState, useRef, useEffect } from 'react';
import {
  DollarSign,
  Globe,
  AlertCircle,
  Zap,
  Lock,
  ChevronDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingDown,
  Shield,
  Activity,
} from 'lucide-react';

const BankIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" />
  </svg>
);

const CardIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const CoinIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8M10 10h4M10 14h4" />
  </svg>
);

const countries = [
  { name: 'United States', flag: '🇺🇸', code: 'US', restricted: false },
  { name: 'Singapore', flag: '🇸🇬', code: 'SG', restricted: false },
  { name: 'Germany', flag: '🇩🇪', code: 'DE', restricted: false },
  { name: 'India', flag: '🇮🇳', code: 'IN', restricted: false },
  { name: 'Philippines', flag: '🇵🇭', code: 'PH', restricted: false },
  { name: 'United Kingdom', flag: '🇬🇧', code: 'GB', restricted: false },
  { name: 'Nigeria', flag: '🇳🇬', code: 'NG', restricted: false },
  { name: 'Japan', flag: '🇯🇵', code: 'JP', restricted: false },
  { name: 'Canada', flag: '🇨🇦', code: 'CA', restricted: false },
  { name: 'Australia', flag: '🇦🇺', code: 'AU', restricted: false },
  { name: 'France', flag: '🇫🇷', code: 'FR', restricted: false },
  { name: 'UAE', flag: '🇦🇪', code: 'AE', restricted: false },
  { name: 'Hong Kong', flag: '🇭🇰', code: 'HK', restricted: false },
  { name: 'Mexico', flag: '🇲🇽', code: 'MX', restricted: false },
  { name: 'Brazil', flag: '🇧🇷', code: 'BR', restricted: false },
  { name: 'South Korea', flag: '🇰🇷', code: 'KR', restricted: false },
  { name: 'North Korea', flag: '🇰🇵', code: 'KP', restricted: true },
  { name: 'Iran', flag: '🇮🇷', code: 'IR', restricted: true },
  { name: 'Syria', flag: '🇸🇾', code: 'SY', restricted: true },
  { name: 'Cuba', flag: '🇨🇺', code: 'CU', restricted: true },
  { name: 'Russia', flag: '🇷🇺', code: 'RU', restricted: true },
  { name: 'Belarus', flag: '🇧🇾', code: 'BY', restricted: true },
  { name: 'Crimea Region', flag: '🚫', code: 'CR', restricted: true },
];

const scenarios = [
  { name: 'Global Remittance', amount: '300', country: 'PH', urgency: 'High', compliance: 'Low', preferred: 'Cheapest' },
  { name: 'Urgent Supplier Payment', amount: '10000', country: 'SG', urgency: 'High', compliance: 'Medium', preferred: 'Fastest' },
  { name: 'Marketplace Contractor Payout', amount: '2000', country: 'IN', urgency: 'Medium', compliance: 'Low', preferred: 'Cheapest' },
  { name: 'Retail International Purchase', amount: '500', country: 'GB', urgency: 'Medium', compliance: 'Medium', preferred: 'Fastest' },
  { name: 'Corporate Treasury Transfer', amount: '1000000', country: 'JP', urgency: 'Low', compliance: 'High', preferred: 'Safest' },
  { name: 'High Compliance Jurisdiction', amount: '10000', country: 'DE', urgency: 'Medium', compliance: 'High', preferred: 'Safest' },
  { name: 'Sanctions-Sensitive Destination', amount: '10000', country: 'CU', urgency: 'High', compliance: 'High', preferred: 'Fastest' },
  { name: 'Cross-Border Freelance Payment', amount: '800', country: 'NG', urgency: 'Medium', compliance: 'Low', preferred: 'Cheapest' },
];

const Select = ({ label, options, value, onChange }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-semibold text-slate-300">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2.5 rounded-lg border border-slate-600 bg-slate-800 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

const CountryDropdown = ({ value, onChange, isRestricted }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = countries.find((c) => c.code === value);
  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-semibold text-slate-300">Destination Country</label>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-4 py-2.5 rounded-lg border font-medium text-left flex items-center justify-between transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            isRestricted
              ? 'border-red-500 bg-red-900/20 text-white'
              : 'border-slate-600 bg-slate-800 text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            {selectedCountry ? (
              <>
                <span className="text-lg">{selectedCountry.flag}</span>
                <span>{selectedCountry.name}</span>
              </>
            ) : (
              <span>Select a country</span>
            )}
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50">
            <input
              ref={inputRef}
              type="text"
              placeholder="Search countries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-700 text-white border-b border-slate-600 rounded-t-lg focus:outline-none placeholder-slate-500"
            />
            <div className="max-h-64 overflow-y-auto">
              {filteredCountries.length > 0 ? (
                filteredCountries.map((country) => (
                  <button
                    key={country.code}
                    onClick={() => {
                      onChange(country.code);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-slate-700 transition-colors border-b border-slate-700 last:border-b-0 ${
                      value === country.code ? 'bg-blue-600/30' : ''
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-lg">{country.flag}</span>
                      <span className="text-white">{country.name}</span>
                      {country.restricted && (
                        <span className="text-xs font-bold text-red-400 ml-auto mr-0">
                          Restricted
                        </span>
                      )}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-slate-400">No countries found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

interface RailData {
  id: string;
  title: string;
  icon: React.ReactNode;
  speed: string;
  cost: string;
  compliance: string;
  settlementTime: string;
}

interface Recommendation {
  recommended: string;
  reason: string;
  estimatedSpeed: string;
  estimatedCost: string;
  estimatedCostRange: string;
  confidenceScore: number;
  complianceFit: string;
  decisionExplanation: string;
  decisionFactors: {
    amount: string;
    corridor: string;
    urgency: string;
    compliance: string;
    preferred: string;
  };
  steps: string[];
  timeline: { stage: string; duration: string }[];
  riskScores: { complianceRisk: number; settlementRisk: number; operationalRisk: number; overall: number };
  corridorIntelligence: { name: string; efficiency: string; friction: string; stablecoinSuitability: string; regulatory: string; remittanceDemand: string };
  liquidityStatus: { pool: string; congestion: string; gasFee: string; capacity: string; treasuryImpact: string };
  fxImpact: { bankWire: { spread: string; cost: string }; cardNetwork: { spread: string; cost: string }; stablecoin: { spread: string; cost: string } };
  decisionScorecard: { bankWire: number; cardNetwork: number; stablecoin: number };
  paymentImpact: { costSavings: string; acceleration: string; efficiency: string; bestFit: string };
  negotiation: { payerPref: string; recipientPref: string; outcome: string; explanation: string };
  complianceScreening: { sanctionsCheck: string; amlRisk: string; jurisdictionRestrictions: string; screeningResult: string };
  policyConstraints: { maxBlockchainSettlementRailThreshold: string; highComplianceRule: string; treasuryPreference: string; preferredRailPolicy: string };
  settlementProbability: { bankWire: number; cardNetwork: number; stablecoin: number };
  marketSignals: { networkCongestion: string; fxVolatility: string; liquidityTrend: string; corridorDemand: string; settlementConditions: string };
  weightContributions: { speed: number; costEfficiency: number; compliance: number; liquidity: number; corridorFit: number; fxEfficiency: number; primaryDriver: string };
}

export default function App() {
  const [amount, setAmount] = useState('10000');
  const [country, setCountry] = useState('SG');
  const [urgency, setUrgency] = useState('Medium');
  const [compliance, setCompliance] = useState('Medium');
  const [preferred, setPreferred] = useState('Fastest');
  const [result, setResult] = useState<Recommendation | null>(null);
  const [validationError, setValidationError] = useState('');
  const [executionStep, setExecutionStep] = useState(0);
  const [isExecuting, setIsExecuting] = useState(false);
  const [routingMode, setRoutingMode] = useState('Balanced AI Mode');
  const [clientProfile, setClientProfile] = useState('Marketplace Platform');
  const [activeTab, setActiveTab] = useState('overview');
  const [overviewSubTab, setOverviewSubTab] = useState('summary');

  const selectedCountryObj = countries.find((c) => c.code === country);
  const isRestricted = selectedCountryObj?.restricted || false;

  const railData: RailData[] = [
    {
      id: 'Traditional Banking Rail',
      title: 'Traditional Banking Rail',
      icon: <BankIcon />,
      speed: '1-3 days',
      cost: '$25-50',
      compliance: 'High',
      settlementTime: '1-3 business days',
    },
    {
      id: 'Card Network Rail',
      title: 'Card Network Rail',
      icon: <CardIcon />,
      speed: '1-2 hours',
      cost: '1.5-3%',
      compliance: 'Medium',
      settlementTime: '1-2 hours',
    },
    {
      id: 'Blockchain Settlement Rail',
      title: 'Blockchain Settlement Rail',
      icon: <CoinIcon />,
      speed: '2-10 mins',
      cost: '$1-5',
      compliance: 'Low',
      settlementTime: '2-10 minutes',
    },
  ];

  const getSettlementTimeline = (rail: string) => {
    if (rail === 'Traditional Banking Rail') {
      return [
        { stage: 'Initiated', duration: '0m' },
        { stage: 'Bank Processing', duration: '1-2h' },
        { stage: 'Correspondent Bank', duration: '1-2d' },
        { stage: 'Settlement', duration: '1-3d' },
      ];
    } else if (rail === 'Card Network Rail') {
      return [
        { stage: 'Authorization', duration: '0-30s' },
        { stage: 'Clearing', duration: '30m-2h' },
        { stage: 'Settlement', duration: '1-2d' },
      ];
    } else {
      return [
        { stage: 'Transaction Broadcast', duration: '0-5s' },
        { stage: 'Network Confirmation', duration: '5s-2m' },
        { stage: 'Settlement', duration: '2-10m' },
      ];
    }
  };

  const calculateMetrics = (rail: string, amt: number) => {
    if (rail === 'Traditional Banking Rail') {
      const cost = Math.round(35 + amt * 0.0005);
      return { cost: `$${cost}`, range: `$${Math.round(cost * 0.8)}-$${Math.round(cost * 1.2)}` };
    } else if (rail === 'Card Network Rail') {
      const cost = Math.round(amt * 0.025);
      return { cost: `$${cost}`, range: `$${Math.round(cost * 0.8)}-$${Math.round(cost * 1.2)}` };
    } else {
      const cost = Math.round(3 + amt * 0.0001);
      return { cost: `$${cost}`, range: `$1-$5` };
    }
  };

  const calculateRiskScores = (urgencyVal: string, complianceVal: string, amt: number, isRestricted: boolean) => {
    let complianceRisk = complianceVal === 'High' ? 2 : complianceVal === 'Medium' ? 5 : 8;
    let settlementRisk = urgencyVal === 'High' ? 8 : urgencyVal === 'Medium' ? 5 : 2;
    let operationalRisk = amt > 100000 ? 6 : amt > 10000 ? 4 : 2;

    if (isRestricted) {
      complianceRisk = 2;
      operationalRisk += 3;
    }

    const overall = Math.round((complianceRisk + settlementRisk + operationalRisk) / 3);
    return { complianceRisk, settlementRisk, operationalRisk, overall };
  };

  const getComplianceScreening = (isRestricted: boolean, compliance: string) => {
    if (isRestricted) {
      return {
        sanctionsCheck: 'Elevated',
        amlRisk: 'High',
        jurisdictionRestrictions: 'Present',
        screeningResult: 'Compliance Review Required'
      };
    }

    let amlRisk = 'Low';
    if (compliance === 'High') amlRisk = 'Moderate';

    return {
      sanctionsCheck: 'Passed',
      amlRisk,
      jurisdictionRestrictions: 'None',
      screeningResult: 'Cleared for routing'
    };
  };

  const getPolicyConstraints = (amt: number, compliance: string, countryCode: string) => {
    const maxThreshold = '$50,000';
    let highComplianceRule = 'Bank Rails Only';
    let treasuryPreference = 'Bank / Card';
    let preferredRailPolicy = 'Use safest available rail for regulated corridors';

    if (compliance === 'Low') {
      highComplianceRule = 'All rails available';
      treasuryPreference = 'Lowest cost';
      preferredRailPolicy = 'Optimize for speed and cost';
    } else if (compliance === 'Medium') {
      highComplianceRule = 'Blockchain Settlement Rail allowed under $50K';
      treasuryPreference = 'Balanced';
      preferredRailPolicy = 'Balance compliance with efficiency';
    }

    if (amt > 100000) {
      treasuryPreference = 'Traditional Banking Rail preferred';
    }

    return {
      maxBlockchainSettlementRailThreshold: maxThreshold,
      highComplianceRule,
      treasuryPreference,
      preferredRailPolicy
    };
  };

  const getSettlementProbability = (compliance: string, amt: number, countryCode: string, recommended: string) => {
    let bankWire = 99;
    let cardNetwork = 95;
    let stablecoin = 97;

    if (compliance === 'High') {
      bankWire = 99;
      stablecoin = 92;
    }

    if (amt > 100000) {
      bankWire = 99;
      cardNetwork = 93;
      stablecoin = 95;
    }

    if (countryCode === 'NG' || countryCode === 'PH') {
      stablecoin = 98;
      cardNetwork = 92;
    }

    if (countryCode === 'JP' || countryCode === 'DE') {
      bankWire = 99;
      cardNetwork = 97;
    }

    return { bankWire, cardNetwork, stablecoin };
  };

  const getMarketSignals = (amt: number, urgency: string, countryCode: string) => {
    let networkCongestion = 'Low';
    let fxVolatility = 'Low';
    let liquidityTrend = 'Stable';
    let corridorDemand = 'Moderate';
    let settlementConditions = 'Favorable';

    if (amt > 100000) {
      networkCongestion = 'Moderate';
      liquidityTrend = 'High capacity';
    }

    if (urgency === 'High') {
      corridorDemand = 'High';
    }

    if (countryCode === 'NG' || countryCode === 'PH' || countryCode === 'IN') {
      corridorDemand = 'Very High';
      fxVolatility = 'Moderate';
    }

    if (countryCode === 'RU' || countryCode === 'IR' || countryCode === 'KP') {
      fxVolatility = 'High';
      settlementConditions = 'Challenging';
      networkCongestion = 'Restricted';
    }

    return { networkCongestion, fxVolatility, liquidityTrend, corridorDemand, settlementConditions };
  };

  const getLiquidityStatus = (amt: number, recommended: string) => {
    let pool = '$18M';
    let congestion = 'Low';
    let gasFee = '$0.25';
    let capacity = 'High';
    let treasuryImpact = 'Minimal';

    if (amt > 500000) {
      pool = '$52M';
      capacity = 'Very High';
      treasuryImpact = 'Moderate';
      gasFee = '$0.45';
    } else if (amt > 100000) {
      pool = '$35M';
      capacity = 'High';
      gasFee = '$0.35';
    } else if (amt < 1000) {
      pool = '$8M';
      congestion = 'Very Low';
      gasFee = '$0.15';
    }

    if (recommended === 'Blockchain Settlement Rail') {
      congestion = amt > 100000 ? 'Moderate' : 'Low';
    }

    return { pool, congestion, gasFee, capacity, treasuryImpact };
  };

  const getFxImpact = (amt: number) => {
    const bankWireSpread = 2.1;
    const cardNetworkSpread = 1.6;
    const stablecoinSpread = 0.3;

    return {
      bankWire: {
        spread: `${bankWireSpread}%`,
        cost: `$${Math.round(amt * (bankWireSpread / 100))}`
      },
      cardNetwork: {
        spread: `${cardNetworkSpread}%`,
        cost: `$${Math.round(amt * (cardNetworkSpread / 100))}`
      },
      stablecoin: {
        spread: `${stablecoinSpread}%`,
        cost: `$${Math.round(amt * (stablecoinSpread / 100))}`
      },
    };
  };

  const getDecisionScorecard = (recommended: string, urgency: string, compliance: string, amt: number, countryCode: string, routingMode: string, clientProfile: string, preferred: string) => {
    let bankWireScore = 55;
    let cardNetworkScore = 60;
    let stablecoinScore = 70;

    // Rule 1: Interconnection between Urgency, Compliance Sensitivity, and Preferred Outcome

    // High Urgency + Low Compliance: favor Blockchain Settlement Rail or Card Network Rail
    if (urgency === 'High' && compliance === 'Low') {
      stablecoinScore += 20;
      cardNetworkScore += 12;
      bankWireScore -= 10;
    }

    // High Urgency + High Compliance: favor Card Network Rail or Traditional Banking Rail
    if (urgency === 'High' && compliance === 'High') {
      cardNetworkScore += 18;
      bankWireScore += 15;
      stablecoinScore -= 18;
    }

    // Low Urgency + High Compliance: favor Traditional Banking Rail
    if (urgency === 'Low' && compliance === 'High') {
      bankWireScore += 25;
      cardNetworkScore += 8;
      stablecoinScore -= 20;
    }

    // Medium Urgency + Lowest Cost preference: favor Blockchain Settlement Rail
    if (urgency === 'Medium' && preferred === 'Cheapest') {
      stablecoinScore += 18;
      cardNetworkScore += 5;
      bankWireScore -= 5;
    }

    // Rule 2: Client Profile influence (default bias)

    // Marketplace Platform: bias toward Speed Optimized
    if (clientProfile === 'Marketplace Platform') {
      stablecoinScore += 12;
      cardNetworkScore += 8;
      bankWireScore -= 8;
    }

    // Enterprise Treasury: bias toward Compliance or Cost Optimized
    if (clientProfile === 'Corporate AP / Treasury' || clientProfile === 'Bank Treasury') {
      bankWireScore += 15;
      cardNetworkScore += 5;
      stablecoinScore -= 10;
    }

    // Remittance Platform: bias toward speed and low cost
    if (clientProfile === 'Remittance Provider') {
      stablecoinScore += 15;
      cardNetworkScore += 6;
      bankWireScore -= 12;
    }

    // Payment Processor: bias toward Balanced AI Mode
    if (clientProfile === 'Payment Processor') {
      cardNetworkScore += 10;
      stablecoinScore += 5;
      bankWireScore += 5;
    }

    // Rule 3: Routing Mode precedence (primary business override)

    // Cost Optimized mode
    if (routingMode === 'Cost Optimized') {
      stablecoinScore += 22;
      cardNetworkScore -= 5;
      bankWireScore -= 12;
    }

    // Speed Optimized mode
    if (routingMode === 'Speed Optimized') {
      stablecoinScore += 20;
      cardNetworkScore += 10;
      bankWireScore -= 15;
    }

    // Compliance Optimized mode
    if (routingMode === 'Compliance Optimized') {
      bankWireScore += 28;
      cardNetworkScore += 8;
      stablecoinScore -= 22;
    }

    // Additional contextual adjustments

    // High compliance sensitivity
    if (compliance === 'High') {
      bankWireScore += 12;
      cardNetworkScore += 5;
      stablecoinScore -= 8;
    }

    // Medium compliance
    if (compliance === 'Medium') {
      cardNetworkScore += 8;
      stablecoinScore += 3;
    }

    // High urgency baseline
    if (urgency === 'High') {
      stablecoinScore += 10;
      cardNetworkScore += 8;
      bankWireScore -= 8;
    }

    // Low urgency baseline
    if (urgency === 'Low') {
      bankWireScore += 8;
      stablecoinScore -= 5;
    }

    // Large transaction amounts favor Traditional Banking Rail
    if (amt > 100000) {
      bankWireScore += 12;
      cardNetworkScore += 3;
      stablecoinScore -= 8;
    }

    // Small amounts favor Blockchain Settlement Rail
    if (amt < 5000) {
      stablecoinScore += 10;
      cardNetworkScore += 3;
    }

    // Preferred outcome adjustments
    if (preferred === 'Safest') {
      bankWireScore += 15;
      cardNetworkScore += 5;
      stablecoinScore -= 10;
    }

    if (preferred === 'Cheapest') {
      stablecoinScore += 12;
      bankWireScore -= 8;
    }

    // High-demand corridors favor Blockchain Settlement Rail
    if (countryCode === 'PH' || countryCode === 'NG' || countryCode === 'IN' || countryCode === 'MX') {
      stablecoinScore += 12;
      cardNetworkScore += 3;
    }

    return {
      bankWire: Math.min(100, Math.max(0, bankWireScore)),
      cardNetwork: Math.min(100, Math.max(0, cardNetworkScore)),
      stablecoin: Math.min(100, Math.max(0, stablecoinScore)),
    };
  };

  const getWeightContributions = (
    routingMode: string,
    preferred: string,
    clientProfile: string,
    urgency: string,
    compliance: string,
    amt: number,
    countryCode: string,
    recommended: string
  ) => {
    let speed = 15;
    let costEfficiency = 15;
    let complianceWeight = 15;
    let liquidity = 10;
    let corridorFit = 10;
    let fxEfficiency = 10;

    if (routingMode === 'Speed Optimized') {
      speed += 25;
      costEfficiency -= 5;
      complianceWeight -= 5;
      liquidity += 5;
    } else if (routingMode === 'Cost Optimized') {
      costEfficiency += 25;
      fxEfficiency += 15;
      speed -= 5;
      complianceWeight -= 10;
    } else if (routingMode === 'Compliance Optimized') {
      complianceWeight += 30;
      speed -= 10;
      costEfficiency -= 10;
      liquidity += 5;
    }

    if (urgency === 'High') {
      speed += 15;
      liquidity += 5;
      costEfficiency -= 5;
      complianceWeight -= 5;
    } else if (urgency === 'Low') {
      speed -= 10;
      complianceWeight += 10;
      costEfficiency += 5;
    }

    if (compliance === 'High') {
      complianceWeight += 20;
      speed -= 5;
      fxEfficiency -= 5;
      costEfficiency -= 5;
    } else if (compliance === 'Low') {
      complianceWeight -= 10;
      speed += 10;
      costEfficiency += 10;
      fxEfficiency += 5;
    }

    if (preferred === 'Cheapest') {
      costEfficiency += 15;
      fxEfficiency += 10;
      speed -= 5;
      complianceWeight -= 5;
    } else if (preferred === 'Safest') {
      complianceWeight += 15;
      costEfficiency -= 5;
      speed -= 5;
    } else if (preferred === 'Fastest') {
      speed += 15;
      liquidity += 5;
      costEfficiency -= 5;
    }

    if (clientProfile === 'Marketplace Platform') {
      speed += 10;
      costEfficiency += 5;
      complianceWeight -= 5;
    } else if (clientProfile === 'Corporate AP / Treasury' || clientProfile === 'Bank Treasury') {
      complianceWeight += 15;
      speed -= 5;
      costEfficiency -= 5;
    } else if (clientProfile === 'Remittance Provider') {
      speed += 10;
      costEfficiency += 10;
      fxEfficiency += 5;
      complianceWeight -= 10;
    } else if (clientProfile === 'Payment Processor') {
      speed += 5;
      complianceWeight += 5;
    }

    if (amt > 100000) {
      complianceWeight += 10;
      liquidity += 5;
      costEfficiency -= 5;
      speed -= 5;
    } else if (amt < 5000) {
      costEfficiency += 10;
      fxEfficiency += 5;
      complianceWeight -= 5;
    }

    if (countryCode === 'PH' || countryCode === 'NG' || countryCode === 'IN' || countryCode === 'MX') {
      corridorFit += 10;
      fxEfficiency += 5;
      costEfficiency += 5;
    }

    const total = speed + costEfficiency + complianceWeight + liquidity + corridorFit + fxEfficiency;
    speed = Math.round((speed / total) * 100);
    costEfficiency = Math.round((costEfficiency / total) * 100);
    complianceWeight = Math.round((complianceWeight / total) * 100);
    liquidity = Math.round((liquidity / total) * 100);
    corridorFit = Math.round((corridorFit / total) * 100);
    fxEfficiency = 100 - (speed + costEfficiency + complianceWeight + liquidity + corridorFit);

    const weights = [
      { name: 'speed', value: speed },
      { name: 'costEfficiency', value: costEfficiency },
      { name: 'compliance', value: complianceWeight },
      { name: 'liquidity', value: liquidity },
      { name: 'corridorFit', value: corridorFit },
      { name: 'fxEfficiency', value: fxEfficiency },
    ];

    const maxWeight = weights.reduce((max, w) => (w.value > max.value ? w : max), weights[0]);
    let primaryDriver = '';

    if (maxWeight.name === 'speed') {
      primaryDriver = 'settlement speed';
    } else if (maxWeight.name === 'costEfficiency') {
      primaryDriver = 'cost efficiency';
    } else if (maxWeight.name === 'compliance') {
      primaryDriver = 'compliance fit';
    } else if (maxWeight.name === 'liquidity') {
      primaryDriver = 'liquidity availability';
    } else if (maxWeight.name === 'corridorFit') {
      primaryDriver = 'corridor optimization';
    } else {
      primaryDriver = 'FX efficiency';
    }

    return {
      speed,
      costEfficiency,
      compliance: complianceWeight,
      liquidity,
      corridorFit,
      fxEfficiency,
      primaryDriver,
    };
  };

  const getPaymentImpact = (recommended: string, amt: number) => {
    let costSavings = '$32';
    let acceleration = 'Up to 2.5 days faster';
    let efficiency = 'Fewer intermediary layers';
    let bestFit = 'Marketplace payouts or remittances';

    if (recommended === 'Blockchain Settlement Rail') {
      const saving = Math.round(amt * 0.018);
      costSavings = `$${saving} vs Traditional Banking Rail`;
      acceleration = amt > 100000 ? 'Up to 3 days faster' : 'Up to 2.5 days faster';
      efficiency = 'Direct blockchain settlement';
      bestFit = amt < 5000 ? 'Remittances and gig economy' : 'Cross-border B2B payments';
    } else if (recommended === 'Card Network Rail') {
      const saving = Math.round(amt * 0.005);
      costSavings = `$${saving} vs Traditional Banking Rail`;
      acceleration = 'Up to 2 days faster';
      efficiency = 'Established network rails';
      bestFit = 'Consumer purchases and subscriptions';
    } else {
      costSavings = 'Baseline';
      acceleration = 'Standard settlement';
      efficiency = 'Maximum regulatory protection';
      bestFit = 'Large corporate transfers';
    }

    return { costSavings, acceleration, efficiency, bestFit };
  };

  const getNegotiation = (preferred: string, urgency: string, compliance: string, recommended: string) => {
    let payerPref = 'Bank Rail for compliance';
    let recipientPref = 'Blockchain Settlement Rail for speed';
    let outcome = 'Hybrid Route';
    let explanation = 'The AI negotiation layer balances payer compliance requirements with recipient settlement speed preference.';

    if (compliance === 'High') {
      payerPref = 'Traditional Banking Rail for regulatory certainty';
      recipientPref = 'Faster settlement preferred';
      outcome = 'Traditional Banking Rail with expedited processing';
      explanation = 'High compliance requirements override speed preferences. Traditional Banking Rail selected with priority handling.';
    } else if (urgency === 'High' && compliance === 'Low') {
      payerPref = 'Cost optimization';
      recipientPref = 'Immediate settlement';
      outcome = 'Blockchain Settlement Rail Direct';
      explanation = 'Both parties benefit from fast, low-cost stablecoin settlement with minimal friction.';
    } else if (preferred === 'Safest') {
      payerPref = 'Maximum security';
      recipientPref = 'Reliable delivery';
      outcome = 'Traditional Banking Rail';
      explanation = 'Security and reliability prioritized over speed. Traditional banking rails ensure guaranteed delivery.';
    } else {
      outcome = 'Hybrid Route: Bank Transfer → Blockchain Settlement Rail Bridge → Recipient Wallet';
      explanation = 'AI orchestrates a hybrid path: bank compliance on entry, blockchain efficiency for settlement.';
    }

    return { payerPref, recipientPref, outcome, explanation };
  };

  const getCorridorIntelligence = (countryCode: string, amt: number) => {
    const countryName = countries.find((c) => c.code === countryCode)?.name || countryCode;
    const corridorName = `United States → ${countryName}`;

    let efficiency = 'Moderate';
    let friction = 'Standard';
    let stablecoinSuitability = 'Moderate';
    let regulatory = 'Standard KYC/AML';
    let remittanceDemand = 'Moderate';

    if (countryCode === 'PH' || countryCode === 'NG' || countryCode === 'IN') {
      efficiency = 'Low to Moderate';
      friction = 'High correspondent banking friction';
      stablecoinSuitability = 'High - popular for remittances';
      remittanceDemand = 'Very High';
    } else if (countryCode === 'SG' || countryCode === 'HK' || countryCode === 'JP') {
      efficiency = 'High';
      friction = 'Low - well-established corridors';
      stablecoinSuitability = 'Moderate - institutional adoption';
      regulatory = 'Strict - high regulatory oversight';
      remittanceDemand = 'High';
    } else if (countryCode === 'MX' || countryCode === 'BR') {
      remittanceDemand = 'Very High';
      friction = 'Moderate to High';
    }

    return { name: corridorName, efficiency, friction, stablecoinSuitability, regulatory, remittanceDemand };
  };

  const getPaymentTier = (amt: number) => {
    if (amt < 1000) return 'Micro Payment';
    if (amt < 50000) return 'SME / Marketplace Payout';
    if (amt < 250000) return 'Mid-Market Cross-Border Transfer';
    return 'Corporate Treasury Transfer';
  };

  const getCorridorRisk = (countryCode: string, amt: number) => {
    let level = 'Low';
    let correspondentFriction = 'Low';
    let regulatorySensitivity = 'Low';
    let fxVolatility = 'Low';
    let settlementReliability = 'High';

    if (countryCode === 'PH' || countryCode === 'NG' || countryCode === 'IN') {
      level = 'Moderate';
      correspondentFriction = 'Moderate to High';
      fxVolatility = 'Moderate';
      settlementReliability = 'Moderate';
    } else if (countryCode === 'RU' || countryCode === 'IR' || countryCode === 'KP' || countryCode === 'CU') {
      level = 'High';
      correspondentFriction = 'Very High';
      regulatorySensitivity = 'Very High';
      fxVolatility = 'High';
      settlementReliability = 'Low';
    } else if (countryCode === 'MX' || countryCode === 'BR') {
      level = 'Moderate';
      fxVolatility = 'Moderate';
      correspondentFriction = 'Moderate';
    }

    if (amt > 250000) {
      regulatorySensitivity = level === 'Low' ? 'Moderate' : 'High';
    }

    return { level, correspondentFriction, regulatorySensitivity, fxVolatility, settlementReliability };
  };

  const getNetworkStatus = (amt: number, urgency: string, countryCode: string) => {
    let bankWireStatus = 'Normal';
    let cardNetworkStatus = 'Stable';
    let stablecoinStatus = 'Low Congestion';
    let settlementConditions = 'Favorable';

    if (amt > 500000) {
      bankWireStatus = 'High Volume Processing';
      stablecoinStatus = 'Moderate Congestion';
    }

    if (urgency === 'High') {
      cardNetworkStatus = 'Peak Activity';
      settlementConditions = 'High Demand';
    }

    if (countryCode === 'RU' || countryCode === 'IR' || countryCode === 'KP') {
      bankWireStatus = 'Restricted';
      cardNetworkStatus = 'Limited';
      stablecoinStatus = 'Variable';
      settlementConditions = 'Challenging';
    }

    return { bankWireStatus, cardNetworkStatus, stablecoinStatus, settlementConditions };
  };

  const getAlternativeRailAnalysis = (recommended: string, urgency: string, compliance: string, amt: number) => {
    const rails = [
      {
        name: 'Traditional Banking Rail',
        strength: 'High regulatory certainty and full compliance',
        weakness: 'Slow settlement speed (1-3 days)',
        notSelectedReason: ''
      },
      {
        name: 'Card Network Rail',
        strength: 'Broad acceptance and balanced speed',
        weakness: 'Higher cost than stablecoin',
        notSelectedReason: ''
      },
      {
        name: 'Blockchain Settlement Rail',
        strength: 'Fast settlement and low cost',
        weakness: 'Lower regulatory certainty in some corridors',
        notSelectedReason: ''
      }
    ];

    rails.forEach(rail => {
      if (rail.name !== recommended) {
        if (rail.name === 'Traditional Banking Rail') {
          if (recommended === 'Blockchain Settlement Rail') {
            rail.notSelectedReason = urgency === 'High'
              ? 'Too slow for urgent payments - settlement takes 1-3 days vs minutes'
              : 'Higher cost and slower than stablecoin for this scenario';
          } else {
            rail.notSelectedReason = 'Card network offers better speed while maintaining compliance';
          }
        } else if (rail.name === 'Card Network Rail') {
          if (recommended === 'Blockchain Settlement Rail') {
            rail.notSelectedReason = 'Higher fees and less cost efficient than stablecoin';
          } else {
            rail.notSelectedReason = 'Compliance requirements favor bank wire\'s regulatory framework';
          }
        } else {
          if (recommended === 'Traditional Banking Rail') {
            rail.notSelectedReason = compliance === 'High'
              ? 'Compliance requirements mandate bank wire\'s regulatory oversight'
              : 'Not optimal due to regulatory or policy constraints for this amount';
          } else {
            rail.notSelectedReason = 'Card network provides better balance for this payment profile';
          }
        }
      }
    });

    return rails.filter(r => r.name !== recommended);
  };

  const getDecisionWeighting = (routingMode: string, urgency: string, compliance: string, amt: number) => {
    let speed = 60;
    let cost = 50;
    let complianceWeight = 50;
    let liquidity = 40;
    let corridorFit = 55;
    let fxEfficiency = 45;

    if (routingMode === 'Cost Optimized') {
      cost = 95;
      fxEfficiency = 85;
      speed = 40;
      complianceWeight = 35;
    } else if (routingMode === 'Speed Optimized') {
      speed = 95;
      liquidity = 75;
      cost = 30;
      complianceWeight = 40;
    } else if (routingMode === 'Compliance Optimized') {
      complianceWeight = 95;
      corridorFit = 80;
      speed = 35;
      cost = 40;
    } else {
      if (urgency === 'High') speed += 20;
      if (compliance === 'High') complianceWeight += 25;
      if (amt < 5000) cost += 15;
      if (amt > 100000) {
        complianceWeight += 15;
        liquidity += 20;
      }
    }

    return {
      speed: Math.min(100, speed),
      cost: Math.min(100, cost),
      compliance: Math.min(100, complianceWeight),
      liquidity: Math.min(100, liquidity),
      corridorFit: Math.min(100, corridorFit),
      fxEfficiency: Math.min(100, fxEfficiency)
    };
  };

  const getFallbackRouting = (primaryRail: string, compliance: string, urgency: string) => {
    let secondary = '';
    let tertiary = '';
    let trigger = '';

    if (primaryRail === 'Blockchain Settlement Rail') {
      secondary = 'Card Network Rail';
      tertiary = 'Traditional Banking Rail';
      trigger = 'Blockchain Settlement Rail liquidity drop or network congestion';
    } else if (primaryRail === 'Card Network Rail') {
      secondary = 'Traditional Banking Rail';
      tertiary = 'Blockchain Settlement Rail';
      trigger = 'Card authorization failure or higher than expected fees';
    } else {
      secondary = 'Card Network Rail';
      tertiary = 'Blockchain Settlement Rail';
      trigger = 'Compliance hold, delayed bank settlement, or corridor unavailability';
    }

    return { primary: primaryRail, secondary, tertiary, trigger };
  };

  const getLiquidityProviders = (amt: number, recommended: string) => {
    const baseFee = amt < 1000 ? 2.0 : amt < 10000 ? 2.2 : amt < 100000 ? 2.5 : 3.0;

    const providers = [
      {
        name: 'Circle Liquidity Pool',
        quotedFee: `$${(baseFee + 0.4).toFixed(2)}`,
        liquidity: 'High',
        networkSpeed: 'Fast',
        score: amt < 50000 ? 85 : 90
      },
      {
        name: 'Fireblocks Settlement',
        quotedFee: `$${(baseFee - 0.1).toFixed(2)}`,
        liquidity: amt > 100000 ? 'High' : 'Medium',
        networkSpeed: 'Fast',
        score: amt < 50000 ? 92 : 88
      },
      {
        name: 'Paxos Treasury Network',
        quotedFee: `$${(baseFee + 0.6).toFixed(2)}`,
        liquidity: 'High',
        networkSpeed: amt > 100000 ? 'Moderate' : 'Fast',
        score: 82
      }
    ];

    const selectedProvider = providers.reduce((best, current) =>
      current.score > best.score ? current : best
    );

    return { providers, selectedProvider, isBlockchainSettlementRail: recommended === 'Blockchain Settlement Rail' };
  };

  const getPaymentCorridors = (selectedCountry: string) => {
    const corridors = [
      {
        from: 'United States',
        to: 'Philippines',
        recommended: 'Blockchain Settlement Rail',
        color: 'green',
        reason: 'High remittance volume, crypto-friendly regulation'
      },
      {
        from: 'United States',
        to: 'Singapore',
        recommended: 'Blockchain Settlement Rail',
        color: 'green',
        reason: 'Advanced fintech hub, low friction'
      },
      {
        from: 'United States',
        to: 'India',
        recommended: 'Mixed',
        color: 'yellow',
        reason: 'Large market, evolving crypto regulation'
      },
      {
        from: 'United States',
        to: 'Nigeria',
        recommended: 'Blockchain Settlement Rail',
        color: 'green',
        reason: 'High crypto adoption, banking friction'
      },
      {
        from: 'United States',
        to: 'United Kingdom',
        recommended: 'Mixed',
        color: 'yellow',
        reason: 'Strong banking infrastructure, open to digital assets'
      },
      {
        from: 'United States',
        to: 'Germany',
        recommended: 'Traditional Banking Rail',
        color: 'red',
        reason: 'High compliance requirements, conservative regulation'
      },
      {
        from: 'United States',
        to: 'Japan',
        recommended: 'Mixed',
        color: 'yellow',
        reason: 'Regulated crypto market, strong banking'
      }
    ];

    return {
      corridors,
      activeCorridorIndex: corridors.findIndex(c => c.to === selectedCountry)
    };
  };

  const getRailPerformanceData = () => {
    return [
      {
        name: 'Traditional Banking Rail',
        successRate: 99,
        settlementTime: '1–3 days',
        cost: 'High',
        costValue: 85,
        speedValue: 30,
        reliabilityValue: 99,
        color: 'blue'
      },
      {
        name: 'Card Network Rail',
        successRate: 95,
        settlementTime: '1 day',
        cost: 'Medium',
        costValue: 55,
        speedValue: 60,
        reliabilityValue: 95,
        color: 'purple'
      },
      {
        name: 'Blockchain Settlement Rail',
        successRate: 97,
        settlementTime: '2–10 minutes',
        cost: 'Low',
        costValue: 15,
        speedValue: 95,
        reliabilityValue: 97,
        color: 'emerald'
      }
    ];
  };

  const handleScenarioPreset = (scenario: typeof scenarios[0]) => {
    setAmount(scenario.amount);
    setCountry(scenario.country);
    setUrgency(scenario.urgency);
    setCompliance(scenario.compliance);
    setPreferred(scenario.preferred);
    setResult(null);
    setValidationError('');
  };

  const getExecutionSteps = (rail: string) => {
    if (rail === 'Traditional Banking Rail') {
      return [
        'Policy Validation',
        'Compliance Screening',
        'Bank Network Validation',
        'Correspondent Bank Routing',
        'Settlement Initiated',
        'Funds Credited to Beneficiary Bank',
        'Settlement Completed'
      ];
    } else if (rail === 'Card Network Rail') {
      return [
        'Policy Validation',
        'Compliance Screening',
        'Card Authorization',
        'Network Clearing',
        'Issuer Approval',
        'Settlement Initiated',
        'Settlement Completed'
      ];
    } else {
      return [
        'Policy Validation',
        'Compliance Screening',
        'Liquidity Pool Match',
        'Blockchain Transaction Broadcast',
        'Network Confirmation',
        'Wallet Credit',
        'Settlement Completed'
      ];
    }
  };

  const handleExecuteSettlement = () => {
    if (!result) return;

    setIsExecuting(true);
    setExecutionStep(0);

    const steps = getExecutionSteps(result.recommended);
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setExecutionStep(currentStep);

      if (currentStep >= steps.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExecuting(false);
        }, 1500);
      }
    }, 800);
  };

  const handleDecision = () => {
    setValidationError('');

    const amt = parseInt(amount);
    if (!amount || amt <= 0) {
      setValidationError('Amount must be greater than 0');
      return;
    }
    if (!country) {
      setValidationError('Destination country must be selected');
      return;
    }

    let recommended = '';
    let reason = '';

    const countryName = selectedCountryObj?.name || country;

    // Restricted countries override all other logic
    if (isRestricted) {
      recommended = 'Traditional Banking Rail';
      reason = `Transfers to ${countryName} require compliance review and are subject to sanctions screening. Only Traditional Banking Rail is available pending regulatory approval.`;
    }
    // Rule 3: Routing Mode as primary business override
    else if (routingMode === 'Compliance Optimized' || (compliance === 'High' && routingMode !== 'Speed Optimized' && routingMode !== 'Cost Optimized')) {
      recommended = 'Traditional Banking Rail';
      reason = `Compliance optimization mode prioritizes regulatory certainty. Traditional Banking Rail ensures full KYC/AML protocols and audit trails for transfers to ${countryName}.`;
    }
    else if (routingMode === 'Cost Optimized' && compliance === 'Low') {
      recommended = 'Blockchain Settlement Rail';
      reason = `Cost optimization mode prioritizes minimal fees. Blockchain Settlement Rail offers the lowest cost for transfers to ${countryName} with transaction fees under $5 compared to traditional rails.`;
    }
    else if (routingMode === 'Cost Optimized' && compliance === 'Medium') {
      recommended = 'Blockchain Settlement Rail';
      reason = `Cost optimization balances low fees with acceptable compliance standards. Blockchain Settlement Rail delivers optimal cost efficiency for ${countryName} transfers.`;
    }
    else if (routingMode === 'Speed Optimized' && compliance === 'Low') {
      recommended = 'Blockchain Settlement Rail';
      reason = `Speed optimization mode prioritizes fastest settlement. Blockchain Settlement Rail delivers 2-10 minute settlement to ${countryName} via blockchain, significantly faster than traditional rails.`;
    }
    else if (routingMode === 'Speed Optimized' && compliance === 'Medium') {
      recommended = 'Card Network Rail';
      reason = `Speed optimization with moderate compliance needs favors Card Network Rail for ${countryName}, balancing rapid settlement with established regulatory frameworks.`;
    }
    else if (routingMode === 'Speed Optimized' && compliance === 'High') {
      recommended = 'Card Network Rail';
      reason = `Balancing speed requirements with high compliance needs, Card Network Rail provides faster settlement than Traditional Banking Rail while maintaining strong regulatory oversight for ${countryName}.`;
    }
    // Rule 1: Interconnection between Urgency, Compliance, and Preferred Outcome
    else if (urgency === 'High' && compliance === 'Low') {
      recommended = 'Blockchain Settlement Rail';
      reason = `High urgency with low compliance constraints strongly favors Blockchain Settlement Rail for ${countryName}, enabling near-instant settlement with minimal friction and maximum cost efficiency.`;
    }
    else if (urgency === 'High' && compliance === 'High') {
      recommended = 'Card Network Rail';
      reason = `High urgency paired with high compliance needs points to Card Network Rail for ${countryName}, delivering faster settlement than Traditional Banking Rail while maintaining comprehensive regulatory standards.`;
    }
    else if (urgency === 'Low' && compliance === 'High') {
      recommended = 'Traditional Banking Rail';
      reason = `Low urgency with high compliance sensitivity favors Traditional Banking Rail for ${countryName}, prioritizing regulatory certainty and settlement guarantees over speed.`;
    }
    else if (urgency === 'Medium' && preferred === 'Cheapest') {
      recommended = 'Blockchain Settlement Rail';
      reason = `Medium urgency with cost optimization preference favors Blockchain Settlement Rail for ${countryName}, providing excellent cost-efficiency and FX savings while meeting reasonable timing requirements.`;
    }
    // Rule 2: Client Profile influence (default biases)
    else if (clientProfile === 'Marketplace Platform' && compliance !== 'High') {
      recommended = 'Blockchain Settlement Rail';
      reason = `For ${clientProfile.toLowerCase()} operations to ${countryName}, Blockchain Settlement Rail optimizes for high-volume, low-friction payouts with speed-optimized settlement and minimal intermediary costs.`;
    }
    else if ((clientProfile === 'Corporate AP / Treasury' || clientProfile === 'Bank Treasury') && compliance !== 'Low') {
      recommended = 'Traditional Banking Rail';
      reason = `For ${clientProfile.toLowerCase()} operations to ${countryName}, Traditional Banking Rail provides the regulatory oversight, settlement guarantees, and audit trails required for corporate treasury management.`;
    }
    else if (clientProfile === 'Remittance Provider' && compliance === 'Low') {
      recommended = 'Blockchain Settlement Rail';
      reason = `For ${clientProfile.toLowerCase()} operations to ${countryName}, Blockchain Settlement Rail delivers both speed and low-cost optimization, ideal for high-volume remittance corridors.`;
    }
    else if (clientProfile === 'Remittance Provider' && urgency === 'High') {
      recommended = 'Blockchain Settlement Rail';
      reason = `For ${clientProfile.toLowerCase()} operations requiring rapid settlement to ${countryName}, Blockchain Settlement Rail provides optimal speed and cost efficiency.`;
    }
    else if (clientProfile === 'Payment Processor') {
      recommended = 'Card Network Rail';
      reason = `For ${clientProfile.toLowerCase()} operations to ${countryName}, Card Network Rail provides balanced AI mode, offering optimal trade-offs between speed, cost, and compliance frameworks.`;
    }
    // Additional context-driven logic
    else if (compliance === 'High') {
      recommended = 'Traditional Banking Rail';
      reason = `High compliance sensitivity requires Traditional Banking Rail's strict regulatory adherence, full KYC/AML protocols, and comprehensive audit trails for transfers to ${countryName}.`;
    }
    else if (preferred === 'Safest') {
      recommended = 'Traditional Banking Rail';
      reason = `Safety-first preference selects Traditional Banking Rail for maximum security and consumer protection guarantees when transferring to ${countryName}, with full reversibility and regulatory oversight.`;
    }
    else if (preferred === 'Cheapest' && compliance === 'Low') {
      recommended = 'Blockchain Settlement Rail';
      reason = `Cost-optimized preference with low compliance constraints strongly favors Blockchain Settlement Rail for ${countryName}, minimizing fees while enabling rapid settlement.`;
    }
    else if (urgency === 'High' && compliance === 'Medium') {
      recommended = 'Card Network Rail';
      reason = `High urgency with medium compliance needs favors Card Network Rail for ${countryName}, balancing speed requirements with established regulatory acceptance.`;
    }
    else if (urgency === 'High') {
      recommended = 'Card Network Rail';
      reason = `High urgency for ${countryName} transfers favors Card Network Rail, providing faster settlement than Traditional Banking Rail with broad regulatory acceptance.`;
    }
    else if (amt < 5000 && compliance === 'Low') {
      recommended = 'Blockchain Settlement Rail';
      reason = `For smaller transfers to ${countryName} with flexible compliance requirements, Blockchain Settlement Rail maximizes cost efficiency and settlement speed.`;
    }
    else {
      recommended = 'Card Network Rail';
      reason = `Card Network Rail offers the optimal balance of speed, cost, and compliance for your transfer to ${countryName} with current parameters.`;
    }

    const metrics = calculateMetrics(recommended, amt);
    const riskScores = calculateRiskScores(urgency, compliance, amt, isRestricted);
    const corridorIntel = getCorridorIntelligence(country, amt);

    let confidenceScore = 85;
    if (isRestricted) confidenceScore = 95;
    else if (compliance === 'High') confidenceScore = 92;
    else if (urgency === 'High' && compliance === 'Low') confidenceScore = 88;
    else if (preferred === 'Safest') confidenceScore = 90;
    else if (preferred === 'Cheapest') confidenceScore = 86;

    const complianceFit = compliance === 'High' ? 'High' : compliance === 'Medium' ? 'Medium' : 'Low';

    const decisionExplanation = `This payment favors ${recommended} because the transaction value is ${amt > 50000 ? 'substantial' : amt > 10000 ? 'moderate' : 'relatively low'}, urgency is ${urgency.toLowerCase()}, and compliance sensitivity is ${compliance.toLowerCase()}. In this corridor, ${recommended === 'Blockchain Settlement Rail' ? 'stablecoin settlement offers faster execution and lower intermediary cost compared with traditional rails' : recommended === 'Traditional Banking Rail' ? 'bank wire provides the regulatory oversight and security guarantees needed for this transfer' : 'card network offers a balanced approach with reasonable speed and compliance frameworks'}.`;

    const liquidityStatus = getLiquidityStatus(amt, recommended);
    const fxImpact = getFxImpact(amt);
    const decisionScorecard = getDecisionScorecard(recommended, urgency, compliance, amt, country, routingMode, clientProfile, preferred);
    const paymentImpact = getPaymentImpact(recommended, amt);
    const negotiation = getNegotiation(preferred, urgency, compliance, recommended);
    const complianceScreening = getComplianceScreening(isRestricted, compliance);
    const policyConstraints = getPolicyConstraints(amt, compliance, country);
    const settlementProbability = getSettlementProbability(compliance, amt, country, recommended);
    const marketSignals = getMarketSignals(amt, urgency, country);
    const weightContributions = getWeightContributions(routingMode, preferred, clientProfile, urgency, compliance, amt, country, recommended);

    setResult({
      recommended,
      reason,
      estimatedSpeed: recommended === 'Traditional Banking Rail' ? '1-3 days' : recommended === 'Card Network Rail' ? '1-2 hours' : '2-10 mins',
      estimatedCost: metrics.cost,
      estimatedCostRange: metrics.range,
      confidenceScore,
      complianceFit,
      decisionExplanation,
      decisionFactors: {
        amount: `$${amt.toLocaleString()}`,
        corridor: corridorIntel.name,
        urgency,
        compliance,
        preferred,
      },
      steps: [
        'Payment intent analyzed',
        'Compliance risk evaluated',
        'Payment rails compared',
        'Optimal route selected',
      ],
      timeline: getSettlementTimeline(recommended),
      riskScores,
      corridorIntelligence: corridorIntel,
      liquidityStatus,
      fxImpact,
      decisionScorecard,
      paymentImpact,
      negotiation,
      complianceScreening,
      policyConstraints,
      settlementProbability,
      marketSignals,
      weightContributions,
    });

    setExecutionStep(0);
    setIsExecuting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-8 font-sans flex flex-col">
      <div className="flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">
              AI Route Advisor
            </h1>
            <p className="text-lg text-slate-400">
              Intelligent payment rail recommendation for cross-border transfers
            </p>
          </div>

          {/* Scenario Presets */}
          <div className="mb-6 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-4">
            <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Quick Scenarios</p>
            <div className="flex flex-wrap gap-2">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.name}
                  onClick={() => handleScenarioPreset(scenario)}
                  className="text-xs px-3 py-1.5 rounded-lg bg-slate-700/50 hover:bg-slate-600 text-slate-300 hover:text-white transition-colors border border-slate-600/50"
                >
                  {scenario.name}
                </button>
              ))}
            </div>
          </div>

          {/* Sanctions Alert */}
          {isRestricted && (
            <div className="mb-6 bg-red-900/40 border border-red-500/60 rounded-2xl p-4 flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-300 mb-1">Compliance Alert</h3>
                <p className="text-red-200 text-sm">
                  This destination may require sanctions screening or regulatory approval.
                </p>
              </div>
            </div>
          )}

          {/* Validation Error */}
          {validationError && (
            <div className="mb-6 bg-amber-900/40 border border-amber-500/60 rounded-2xl p-4 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-amber-200 text-sm">{validationError}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Payment Request Panel */}
            <div className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 h-fit">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-500/20 p-2 rounded-lg">
                  <DollarSign className="w-6 h-6 text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white">Payment Request</h2>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-semibold text-slate-300">Amount (USD)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-500 font-semibold">$</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => {
                        setAmount(e.target.value);
                        setResult(null);
                        setValidationError('');
                      }}
                      className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-slate-600 bg-slate-800 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <CountryDropdown
                  value={country}
                  onChange={(val) => {
                    setCountry(val);
                    setResult(null);
                    setValidationError('');
                  }}
                  isRestricted={isRestricted}
                />

                <div className="pt-2">
                  <Select
                    label="Urgency"
                    options={['Low', 'Medium', 'High']}
                    value={urgency}
                    onChange={(val) => {
                      setUrgency(val);
                      setResult(null);
                    }}
                  />
                </div>

                <div>
                  <Select
                    label="Compliance Sensitivity"
                    options={['Low', 'Medium', 'High']}
                    value={compliance}
                    onChange={(val) => {
                      setCompliance(val);
                      setResult(null);
                    }}
                  />
                </div>

                <div>
                  <Select
                    label="Preferred Outcome"
                    options={['Fastest', 'Cheapest', 'Safest']}
                    value={preferred}
                    onChange={(val) => {
                      setPreferred(val);
                      setResult(null);
                    }}
                  />
                </div>

                <div className="border-t border-slate-600 pt-4 mt-4">
                  <p className="text-xs font-semibold text-slate-400 uppercase mb-3">Control Tower Settings</p>

                  <div className="mb-4">
                    <Select
                      label="Routing Mode"
                      options={['Balanced AI Mode', 'Cost Optimized', 'Speed Optimized', 'Compliance Optimized']}
                      value={routingMode}
                      onChange={(val) => {
                        setRoutingMode(val);
                        setResult(null);
                      }}
                    />
                  </div>

                  <div>
                    <Select
                      label="Client Profile"
                      options={['Remittance Provider', 'Marketplace Platform', 'E-Commerce Merchant', 'Bank Treasury', 'Corporate AP / Treasury']}
                      value={clientProfile}
                      onChange={(val) => {
                        setClientProfile(val);
                        setResult(null);
                      }}
                    />
                  </div>
                </div>

                <button
                  onClick={handleDecision}
                  className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg hover:shadow-blue-500/50 active:scale-[0.98]"
                >
                  Run AI Decision
                </button>
              </div>
            </div>

            {/* Payment Rail Comparison */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  Payment Rail Comparison
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {railData.map((rail) => {
                    const isRecommended = result?.recommended === rail.id;
                    const isFaded = result && !isRecommended;
                    const isDisabled = isRestricted && (rail.id === 'Blockchain Settlement Rail' || rail.id === 'Card Network Rail');
                    const metrics = calculateMetrics(rail.id, parseInt(amount) || 0);

                    return (
                      <div
                        key={rail.id}
                        className={`relative rounded-2xl border transition-all duration-300 ${
                          isDisabled
                            ? 'border-slate-700 bg-slate-900/50 opacity-50 cursor-not-allowed'
                            : isRecommended
                              ? 'border-blue-400 bg-blue-500/20 shadow-lg shadow-blue-500/20 transform scale-105'
                              : isFaded
                                ? 'border-slate-600 bg-slate-800/30 opacity-40'
                                : 'border-slate-600 bg-white/10 hover:border-slate-500'
                        }`}
                      >
                        {isRecommended && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                              AI RECOMMENDED
                            </span>
                          </div>
                        )}

                        {isDisabled && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                              UNAVAILABLE
                            </span>
                          </div>
                        )}

                        <div className="p-6 pt-8">
                          <div
                            className={`mb-4 ${
                              isDisabled
                                ? 'text-slate-500'
                                : isRecommended
                                  ? 'text-blue-300'
                                  : 'text-slate-400'
                            }`}
                          >
                            {rail.icon}
                          </div>

                          <h3
                            className={`font-bold text-lg mb-4 ${
                              isDisabled
                                ? 'text-slate-500'
                                : isRecommended
                                  ? 'text-blue-100'
                                  : 'text-slate-200'
                            }`}
                          >
                            {rail.title}
                          </h3>

                          <div className="space-y-3">
                            <div>
                              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                                Speed
                              </p>
                              <p
                                className={`font-semibold ${
                                  isDisabled
                                    ? 'text-slate-500'
                                    : isRecommended
                                      ? 'text-blue-200'
                                      : 'text-slate-300'
                                }`}
                              >
                                {rail.speed}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                                Cost
                              </p>
                              <p
                                className={`font-semibold ${
                                  isDisabled
                                    ? 'text-slate-500'
                                    : isRecommended
                                      ? 'text-blue-200'
                                      : 'text-slate-300'
                                }`}
                              >
                                {metrics.range}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                                Compliance
                              </p>
                              <p
                                className={`font-semibold ${
                                  isDisabled
                                    ? 'text-slate-500'
                                    : isRecommended
                                      ? 'text-blue-200'
                                      : 'text-slate-300'
                                }`}
                              >
                                {rail.compliance}
                              </p>
                            </div>

                            <div>
                              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1">
                                Settlement Time
                              </p>
                              <p
                                className={`font-semibold ${
                                  isDisabled
                                    ? 'text-slate-500'
                                    : isRecommended
                                      ? 'text-blue-200'
                                      : 'text-slate-300'
                                }`}
                              >
                                {rail.settlementTime}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Recommendation Panel */}
              {result && (
                <div className="space-y-6">
                  {/* Tab Navigation */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {[
                      { id: 'overview', label: 'Overview', icon: Globe },
                      { id: 'decision', label: 'AI Decision', icon: Zap },
                      { id: 'intelligence', label: 'Intelligence', icon: Activity },
                      { id: 'infrastructure', label: 'Infrastructure', icon: Activity },
                      { id: 'simulation', label: 'Simulation', icon: TrendingDown }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                          activeTab === tab.id
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
                            : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-300'
                        }`}
                      >
                        <tab.icon className="w-4 h-4" />
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <>
                      {/* Sub-Tab Navigation */}
                      <div className="flex gap-2 overflow-x-auto pb-2">
                        {[
                          { id: 'summary', label: 'Summary' },
                          { id: 'recommendation', label: 'Recommendation' },
                          { id: 'decision', label: 'Decision Logic' },
                          { id: 'compliance', label: 'Compliance' },
                          { id: 'policy', label: 'Policy' },
                          { id: 'performance', label: 'Performance' }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setOverviewSubTab(tab.id)}
                            className={`px-5 py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm ${
                              overviewSubTab === tab.id
                                ? 'bg-violet-500/30 text-violet-200 border border-violet-400/50'
                                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-300'
                            }`}
                          >
                            {tab.label}
                          </button>
                        ))}
                      </div>

                      {/* Summary Sub-Tab */}
                      {overviewSubTab === 'summary' && (
                        <>
                  {/* AI RECOMMENDATION SUMMARY */}
                  <div className="bg-gradient-to-br from-violet-500/20 via-violet-500/10 to-violet-600/20 border border-violet-400/40 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <Globe className="w-6 h-6 text-violet-300" />
                      <h2 className="text-xl font-bold text-violet-100 uppercase tracking-wider">
                        AI Recommendation Summary
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-violet-400/30">
                        <p className="text-xs font-semibold text-violet-300 uppercase mb-1">
                          Recommended Rail
                        </p>
                        <p className="text-2xl font-bold text-violet-100">
                          {result.recommended}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-violet-400/30">
                        <p className="text-xs font-semibold text-violet-300 uppercase mb-1">
                          AI Confidence Score
                        </p>
                        <p className="text-2xl font-bold text-violet-100">
                          {result.confidenceScore}%
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-violet-400/30">
                        <p className="text-xs font-semibold text-violet-300 uppercase mb-1">
                          Estimated Settlement Time
                        </p>
                        <p className="text-xl font-bold text-violet-100">
                          {result.estimatedSpeed}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-violet-400/30">
                        <p className="text-xs font-semibold text-violet-300 uppercase mb-1">
                          Estimated Cost Range
                        </p>
                        <p className="text-xl font-bold text-violet-100">
                          {result.estimatedCostRange}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-violet-400/30">
                        <p className="text-xs font-semibold text-violet-300 uppercase mb-1">
                          Compliance Fit
                        </p>
                        <p className="text-xl font-bold text-violet-100">
                          {result.complianceFit}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-violet-400/30">
                        <p className="text-xs font-semibold text-violet-300 uppercase mb-1">
                          FX Impact
                        </p>
                        <p className="text-xl font-bold text-violet-100">
                          {result.recommended === 'Blockchain Settlement Rail' ? 'Low' : result.recommended === 'Card Network Rail' ? 'Medium' : 'High'}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 bg-white/5 rounded-lg p-4 border border-violet-400/20">
                      <p className="text-xs font-semibold text-violet-300 uppercase mb-2">
                        Reason for Recommendation
                      </p>
                      <p className="text-sm text-violet-200 leading-relaxed">
                        {result.reason}
                      </p>
                    </div>
                  </div>
                        </>
                      )}

                      {/* Decision Sub-Tab */}
                      {overviewSubTab === 'decision' && (
                        <>
                  {/* AI DECISION EXPLANATION */}
                  <div className="bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-cyan-600/20 border border-cyan-400/40 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingDown className="w-6 h-6 text-cyan-300" />
                      <h2 className="text-xl font-bold text-cyan-100 uppercase tracking-wider">
                        AI Decision Explanation
                      </h2>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-cyan-300 font-semibold mb-3">Decision Drivers:</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white/5 rounded-lg p-3 border border-cyan-400/20">
                          <p className="text-xs text-cyan-400 mb-1">Transaction Amount</p>
                          <p className="text-sm font-bold text-cyan-200">{result.decisionFactors.amount}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-cyan-400/20">
                          <p className="text-xs text-cyan-400 mb-1">Destination Corridor</p>
                          <p className="text-sm font-bold text-cyan-200">{result.decisionFactors.corridor}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-cyan-400/20">
                          <p className="text-xs text-cyan-400 mb-1">Urgency Level</p>
                          <p className="text-sm font-bold text-cyan-200">{result.decisionFactors.urgency}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-cyan-400/20">
                          <p className="text-xs text-cyan-400 mb-1">Compliance Sensitivity</p>
                          <p className="text-sm font-bold text-cyan-200">{result.decisionFactors.compliance}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 border border-cyan-400/20 col-span-2">
                          <p className="text-xs text-cyan-400 mb-1">Preferred Outcome</p>
                          <p className="text-sm font-bold text-cyan-200">{result.decisionFactors.preferred}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 rounded-lg p-4 border border-cyan-400/20">
                      <p className="text-sm text-cyan-200 leading-relaxed mb-3">
                        {result.decisionExplanation}
                      </p>
                      <div className="flex items-center gap-2 pt-3 border-t border-cyan-400/20">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <p className="text-xs font-semibold text-cyan-300">
                          AI Confidence Score: {result.confidenceScore}%
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 bg-white/5 rounded-lg p-4 border border-cyan-400/20">
                      <p className="text-sm text-cyan-300 font-semibold mb-3">Decision Weight Contributions:</p>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-cyan-200">Speed</span>
                            <span className="text-xs font-bold text-cyan-100">{result.weightContributions.speed}%</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                              style={{ width: `${result.weightContributions.speed}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-cyan-200">Cost Efficiency</span>
                            <span className="text-xs font-bold text-cyan-100">{result.weightContributions.costEfficiency}%</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-500"
                              style={{ width: `${result.weightContributions.costEfficiency}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-cyan-200">Compliance</span>
                            <span className="text-xs font-bold text-cyan-100">{result.weightContributions.compliance}%</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500"
                              style={{ width: `${result.weightContributions.compliance}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-cyan-200">Liquidity</span>
                            <span className="text-xs font-bold text-cyan-100">{result.weightContributions.liquidity}%</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500"
                              style={{ width: `${result.weightContributions.liquidity}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-cyan-200">Corridor Fit</span>
                            <span className="text-xs font-bold text-cyan-100">{result.weightContributions.corridorFit}%</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-pink-500 to-pink-400 rounded-full transition-all duration-500"
                              style={{ width: `${result.weightContributions.corridorFit}%` }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-cyan-200">FX Efficiency</span>
                            <span className="text-xs font-bold text-cyan-100">{result.weightContributions.fxEfficiency}%</span>
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-teal-500 to-teal-400 rounded-full transition-all duration-500"
                              style={{ width: `${result.weightContributions.fxEfficiency}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-cyan-400/20">
                        <p className="text-xs text-cyan-300 leading-relaxed">
                          The AI recommendation is primarily driven by <span className="font-bold text-cyan-100">{result.weightContributions.primaryDriver}</span> for this scenario.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* AI Decision Process */}
                  <div className="bg-gradient-to-br from-slate-500/20 via-slate-500/10 to-slate-600/20 border border-slate-400/40 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      AI Decision Process
                    </h3>
                    <div className="space-y-2">
                      {result.steps.map((step, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          <span className="text-slate-200">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                        </>
                      )}

                      {/* Compliance Sub-Tab */}
                      {overviewSubTab === 'compliance' && (
                        <>
                  {/* COMPLIANCE SCREENING LAYER */}
                  <div className="bg-gradient-to-br from-red-500/20 via-orange-500/10 to-red-600/20 border border-red-400/40 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-red-300" />
                      <h2 className="text-xl font-bold text-red-100 uppercase tracking-wider">
                        Compliance Screening
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-red-400/30">
                        <p className="text-xs font-semibold text-red-300 uppercase mb-2">
                          Sanctions List Check
                        </p>
                        <p className={`text-lg font-bold ${result.complianceScreening.sanctionsCheck === 'Passed' ? 'text-emerald-300' : 'text-red-300'}`}>
                          {result.complianceScreening.sanctionsCheck}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-red-400/30">
                        <p className="text-xs font-semibold text-red-300 uppercase mb-2">
                          AML Risk Level
                        </p>
                        <p className={`text-lg font-bold ${result.complianceScreening.amlRisk === 'Low' ? 'text-emerald-300' : result.complianceScreening.amlRisk === 'Moderate' ? 'text-amber-300' : 'text-red-300'}`}>
                          {result.complianceScreening.amlRisk}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-red-400/30">
                        <p className="text-xs font-semibold text-red-300 uppercase mb-2">
                          Jurisdiction Restrictions
                        </p>
                        <p className={`text-lg font-bold ${result.complianceScreening.jurisdictionRestrictions === 'None' ? 'text-emerald-300' : 'text-red-300'}`}>
                          {result.complianceScreening.jurisdictionRestrictions}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-red-400/30">
                        <p className="text-xs font-semibold text-red-300 uppercase mb-2">
                          Screening Result
                        </p>
                        <p className={`text-lg font-bold ${result.complianceScreening.screeningResult === 'Cleared for routing' ? 'text-emerald-300' : 'text-amber-300'}`}>
                          {result.complianceScreening.screeningResult}
                        </p>
                      </div>
                    </div>
                  </div>
                        </>
                      )}

                      {/* Policy Sub-Tab */}
                      {overviewSubTab === 'policy' && (
                        <>
                  {/* PAYMENT POLICY ENGINE */}
                  <div className="bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-blue-700/20 border border-blue-400/40 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="w-6 h-6 text-blue-300" />
                      <h2 className="text-xl font-bold text-blue-100 uppercase tracking-wider">
                        Enterprise Policy Constraints
                      </h2>
                    </div>

                    <div className="space-y-3">
                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-blue-400/30">
                        <p className="text-xs font-semibold text-blue-300 uppercase mb-2">
                          Max Blockchain Settlement Rail Threshold
                        </p>
                        <p className="text-lg font-bold text-blue-100">
                          {result.policyConstraints.maxBlockchainSettlementRailThreshold}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-blue-400/30">
                        <p className="text-xs font-semibold text-blue-300 uppercase mb-2">
                          High Compliance Corridors
                        </p>
                        <p className="text-lg font-bold text-blue-100">
                          {result.policyConstraints.highComplianceRule}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-blue-400/30">
                        <p className="text-xs font-semibold text-blue-300 uppercase mb-2">
                          Treasury Liquidity Preference
                        </p>
                        <p className="text-lg font-bold text-blue-100">
                          {result.policyConstraints.treasuryPreference}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-blue-400/30">
                        <p className="text-xs font-semibold text-blue-300 uppercase mb-2">
                          Preferred Rail Policy
                        </p>
                        <p className="text-lg font-bold text-blue-100">
                          {result.policyConstraints.preferredRailPolicy}
                        </p>
                      </div>
                    </div>
                  </div>
                        </>
                      )}

                      {/* Recommendation Sub-Tab */}
                      {overviewSubTab === 'recommendation' && (
                        <>
                  {/* Main Recommendation */}
                  <div className="bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-emerald-600/20 border border-emerald-400/40 rounded-2xl p-6 shadow-lg shadow-emerald-500/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="w-6 h-6 text-emerald-300" />
                      <h2 className="text-lg font-bold text-emerald-100 uppercase tracking-wider">
                        Recommendation
                      </h2>
                    </div>

                    <div className="mb-6">
                      <p className="text-4xl font-extrabold text-emerald-200 mb-2">
                        {result.recommended}
                        {isRestricted && ' / Compliance Review Required'}
                      </p>
                      <p className="text-emerald-300 text-sm leading-relaxed">
                        {result.reason}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-emerald-400/30">
                        <p className="text-xs font-semibold text-emerald-300 uppercase mb-1">
                          Estimated Speed
                        </p>
                        <p className="text-xl font-bold text-emerald-100">
                          {result.estimatedSpeed}
                        </p>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-emerald-400/30">
                        <p className="text-xs font-semibold text-emerald-300 uppercase mb-1">
                          Estimated Cost
                        </p>
                        <p className="text-xl font-bold text-emerald-100">
                          {result.estimatedCost}
                        </p>
                      </div>
                    </div>

                    {/* Settlement Timeline */}
                    <div className="bg-white/5 rounded-lg p-4 border border-emerald-400/20 mb-6">
                      <p className="text-xs font-semibold text-emerald-400 uppercase mb-3">
                        Settlement Timeline
                      </p>
                      <div className="flex items-center gap-2">
                        {result.timeline.map((item, idx) => (
                          <div key={idx} className="flex-1 text-center">
                            <p className="text-xs font-semibold text-emerald-300 mb-1">
                              {item.stage}
                            </p>
                            <p className="text-xs text-emerald-400">{item.duration}</p>
                            {idx < result.timeline.length - 1 && (
                              <div className="text-emerald-600 text-xs mt-1">→</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risk Scores */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-white/5 rounded-lg p-3 border border-emerald-400/20">
                        <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                          Compliance Risk
                        </p>
                        <p className="text-lg font-bold text-emerald-200">
                          {result.riskScores.complianceRisk}/10
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-emerald-400/20">
                        <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                          Settlement Risk
                        </p>
                        <p className="text-lg font-bold text-emerald-200">
                          {result.riskScores.settlementRisk}/10
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-emerald-400/20">
                        <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                          Operational Risk
                        </p>
                        <p className="text-lg font-bold text-emerald-200">
                          {result.riskScores.operationalRisk}/10
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3 border border-emerald-400/20">
                        <p className="text-xs font-semibold text-slate-400 uppercase mb-1">
                          Overall Risk
                        </p>
                        <p className="text-lg font-bold text-emerald-200">
                          {result.riskScores.overall}/10
                        </p>
                      </div>
                    </div>

                    {/* Corridor Intelligence */}
                    <div className="bg-white/5 rounded-lg p-4 border border-emerald-400/20 mb-6">
                      <p className="text-sm font-bold text-emerald-300 mb-3 flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Corridor Intelligence: {result.corridorIntelligence.name}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-white/5 rounded p-2">
                          <span className="text-slate-400 block text-xs mb-1">Remittance Demand:</span>
                          <span className="text-emerald-200 font-semibold">{result.corridorIntelligence.remittanceDemand}</span>
                        </div>
                        <div className="bg-white/5 rounded p-2">
                          <span className="text-slate-400 block text-xs mb-1">Cross-border Efficiency:</span>
                          <span className="text-emerald-200 font-semibold">{result.corridorIntelligence.efficiency}</span>
                        </div>
                        <div className="bg-white/5 rounded p-2">
                          <span className="text-slate-400 block text-xs mb-1">Correspondent Banking Friction:</span>
                          <span className="text-emerald-200 font-semibold">{result.corridorIntelligence.friction}</span>
                        </div>
                        <div className="bg-white/5 rounded p-2">
                          <span className="text-slate-400 block text-xs mb-1">Blockchain Settlement Rail Suitability:</span>
                          <span className="text-emerald-200 font-semibold">{result.corridorIntelligence.stablecoinSuitability}</span>
                        </div>
                        <div className="bg-white/5 rounded p-2 md:col-span-2">
                          <span className="text-slate-400 block text-xs mb-1">Regulatory Sensitivity:</span>
                          <span className="text-emerald-200 font-semibold">{result.corridorIntelligence.regulatory}</span>
                        </div>
                      </div>
                    </div>

                    {/* Settlement Flow Visualization */}
                    <div className="bg-white/5 rounded-lg p-4 border border-emerald-400/20 mb-6">
                      <p className="text-sm font-bold text-emerald-300 mb-4 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4" />
                        Settlement Flow: {result.recommended}
                      </p>
                      {result.recommended === 'Traditional Banking Rail' && (
                        <div className="flex items-center justify-between">
                          <div className="flex-1 text-center bg-blue-500/10 rounded-lg p-3 border border-blue-400/30">
                            <p className="text-xs text-blue-300 font-semibold">Originating Bank</p>
                            <p className="text-xs text-slate-400 mt-1">Initiation</p>
                          </div>
                          <div className="px-2">
                            <div className="text-blue-400">→</div>
                          </div>
                          <div className="flex-1 text-center bg-blue-500/10 rounded-lg p-3 border border-blue-400/30">
                            <p className="text-xs text-blue-300 font-semibold">Correspondent Bank</p>
                            <p className="text-xs text-slate-400 mt-1">Processing</p>
                          </div>
                          <div className="px-2">
                            <div className="text-blue-400">→</div>
                          </div>
                          <div className="flex-1 text-center bg-blue-500/10 rounded-lg p-3 border border-blue-400/30">
                            <p className="text-xs text-blue-300 font-semibold">Receiving Bank</p>
                            <p className="text-xs text-slate-400 mt-1">Settlement</p>
                          </div>
                        </div>
                      )}
                      {result.recommended === 'Card Network Rail' && (
                        <div className="flex items-center justify-between">
                          <div className="flex-1 text-center bg-purple-500/10 rounded-lg p-3 border border-purple-400/30">
                            <p className="text-xs text-purple-300 font-semibold">Authorization</p>
                            <p className="text-xs text-slate-400 mt-1">0-30s</p>
                          </div>
                          <div className="px-2">
                            <div className="text-purple-400">→</div>
                          </div>
                          <div className="flex-1 text-center bg-purple-500/10 rounded-lg p-3 border border-purple-400/30">
                            <p className="text-xs text-purple-300 font-semibold">Clearing</p>
                            <p className="text-xs text-slate-400 mt-1">30m-2h</p>
                          </div>
                          <div className="px-2">
                            <div className="text-purple-400">→</div>
                          </div>
                          <div className="flex-1 text-center bg-purple-500/10 rounded-lg p-3 border border-purple-400/30">
                            <p className="text-xs text-purple-300 font-semibold">Settlement</p>
                            <p className="text-xs text-slate-400 mt-1">1-2d</p>
                          </div>
                        </div>
                      )}
                      {result.recommended === 'Blockchain Settlement Rail' && (
                        <div className="flex items-center justify-between">
                          <div className="flex-1 text-center bg-emerald-500/10 rounded-lg p-3 border border-emerald-400/30">
                            <p className="text-xs text-emerald-300 font-semibold">AI Orchestrator</p>
                            <p className="text-xs text-slate-400 mt-1">Route Analysis</p>
                          </div>
                          <div className="px-2">
                            <div className="text-emerald-400">→</div>
                          </div>
                          <div className="flex-1 text-center bg-emerald-500/10 rounded-lg p-3 border border-emerald-400/30">
                            <p className="text-xs text-emerald-300 font-semibold">Liquidity Pool</p>
                            <p className="text-xs text-slate-400 mt-1">Matching</p>
                          </div>
                          <div className="px-2">
                            <div className="text-emerald-400">→</div>
                          </div>
                          <div className="flex-1 text-center bg-emerald-500/10 rounded-lg p-3 border border-emerald-400/30">
                            <p className="text-xs text-emerald-300 font-semibold">Blockchain</p>
                            <p className="text-xs text-slate-400 mt-1">Confirmation</p>
                          </div>
                          <div className="px-2">
                            <div className="text-emerald-400">→</div>
                          </div>
                          <div className="flex-1 text-center bg-emerald-500/10 rounded-lg p-3 border border-emerald-400/30">
                            <p className="text-xs text-emerald-300 font-semibold">Wallet</p>
                            <p className="text-xs text-slate-400 mt-1">Delivery</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Multi-Rail Availability */}
                    <div className="bg-white/5 rounded-lg p-4 border border-emerald-400/20 mb-6">
                      <p className="text-sm font-bold text-emerald-300 mb-3 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Rail Availability for This Corridor
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center justify-between bg-emerald-500/10 rounded-lg p-3 border border-emerald-400/30">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-emerald-400" />
                            <span className="text-emerald-200 font-semibold">Traditional Banking Rail</span>
                          </div>
                          <span className="text-emerald-300 text-xs bg-emerald-500/20 px-2 py-1 rounded">Available</span>
                        </div>
                        {!isRestricted ? (
                          <>
                            <div className="flex items-center justify-between bg-emerald-500/10 rounded-lg p-3 border border-emerald-400/30">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                <span className="text-emerald-200 font-semibold">Card Network Rail</span>
                              </div>
                              <span className="text-emerald-300 text-xs bg-emerald-500/20 px-2 py-1 rounded">Available</span>
                            </div>
                            <div className="flex items-center justify-between bg-emerald-500/10 rounded-lg p-3 border border-emerald-400/30">
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-emerald-400" />
                                <span className="text-emerald-200 font-semibold">Blockchain Settlement Rail</span>
                              </div>
                              <span className="text-emerald-300 text-xs bg-emerald-500/20 px-2 py-1 rounded">Available</span>
                            </div>
                            <div className="flex items-center justify-between bg-amber-500/10 rounded-lg p-3 border border-amber-400/30">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-amber-400" />
                                <span className="text-amber-200 font-semibold">Real-Time Payments</span>
                              </div>
                              <span className="text-amber-300 text-xs bg-amber-500/20 px-2 py-1 rounded">Conditional</span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-center justify-between bg-red-500/10 rounded-lg p-3 border border-red-400/30">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-400" />
                                <span className="text-red-200 font-semibold">Card Network Rail</span>
                              </div>
                              <span className="text-red-300 text-xs bg-red-500/20 px-2 py-1 rounded">Not Supported</span>
                            </div>
                            <div className="flex items-center justify-between bg-red-500/10 rounded-lg p-3 border border-red-400/30">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-400" />
                                <span className="text-red-200 font-semibold">Blockchain Settlement Rail</span>
                              </div>
                              <span className="text-red-300 text-xs bg-red-500/20 px-2 py-1 rounded">Not Supported</span>
                            </div>
                            <div className="flex items-center justify-between bg-red-500/10 rounded-lg p-3 border border-red-400/30">
                              <div className="flex items-center gap-2">
                                <AlertCircle className="w-4 h-4 text-red-400" />
                                <span className="text-red-200 font-semibold">Real-Time Payments</span>
                              </div>
                              <span className="text-red-300 text-xs bg-red-500/20 px-2 py-1 rounded">Not Supported</span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Liquidity Availability Indicator */}
                    <div className="bg-white/5 rounded-lg p-4 border border-emerald-400/20 mb-6">
                      <p className="text-sm font-bold text-emerald-300 mb-4 flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Liquidity Status
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                        <div className="bg-white/5 rounded p-3">
                          <span className="text-slate-400 block text-xs mb-1">Blockchain Settlement Rail Liquidity Pool</span>
                          <span className="text-emerald-200 font-bold text-lg">{result.liquidityStatus.pool}</span>
                        </div>
                        <div className="bg-white/5 rounded p-3">
                          <span className="text-slate-400 block text-xs mb-1">Network Congestion</span>
                          <span className="text-emerald-200 font-bold text-lg">{result.liquidityStatus.congestion}</span>
                        </div>
                        <div className="bg-white/5 rounded p-3">
                          <span className="text-slate-400 block text-xs mb-1">Estimated Gas Fee</span>
                          <span className="text-emerald-200 font-bold text-lg">{result.liquidityStatus.gasFee}</span>
                        </div>
                        <div className="bg-white/5 rounded p-3">
                          <span className="text-slate-400 block text-xs mb-1">Settlement Capacity</span>
                          <span className="text-emerald-200 font-bold text-lg">{result.liquidityStatus.capacity}</span>
                        </div>
                        <div className="bg-white/5 rounded p-3 md:col-span-2">
                          <span className="text-slate-400 block text-xs mb-1">Treasury Impact</span>
                          <span className="text-emerald-200 font-bold text-lg">{result.liquidityStatus.treasuryImpact}</span>
                        </div>
                      </div>
                    </div>

                    {/* FX Impact Comparison */}
                    <div className="bg-white/5 rounded-lg p-4 border border-emerald-400/20 mb-6">
                      <p className="text-sm font-bold text-emerald-300 mb-4 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4" />
                        FX Impact Comparison
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between bg-blue-500/10 rounded-lg p-3 border border-blue-400/30">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <span className="text-blue-200 font-semibold">Traditional Banking Rail</span>
                          </div>
                          <div className="text-right">
                            <span className="text-blue-300 text-sm">{result.fxImpact.bankWire.spread} spread</span>
                            <span className="text-blue-200 font-bold ml-3">{result.fxImpact.bankWire.cost}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-purple-500/10 rounded-lg p-3 border border-purple-400/30">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                            <span className="text-purple-200 font-semibold">Card Network Rail</span>
                          </div>
                          <div className="text-right">
                            <span className="text-purple-300 text-sm">{result.fxImpact.cardNetwork.spread} spread</span>
                            <span className="text-purple-200 font-bold ml-3">{result.fxImpact.cardNetwork.cost}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between bg-emerald-500/10 rounded-lg p-3 border border-emerald-400/30">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                            <span className="text-emerald-200 font-semibold">Blockchain Settlement Rail</span>
                          </div>
                          <div className="text-right">
                            <span className="text-emerald-300 text-sm">{result.fxImpact.stablecoin.spread} spread</span>
                            <span className="text-emerald-200 font-bold ml-3">{result.fxImpact.stablecoin.cost}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Decision Scorecard */}
                    <div className="bg-white/5 rounded-lg p-4 border border-emerald-400/20 mb-6">
                      <p className="text-sm font-bold text-emerald-300 mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Decision Scorecard
                      </p>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-emerald-200 font-semibold text-sm">Blockchain Settlement Rail</span>
                            <span className="text-emerald-300 font-bold text-lg">{result.decisionScorecard.stablecoin}</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
                              style={{ width: `${result.decisionScorecard.stablecoin}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-200 font-semibold text-sm">Card Network Rail</span>
                            <span className="text-purple-300 font-bold text-lg">{result.decisionScorecard.cardNetwork}</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full"
                              style={{ width: `${result.decisionScorecard.cardNetwork}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-200 font-semibold text-sm">Traditional Banking Rail</span>
                            <span className="text-blue-300 font-bold text-lg">{result.decisionScorecard.bankWire}</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full"
                              style={{ width: `${result.decisionScorecard.bankWire}%` }}
                            ></div>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-700">
                          Weighted scores across speed, cost efficiency, compliance fit, corridor efficiency, and liquidity availability
                        </p>
                      </div>
                    </div>

                    {/* Payment Impact Summary */}
                    <div className="bg-white/5 rounded-lg p-4 border border-emerald-400/20 mb-6">
                      <p className="text-sm font-bold text-emerald-300 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Payment Impact Summary
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="bg-white/5 rounded p-3">
                          <span className="text-slate-400 block text-xs mb-1">Cost Savings vs Traditional Banking Rail</span>
                          <span className="text-emerald-200 font-semibold">{result.paymentImpact.costSavings}</span>
                        </div>
                        <div className="bg-white/5 rounded p-3">
                          <span className="text-slate-400 block text-xs mb-1">Settlement Acceleration</span>
                          <span className="text-emerald-200 font-semibold">{result.paymentImpact.acceleration}</span>
                        </div>
                        <div className="bg-white/5 rounded p-3">
                          <span className="text-slate-400 block text-xs mb-1">Operational Efficiency</span>
                          <span className="text-emerald-200 font-semibold">{result.paymentImpact.efficiency}</span>
                        </div>
                        <div className="bg-white/5 rounded p-3">
                          <span className="text-slate-400 block text-xs mb-1">Best Use Case Fit</span>
                          <span className="text-emerald-200 font-semibold">{result.paymentImpact.bestFit}</span>
                        </div>
                      </div>
                    </div>

                    {/* Autonomous Payment Negotiation */}
                    <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-lg p-4 border border-cyan-400/30 mb-6">
                      <p className="text-sm font-bold text-cyan-300 mb-4 flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Autonomous Payment Negotiation
                      </p>
                      <div className="space-y-3 mb-4">
                        <div className="bg-white/5 rounded p-3">
                          <span className="text-slate-400 block text-xs mb-1">Payer Preference</span>
                          <span className="text-cyan-200 font-semibold">{result.negotiation.payerPref}</span>
                        </div>
                        <div className="bg-white/5 rounded p-3">
                          <span className="text-slate-400 block text-xs mb-1">Recipient Preference</span>
                          <span className="text-cyan-200 font-semibold">{result.negotiation.recipientPref}</span>
                        </div>
                        <div className="bg-cyan-500/10 rounded p-3 border border-cyan-400/30">
                          <span className="text-cyan-400 block text-xs font-bold mb-1">AI Negotiation Outcome</span>
                          <span className="text-cyan-100 font-semibold">{result.negotiation.outcome}</span>
                        </div>
                      </div>
                      <p className="text-sm text-cyan-200/80 leading-relaxed">
                        {result.negotiation.explanation}
                      </p>
                    </div>

                    {/* Visual Comparison Charts */}
                    <div className="bg-white/5 rounded-lg p-4 border border-emerald-400/20 mb-6">
                      <p className="text-sm font-bold text-emerald-300 mb-4 flex items-center gap-2">
                        <TrendingDown className="w-4 h-4" />
                        Visual Rail Comparison
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 rounded p-4">
                          <p className="text-xs text-slate-400 uppercase mb-3">Settlement Speed</p>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-emerald-300">Blockchain Settlement Rail</span>
                                <span className="text-emerald-400">2-10 mins</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded h-1.5">
                                <div className="bg-emerald-500 h-1.5 rounded" style={{ width: '95%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-purple-300">Card Network Rail</span>
                                <span className="text-purple-400">1-2 hours</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded h-1.5">
                                <div className="bg-purple-500 h-1.5 rounded" style={{ width: '70%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-blue-300">Traditional Banking Rail</span>
                                <span className="text-blue-400">1-3 days</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded h-1.5">
                                <div className="bg-blue-500 h-1.5 rounded" style={{ width: '30%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded p-4">
                          <p className="text-xs text-slate-400 uppercase mb-3">Cost Efficiency</p>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-emerald-300">Blockchain Settlement Rail</span>
                                <span className="text-emerald-400">$1-5</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded h-1.5">
                                <div className="bg-emerald-500 h-1.5 rounded" style={{ width: '90%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-purple-300">Card Network Rail</span>
                                <span className="text-purple-400">1.5-3%</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded h-1.5">
                                <div className="bg-purple-500 h-1.5 rounded" style={{ width: '60%' }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-blue-300">Traditional Banking Rail</span>
                                <span className="text-blue-400">$25-50</span>
                              </div>
                              <div className="w-full bg-slate-700 rounded h-1.5">
                                <div className="bg-blue-500 h-1.5 rounded" style={{ width: '40%' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Settlement Probability */}
                    <div className="bg-white/5 rounded-lg p-4 border border-emerald-400/20 mb-6">
                      <p className="text-sm font-bold text-emerald-300 mb-4 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Settlement Probability
                      </p>
                      <div className="space-y-3">
                        <div className="bg-white/5 rounded p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-300 text-sm font-semibold">Traditional Banking Rail</span>
                            <span className="text-emerald-300 font-bold text-lg">{result.settlementProbability.bankWire}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full"
                              style={{ width: `${result.settlementProbability.bankWire}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-300 text-sm font-semibold">Card Network Rail</span>
                            <span className="text-emerald-300 font-bold text-lg">{result.settlementProbability.cardNetwork}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full"
                              style={{ width: `${result.settlementProbability.cardNetwork}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-slate-300 text-sm font-semibold">Blockchain Settlement Rail</span>
                            <span className="text-emerald-300 font-bold text-lg">{result.settlementProbability.stablecoin}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
                              style={{ width: `${result.settlementProbability.stablecoin}%` }}
                            ></div>
                          </div>
                        </div>
                        <p className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-700">
                          Estimated success rate based on liquidity, corridor friction, and compliance factors
                        </p>
                      </div>
                    </div>

                    {/* Real-Time Market Signals */}
                    <div className="bg-gradient-to-br from-teal-500/20 via-teal-500/10 to-teal-600/20 border border-teal-400/40 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-6 h-6 text-teal-300" />
                        <h2 className="text-xl font-bold text-teal-100 uppercase tracking-wider">
                          Market Signals
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-teal-400/30">
                          <p className="text-xs font-semibold text-teal-300 uppercase mb-2">
                            Network Congestion
                          </p>
                          <p className="text-lg font-bold text-teal-100">
                            {result.marketSignals.networkCongestion}
                          </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-teal-400/30">
                          <p className="text-xs font-semibold text-teal-300 uppercase mb-2">
                            FX Volatility
                          </p>
                          <p className="text-lg font-bold text-teal-100">
                            {result.marketSignals.fxVolatility}
                          </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-teal-400/30">
                          <p className="text-xs font-semibold text-teal-300 uppercase mb-2">
                            Blockchain Settlement Rail Liquidity Trend
                          </p>
                          <p className="text-lg font-bold text-teal-100">
                            {result.marketSignals.liquidityTrend}
                          </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-teal-400/30">
                          <p className="text-xs font-semibold text-teal-300 uppercase mb-2">
                            Corridor Demand
                          </p>
                          <p className="text-lg font-bold text-teal-100">
                            {result.marketSignals.corridorDemand}
                          </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-teal-400/30 md:col-span-2">
                          <p className="text-xs font-semibold text-teal-300 uppercase mb-2">
                            Settlement Conditions
                          </p>
                          <p className="text-lg font-bold text-teal-100">
                            {result.marketSignals.settlementConditions}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Execution Simulation */}
                    <div className="bg-gradient-to-br from-amber-500/20 via-amber-500/10 to-amber-600/20 border border-amber-400/40 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-6 h-6 text-amber-300" />
                        <h2 className="text-xl font-bold text-amber-100 uppercase tracking-wider">
                          Execution Simulation
                        </h2>
                      </div>

                      <div className="mb-6">
                        <button
                          onClick={handleExecuteSettlement}
                          disabled={isExecuting}
                          className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all ${
                            isExecuting
                              ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg hover:shadow-xl'
                          }`}
                        >
                          {isExecuting ? 'Executing Settlement...' : 'Execute Settlement'}
                        </button>
                      </div>

                      {executionStep > 0 && (() => {
                        const steps = getExecutionSteps(result.recommended);
                        const railName = result.recommended === 'Blockchain Settlement Rail' ? 'Blockchain Settlement Rail Network' : result.recommended;

                        return (
                          <div className="space-y-3">
                            {steps.map((step, idx) => {
                              const stepNumber = idx + 1;
                              const isCompleted = executionStep >= stepNumber;

                              return (
                                <div
                                  key={idx}
                                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                                    isCompleted
                                      ? 'bg-emerald-500/20 border border-emerald-400/40'
                                      : 'bg-white/5 border border-slate-600'
                                  }`}
                                >
                                  {isCompleted ? (
                                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                  ) : (
                                    <div className="w-5 h-5 rounded-full border-2 border-slate-500 flex-shrink-0"></div>
                                  )}
                                  <span className={isCompleted ? 'text-emerald-200 font-semibold' : 'text-slate-400'}>
                                    {step}
                                  </span>
                                </div>
                              );
                            })}

                            {executionStep >= steps.length && (
                              <div className="mt-4 p-4 bg-emerald-500/20 border border-emerald-400/40 rounded-lg">
                                <p className="text-emerald-200 font-bold text-center">
                                  Settlement executed successfully via {railName}
                                </p>
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Payment Tier Classification */}
                    <div className="bg-gradient-to-br from-indigo-500/20 via-indigo-500/10 to-indigo-600/20 border border-indigo-400/40 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <DollarSign className="w-6 h-6 text-indigo-300" />
                        <h2 className="text-xl font-bold text-indigo-100 uppercase tracking-wider">
                          Payment Tier Classification
                        </h2>
                      </div>

                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-indigo-400/30">
                        <p className="text-xs font-semibold text-indigo-300 uppercase mb-2">
                          Transaction Category
                        </p>
                        <p className="text-2xl font-bold text-indigo-100 mb-3">
                          {getPaymentTier(parseInt(amount) || 0)}
                        </p>
                        <p className="text-sm text-indigo-200">
                          {(() => {
                            const amt = parseInt(amount) || 0;
                            if (amt < 1000) return 'Micro payments favor low-cost, instant settlement rails like stablecoins.';
                            if (amt < 50000) return 'SME payouts benefit from balanced speed and cost optimization across all rails.';
                            if (amt < 250000) return 'Mid-market transfers require careful balance of cost, speed, and compliance.';
                            return 'Corporate treasury transfers prioritize regulatory certainty and settlement guarantees.';
                          })()}
                        </p>
                      </div>
                    </div>

                    {/* Alternative Rail Analysis */}
                    <div className="bg-gradient-to-br from-slate-600/20 via-slate-500/10 to-slate-700/20 border border-slate-400/40 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <TrendingDown className="w-6 h-6 text-slate-300" />
                        <h2 className="text-xl font-bold text-slate-100 uppercase tracking-wider">
                          Alternative Rail Analysis
                        </h2>
                      </div>

                      <div className="space-y-4">
                        {getAlternativeRailAnalysis(result.recommended, urgency, compliance, parseInt(amount) || 0).map((rail, idx) => (
                          <div key={idx} className="bg-white/10 backdrop-blur rounded-lg p-4 border border-slate-400/30">
                            <p className="text-lg font-bold text-slate-100 mb-2">{rail.name}</p>
                            <div className="space-y-2">
                              <div>
                                <p className="text-xs font-semibold text-emerald-400 uppercase">Strength</p>
                                <p className="text-sm text-slate-200">{rail.strength}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-amber-400 uppercase">Weakness</p>
                                <p className="text-sm text-slate-200">{rail.weakness}</p>
                              </div>
                              <div>
                                <p className="text-xs font-semibold text-red-400 uppercase">Why Not Selected</p>
                                <p className="text-sm text-slate-200">{rail.notSelectedReason}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Corridor Risk Indicator */}
                    <div className="bg-gradient-to-br from-orange-500/20 via-orange-500/10 to-orange-600/20 border border-orange-400/40 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="w-6 h-6 text-orange-300" />
                        <h2 className="text-xl font-bold text-orange-100 uppercase tracking-wider">
                          Corridor Risk Indicator
                        </h2>
                      </div>

                      {(() => {
                        const corridorRisk = getCorridorRisk(country, parseInt(amount) || 0);
                        const riskColor = corridorRisk.level === 'Low' ? 'emerald' : corridorRisk.level === 'Moderate' ? 'amber' : 'red';

                        return (
                          <div>
                            <div className="mb-4">
                              <p className="text-xs font-semibold text-orange-300 uppercase mb-2">
                                Corridor: United States → {selectedCountryObj?.name || country}
                              </p>
                              <div className={`inline-block px-4 py-2 rounded-lg font-bold text-lg bg-${riskColor}-500/30 border border-${riskColor}-400/50 text-${riskColor}-200`}>
                                Risk Level: {corridorRisk.level}
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-orange-400/30">
                                <p className="text-xs font-semibold text-orange-300 uppercase mb-1">
                                  Correspondent Banking Friction
                                </p>
                                <p className="text-sm font-bold text-orange-100">
                                  {corridorRisk.correspondentFriction}
                                </p>
                              </div>

                              <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-orange-400/30">
                                <p className="text-xs font-semibold text-orange-300 uppercase mb-1">
                                  Regulatory Sensitivity
                                </p>
                                <p className="text-sm font-bold text-orange-100">
                                  {corridorRisk.regulatorySensitivity}
                                </p>
                              </div>

                              <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-orange-400/30">
                                <p className="text-xs font-semibold text-orange-300 uppercase mb-1">
                                  FX Volatility
                                </p>
                                <p className="text-sm font-bold text-orange-100">
                                  {corridorRisk.fxVolatility}
                                </p>
                              </div>

                              <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-orange-400/30">
                                <p className="text-xs font-semibold text-orange-300 uppercase mb-1">
                                  Settlement Reliability
                                </p>
                                <p className="text-sm font-bold text-orange-100">
                                  {corridorRisk.settlementReliability}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Network Status Panel */}
                    <div className="bg-gradient-to-br from-green-500/20 via-green-500/10 to-green-600/20 border border-green-400/40 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-6 h-6 text-green-300" />
                        <h2 className="text-xl font-bold text-green-100 uppercase tracking-wider">
                          Network Status
                        </h2>
                      </div>

                      {(() => {
                        const networkStatus = getNetworkStatus(parseInt(amount) || 0, urgency, country);

                        return (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-green-400/30">
                              <p className="text-xs font-semibold text-green-300 uppercase mb-2">
                                Traditional Banking Rail Network
                              </p>
                              <p className="text-lg font-bold text-green-100">
                                {networkStatus.bankWireStatus}
                              </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-green-400/30">
                              <p className="text-xs font-semibold text-green-300 uppercase mb-2">
                                Card Network Rail
                              </p>
                              <p className="text-lg font-bold text-green-100">
                                {networkStatus.cardNetworkStatus}
                              </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-green-400/30">
                              <p className="text-xs font-semibold text-green-300 uppercase mb-2">
                                Blockchain Settlement Rail Network
                              </p>
                              <p className="text-lg font-bold text-green-100">
                                {networkStatus.stablecoinStatus}
                              </p>
                            </div>

                            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-green-400/30">
                              <p className="text-xs font-semibold text-green-300 uppercase mb-2">
                                Settlement Conditions
                              </p>
                              <p className="text-lg font-bold text-green-100">
                                {networkStatus.settlementConditions}
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Decision Weighting Graph */}
                    <div className="bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-purple-600/20 border border-purple-400/40 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <TrendingDown className="w-6 h-6 text-purple-300" />
                        <h2 className="text-xl font-bold text-purple-100 uppercase tracking-wider">
                          Decision Weighting
                        </h2>
                      </div>

                      {(() => {
                        const weights = getDecisionWeighting(routingMode, urgency, compliance, parseInt(amount) || 0);
                        const factors = [
                          { name: 'Speed', value: weights.speed, color: 'bg-blue-500' },
                          { name: 'Cost', value: weights.cost, color: 'bg-green-500' },
                          { name: 'Compliance', value: weights.compliance, color: 'bg-red-500' },
                          { name: 'Liquidity', value: weights.liquidity, color: 'bg-cyan-500' },
                          { name: 'Corridor Fit', value: weights.corridorFit, color: 'bg-amber-500' },
                          { name: 'FX Efficiency', value: weights.fxEfficiency, color: 'bg-violet-500' },
                        ];

                        return (
                          <div className="space-y-4">
                            <p className="text-sm text-purple-200 mb-4">
                              Current routing mode: <span className="font-bold text-purple-100">{routingMode}</span>
                            </p>

                            {factors.map((factor, idx) => (
                              <div key={idx}>
                                <div className="flex justify-between items-center mb-1">
                                  <p className="text-sm font-semibold text-purple-200">{factor.name}</p>
                                  <p className="text-sm font-bold text-purple-100">{factor.value}%</p>
                                </div>
                                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                                  <div
                                    className={`${factor.color} h-full transition-all duration-500`}
                                    style={{ width: `${factor.value}%` }}
                                  ></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        );
                      })()}
                    </div>

                    {/* What-If Simulation Panel */}
                    <div className="bg-gradient-to-br from-pink-500/20 via-pink-500/10 to-pink-600/20 border border-pink-400/40 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Zap className="w-6 h-6 text-pink-300" />
                        <h2 className="text-xl font-bold text-pink-100 uppercase tracking-wider">
                          What-If Simulation
                        </h2>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-pink-400/30">
                          <p className="text-sm font-semibold text-pink-200 mb-2">
                            If stablecoin liquidity drops significantly:
                          </p>
                          <p className="text-sm text-pink-100">
                            Recommendation may shift to <span className="font-bold">Traditional Banking Rail</span> or <span className="font-bold">Card Network Rail</span> due to reduced settlement confidence
                          </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-pink-400/30">
                          <p className="text-sm font-semibold text-pink-200 mb-2">
                            If compliance sensitivity increases:
                          </p>
                          <p className="text-sm text-pink-100">
                            Recommendation would favor <span className="font-bold">Traditional Banking Rail</span> for enhanced regulatory oversight and audit trails
                          </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-pink-400/30">
                          <p className="text-sm font-semibold text-pink-200 mb-2">
                            If network congestion increases:
                          </p>
                          <p className="text-sm text-pink-100">
                            Blockchain Settlement Rail settlement times may degrade; <span className="font-bold">Card Network Rail</span> becomes more competitive
                          </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-pink-400/30">
                          <p className="text-sm font-semibold text-pink-200 mb-2">
                            If FX volatility spikes:
                          </p>
                          <p className="text-sm text-pink-100">
                            <span className="font-bold">Blockchain Settlement Rail</span> rails gain advantage by minimizing FX exposure through faster settlement
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* AI Learning Status */}
                    <div className="bg-gradient-to-br from-teal-500/20 via-teal-500/10 to-teal-600/20 border border-teal-400/40 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-6 h-6 text-teal-300" />
                        <h2 className="text-xl font-bold text-teal-100 uppercase tracking-wider">
                          AI Learning Status
                        </h2>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-teal-400/30">
                          <p className="text-xs font-semibold text-teal-300 uppercase mb-2">
                            Historical Payment Data
                          </p>
                          <p className="text-lg font-bold text-emerald-300">
                            Connected
                          </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-teal-400/30">
                          <p className="text-xs font-semibold text-teal-300 uppercase mb-2">
                            Corridor Performance Signals
                          </p>
                          <p className="text-lg font-bold text-emerald-300">
                            Active
                          </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-teal-400/30">
                          <p className="text-xs font-semibold text-teal-300 uppercase mb-2">
                            Routing Model Confidence Trend
                          </p>
                          <p className="text-lg font-bold text-emerald-300">
                            Improving
                          </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-teal-400/30">
                          <p className="text-xs font-semibold text-teal-300 uppercase mb-2">
                            Adaptive Optimization
                          </p>
                          <p className="text-lg font-bold text-emerald-300">
                            Enabled
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Fallback Routing Logic */}
                    <div className="bg-gradient-to-br from-sky-500/20 via-sky-500/10 to-sky-600/20 border border-sky-400/40 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <TrendingDown className="w-6 h-6 text-sky-300" />
                        <h2 className="text-xl font-bold text-sky-100 uppercase tracking-wider">
                          Fallback Routing Logic
                        </h2>
                      </div>

                      {(() => {
                        const fallback = getFallbackRouting(result.recommended, compliance, urgency);

                        return (
                          <div>
                            {/* Route Hierarchy Visualization */}
                            <div className="mb-6 flex flex-col md:flex-row items-center justify-center gap-4">
                              <div className="flex flex-col items-center">
                                <div className="bg-emerald-500/30 border-2 border-emerald-400 rounded-lg px-6 py-4 min-w-[180px]">
                                  <p className="text-xs font-semibold text-emerald-300 uppercase mb-1 text-center">
                                    Primary Route
                                  </p>
                                  <p className="text-lg font-bold text-emerald-100 text-center">
                                    {fallback.primary}
                                  </p>
                                </div>
                                <div className="w-px h-8 bg-sky-400/50"></div>
                                <div className="text-sky-300 text-xs">↓ Fallback if unavailable</div>
                              </div>

                              <div className="flex flex-col items-center">
                                <div className="bg-amber-500/30 border-2 border-amber-400 rounded-lg px-6 py-4 min-w-[180px]">
                                  <p className="text-xs font-semibold text-amber-300 uppercase mb-1 text-center">
                                    Secondary Route
                                  </p>
                                  <p className="text-lg font-bold text-amber-100 text-center">
                                    {fallback.secondary}
                                  </p>
                                </div>
                                <div className="w-px h-8 bg-sky-400/50"></div>
                                <div className="text-sky-300 text-xs">↓ Tertiary option</div>
                              </div>

                              <div className="flex flex-col items-center">
                                <div className="bg-blue-500/30 border-2 border-blue-400 rounded-lg px-6 py-4 min-w-[180px]">
                                  <p className="text-xs font-semibold text-blue-300 uppercase mb-1 text-center">
                                    Tertiary Route
                                  </p>
                                  <p className="text-lg font-bold text-blue-100 text-center">
                                    {fallback.tertiary}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Trigger Information */}
                            <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-sky-400/30 mb-4">
                              <p className="text-xs font-semibold text-sky-300 uppercase mb-2">
                                Fallback Trigger Conditions
                              </p>
                              <p className="text-sm text-sky-100">
                                {fallback.trigger}
                              </p>
                            </div>

                            {/* Explanation */}
                            <div className="bg-white/5 rounded-lg p-4 border border-sky-400/20">
                              <p className="text-sm text-sky-200 leading-relaxed">
                                The AI orchestration layer maintains fallback routing paths to improve settlement resilience if the primary rail becomes unavailable or suboptimal. This multi-tier approach ensures payment continuity even under adverse network or liquidity conditions.
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Dynamic Liquidity Provider Marketplace */}
                    <div className="bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-cyan-600/20 border border-cyan-400/40 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <DollarSign className="w-6 h-6 text-cyan-300" />
                        <h2 className="text-xl font-bold text-cyan-100 uppercase tracking-wider">
                          Liquidity Provider Marketplace
                        </h2>
                      </div>

                      {(() => {
                        const lpData = getLiquidityProviders(parseInt(amount) || 0, result.recommended);

                        if (!lpData.isBlockchainSettlementRail) {
                          return (
                            <div className="bg-white/10 backdrop-blur rounded-lg p-6 border border-cyan-400/30 text-center">
                              <p className="text-sm text-cyan-200">
                                Liquidity provider marketplace not required for this selected rail.
                              </p>
                              <p className="text-xs text-cyan-300 mt-2">
                                (Only applicable for stablecoin settlement routes)
                              </p>
                            </div>
                          );
                        }

                        return (
                          <div>
                            {/* Provider Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                              {lpData.providers.map((provider, idx) => {
                                const isSelected = provider.name === lpData.selectedProvider.name;

                                return (
                                  <div
                                    key={idx}
                                    className={`backdrop-blur rounded-lg p-4 border transition-all ${
                                      isSelected
                                        ? 'bg-emerald-500/30 border-emerald-400 ring-2 ring-emerald-400/50'
                                        : 'bg-white/10 border-cyan-400/30'
                                    }`}
                                  >
                                    <div className="flex items-center justify-between mb-3">
                                      <p className={`text-sm font-bold ${isSelected ? 'text-emerald-100' : 'text-cyan-100'}`}>
                                        {provider.name}
                                      </p>
                                      {isSelected && (
                                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                                      )}
                                    </div>

                                    <div className="space-y-2">
                                      <div>
                                        <p className="text-xs text-cyan-300 uppercase">Quoted Fee</p>
                                        <p className={`text-lg font-bold ${isSelected ? 'text-emerald-100' : 'text-cyan-100'}`}>
                                          {provider.quotedFee}
                                        </p>
                                      </div>

                                      <div>
                                        <p className="text-xs text-cyan-300 uppercase">Liquidity</p>
                                        <p className={`text-sm font-semibold ${isSelected ? 'text-emerald-100' : 'text-cyan-100'}`}>
                                          {provider.liquidity}
                                        </p>
                                      </div>

                                      <div>
                                        <p className="text-xs text-cyan-300 uppercase">Network Speed</p>
                                        <p className={`text-sm font-semibold ${isSelected ? 'text-emerald-100' : 'text-cyan-100'}`}>
                                          {provider.networkSpeed}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Selected Provider Explanation */}
                            <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-lg p-4">
                              <div className="flex items-center gap-2 mb-2">
                                <CheckCircle className="w-5 h-5 text-emerald-400" />
                                <p className="text-sm font-bold text-emerald-200 uppercase">
                                  Selected Provider
                                </p>
                              </div>
                              <p className="text-lg font-bold text-emerald-100 mb-2">
                                {lpData.selectedProvider.name}
                              </p>
                              <p className="text-sm text-emerald-200">
                                {(() => {
                                  const amt = parseInt(amount) || 0;
                                  if (lpData.selectedProvider.name.includes('Fireblocks')) {
                                    return amt < 50000
                                      ? 'Fireblocks selected due to lowest cost with sufficient liquidity and fast settlement speed.'
                                      : 'Fireblocks selected for optimal balance of cost and high liquidity for large transfers.';
                                  } else if (lpData.selectedProvider.name.includes('Circle')) {
                                    return 'Circle selected for high liquidity availability and fast network speed with competitive pricing.';
                                  } else {
                                    return 'Paxos selected for high liquidity capacity and institutional-grade settlement infrastructure.';
                                  }
                                })()}
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>

                    {/* Global Payment Intelligence Map */}
                    <div className="bg-gradient-to-br from-indigo-500/20 via-indigo-500/10 to-indigo-600/20 border border-indigo-400/40 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Globe className="w-6 h-6 text-indigo-300" />
                        <h2 className="text-xl font-bold text-indigo-100 uppercase tracking-wider">
                          Global Payment Intelligence Map
                        </h2>
                      </div>

                      {(() => {
                        const { corridors, activeCorridorIndex } = getPaymentCorridors(country);

                        return (
                          <div>
                            {/* Legend */}
                            <div className="mb-6 flex flex-wrap gap-4 justify-center">
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                                <span className="text-xs text-slate-300">Blockchain Settlement Rail Optimized</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                                <span className="text-xs text-slate-300">Mixed Rail Environment</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                <span className="text-xs text-slate-300">High Compliance Corridor</span>
                              </div>
                            </div>

                            {/* Corridor List */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {corridors.map((corridor, idx) => {
                                const isActive = idx === activeCorridorIndex;
                                const colorClasses = {
                                  green: {
                                    bg: 'bg-emerald-500/30',
                                    border: 'border-emerald-400',
                                    text: 'text-emerald-100',
                                    indicator: 'bg-emerald-500',
                                    ring: 'ring-emerald-400/50'
                                  },
                                  yellow: {
                                    bg: 'bg-amber-500/30',
                                    border: 'border-amber-400',
                                    text: 'text-amber-100',
                                    indicator: 'bg-amber-500',
                                    ring: 'ring-amber-400/50'
                                  },
                                  red: {
                                    bg: 'bg-red-500/30',
                                    border: 'border-red-400',
                                    text: 'text-red-100',
                                    indicator: 'bg-red-500',
                                    ring: 'ring-red-400/50'
                                  }
                                };

                                const colors = colorClasses[corridor.color as keyof typeof colorClasses];

                                return (
                                  <div
                                    key={idx}
                                    className={`backdrop-blur rounded-lg p-4 border transition-all ${
                                      isActive
                                        ? `${colors.bg} ${colors.border} ring-2 ${colors.ring}`
                                        : 'bg-white/5 border-indigo-400/20'
                                    }`}
                                  >
                                    <div className="flex items-start gap-3">
                                      <div className={`w-3 h-3 rounded-full ${colors.indicator} mt-1 flex-shrink-0`}></div>
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-2">
                                          <p className={`text-sm font-bold ${isActive ? colors.text : 'text-indigo-100'}`}>
                                            {corridor.from} → {corridor.to}
                                          </p>
                                          {isActive && (
                                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded">Active</span>
                                          )}
                                        </div>
                                        <div className="space-y-1">
                                          <p className="text-xs text-indigo-300 uppercase">
                                            Recommended Rail
                                          </p>
                                          <p className={`text-sm font-semibold ${isActive ? colors.text : 'text-indigo-100'}`}>
                                            {corridor.recommended}
                                          </p>
                                          <p className="text-xs text-indigo-300/80 mt-2">
                                            {corridor.reason}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Map Context */}
                            <div className="mt-6 bg-white/5 rounded-lg p-4 border border-indigo-400/20">
                              <p className="text-sm text-indigo-200 leading-relaxed">
                                This intelligence map displays optimized payment corridors based on regulatory environment, infrastructure maturity, and historical transaction patterns. The AI routing engine uses corridor-specific data to recommend the most suitable rail for each destination.
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                        </>
                      )}

                      {/* Performance Sub-Tab */}
                      {overviewSubTab === 'performance' && (
                        <>
                    {/* Rail Performance Dashboard */}
                    <div className="bg-gradient-to-br from-violet-500/20 via-violet-500/10 to-violet-600/20 border border-violet-400/40 rounded-2xl p-6 mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Activity className="w-6 h-6 text-violet-300" />
                        <h2 className="text-xl font-bold text-violet-100 uppercase tracking-wider">
                          Rail Performance Dashboard
                        </h2>
                      </div>

                      {(() => {
                        const railData = getRailPerformanceData();

                        return (
                          <div>
                            {/* Performance Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                              {railData.map((rail, idx) => {
                                const colorClasses = {
                                  blue: {
                                    bg: 'from-blue-500/20 to-blue-600/20',
                                    border: 'border-blue-400/40',
                                    text: 'text-blue-100',
                                    accent: 'text-blue-300'
                                  },
                                  purple: {
                                    bg: 'from-purple-500/20 to-purple-600/20',
                                    border: 'border-purple-400/40',
                                    text: 'text-purple-100',
                                    accent: 'text-purple-300'
                                  },
                                  emerald: {
                                    bg: 'from-emerald-500/20 to-emerald-600/20',
                                    border: 'border-emerald-400/40',
                                    text: 'text-emerald-100',
                                    accent: 'text-emerald-300'
                                  }
                                };

                                const colors = colorClasses[rail.color as keyof typeof colorClasses];

                                return (
                                  <div
                                    key={idx}
                                    className={`bg-gradient-to-br ${colors.bg} border ${colors.border} rounded-xl p-5`}
                                  >
                                    <h3 className={`text-lg font-bold ${colors.text} mb-4`}>
                                      {rail.name}
                                    </h3>

                                    {/* Key Metrics */}
                                    <div className="space-y-3 mb-5">
                                      <div>
                                        <p className={`text-xs ${colors.accent} uppercase mb-1`}>
                                          Success Rate
                                        </p>
                                        <p className={`text-2xl font-bold ${colors.text}`}>
                                          {rail.successRate}%
                                        </p>
                                      </div>

                                      <div>
                                        <p className={`text-xs ${colors.accent} uppercase mb-1`}>
                                          Settlement Time
                                        </p>
                                        <p className={`text-sm font-semibold ${colors.text}`}>
                                          {rail.settlementTime}
                                        </p>
                                      </div>

                                      <div>
                                        <p className={`text-xs ${colors.accent} uppercase mb-1`}>
                                          Transaction Cost
                                        </p>
                                        <p className={`text-sm font-semibold ${colors.text}`}>
                                          {rail.cost}
                                        </p>
                                      </div>
                                    </div>

                                    {/* Performance Indicators */}
                                    <div className="space-y-3 pt-3 border-t border-white/10">
                                      <div>
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="text-xs text-white/70">Settlement Speed</span>
                                          <span className="text-xs font-semibold text-white/90">
                                            {rail.speedValue}%
                                          </span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-2">
                                          <div
                                            className="bg-gradient-to-r from-white/60 to-white/80 h-2 rounded-full transition-all"
                                            style={{ width: `${rail.speedValue}%` }}
                                          ></div>
                                        </div>
                                      </div>

                                      <div>
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="text-xs text-white/70">Cost Efficiency</span>
                                          <span className="text-xs font-semibold text-white/90">
                                            {100 - rail.costValue}%
                                          </span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-2">
                                          <div
                                            className="bg-gradient-to-r from-white/60 to-white/80 h-2 rounded-full transition-all"
                                            style={{ width: `${100 - rail.costValue}%` }}
                                          ></div>
                                        </div>
                                      </div>

                                      <div>
                                        <div className="flex justify-between items-center mb-1">
                                          <span className="text-xs text-white/70">Reliability</span>
                                          <span className="text-xs font-semibold text-white/90">
                                            {rail.reliabilityValue}%
                                          </span>
                                        </div>
                                        <div className="w-full bg-white/10 rounded-full h-2">
                                          <div
                                            className="bg-gradient-to-r from-white/60 to-white/80 h-2 rounded-full transition-all"
                                            style={{ width: `${rail.reliabilityValue}%` }}
                                          ></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>

                            {/* Dashboard Context */}
                            <div className="bg-white/5 rounded-lg p-4 border border-violet-400/20">
                              <p className="text-sm text-violet-200 leading-relaxed">
                                This performance dashboard provides real-time simulated metrics that inform the AI routing engine's decision-making process. Each rail is continuously monitored for success rates, settlement speeds, and cost efficiency to optimize payment routing recommendations.
                              </p>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                        </>
                      )}

                    {/* Strategic Insight - Shown on all sub-tabs */}
                    <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4 border border-purple-400/20">
                      <p className="text-sm font-semibold text-purple-300 mb-2">Strategic Insight</p>
                      <p className="text-sm text-purple-200/80 leading-relaxed">
                        Blockchain Settlement Rails are being evaluated here not only as a payment method but as a programmable settlement layer that can complement traditional rails depending on speed, cost, and compliance requirements. In high-friction corridors, they offer an alternative to correspondent banking networks.
                      </p>
                    </div>
                    </>
                  )}

              {/* AI Decision Tab */}
              {result && activeTab === 'decision' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* AI Decision Explanation */}
                  <div className="bg-gradient-to-br from-cyan-500/20 via-cyan-500/10 to-blue-600/20 border border-cyan-400/40 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-cyan-300" />
                      <h2 className="text-xl font-bold text-cyan-100 uppercase tracking-wider">
                        AI Decision Explanation
                      </h2>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4 border border-cyan-400/20">
                      <p className="text-sm text-cyan-200 leading-relaxed mb-3">
                        {result.explanation}
                      </p>
                      <div className="flex items-center gap-2 pt-3 border-t border-cyan-400/20">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <p className="text-xs font-semibold text-cyan-300">
                          AI Confidence Score: {result.confidenceScore}%
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Compliance Screening */}
                  <div className="bg-gradient-to-br from-red-500/20 via-orange-500/10 to-red-600/20 border border-red-400/40 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Shield className="w-6 h-6 text-red-300" />
                      <h2 className="text-xl font-bold text-red-100 uppercase tracking-wider">
                        Compliance Screening
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-red-400/30">
                        <p className="text-xs font-semibold text-red-300 uppercase mb-2">
                          Sanctions Check
                        </p>
                        <p className={`text-lg font-bold ${result.complianceScreening.sanctionsCheck === 'Passed' || result.complianceScreening.sanctionsCheck === 'Cleared' ? 'text-emerald-300' : 'text-red-300'}`}>
                          {result.complianceScreening.sanctionsCheck}
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-red-400/30">
                        <p className="text-xs font-semibold text-red-300 uppercase mb-2">
                          AML Risk
                        </p>
                        <p className={`text-lg font-bold ${result.complianceScreening.amlRisk === 'Low' ? 'text-emerald-300' : result.complianceScreening.amlRisk === 'Moderate' ? 'text-amber-300' : 'text-red-300'}`}>
                          {result.complianceScreening.amlRisk}
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-red-400/30">
                        <p className="text-xs font-semibold text-red-300 uppercase mb-2">
                          Jurisdiction
                        </p>
                        <p className={`text-lg font-bold ${result.complianceScreening.jurisdictionRestrictions === 'None' ? 'text-emerald-300' : 'text-red-300'}`}>
                          {result.complianceScreening.jurisdictionRestrictions}
                        </p>
                      </div>
                      <div className="bg-white/10 backdrop-blur rounded-lg p-4 border border-red-400/30">
                        <p className="text-xs font-semibold text-red-300 uppercase mb-2">
                          Result
                        </p>
                        <p className={`text-lg font-bold ${result.complianceScreening.screeningResult.includes('Cleared') ? 'text-emerald-300' : 'text-amber-300'}`}>
                          {result.complianceScreening.screeningResult}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Payment Policy Engine */}
                  <div className="bg-gradient-to-br from-purple-500/20 via-purple-500/10 to-violet-600/20 border border-purple-400/40 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <Lock className="w-6 h-6 text-purple-300" />
                      <h2 className="text-xl font-bold text-purple-100 uppercase tracking-wider">
                        Payment Policy Engine
                      </h2>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: 'Max Blockchain Settlement Rail Threshold', value: result.policyConstraints.maxBlockchainSettlementRailThreshold },
                        { label: 'High Compliance Rule', value: result.policyConstraints.highComplianceRule },
                        { label: 'Treasury Preference', value: result.policyConstraints.treasuryPreference },
                        { label: 'Preferred Rail Policy', value: result.policyConstraints.preferredRailPolicy }
                      ].map((policy, idx) => (
                        <div key={idx} className="bg-white/10 backdrop-blur rounded-lg p-4 border border-purple-400/30">
                          <p className="text-xs font-semibold text-purple-300 uppercase mb-1">
                            {policy.label}
                          </p>
                          <p className="text-sm font-bold text-purple-100">
                            {policy.value}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Alternative Rail Analysis */}
                  <div className="bg-white/5 rounded-lg p-6 border border-blue-400/20">
                    <p className="text-sm font-bold text-blue-300 mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Alternative Rail Analysis
                    </p>
                    <div className="space-y-3">
                      <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-400/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-200 font-semibold">Traditional Banking Rail</span>
                          <span className="text-blue-300 font-bold">{result.decisionScorecard.bankWire}%</span>
                        </div>
                        <p className="text-xs text-blue-300/70">Traditional, higher cost, slower settlement</p>
                      </div>
                      <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-400/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-purple-200 font-semibold">Card Network Rail</span>
                          <span className="text-purple-300 font-bold">{result.decisionScorecard.cardNetwork}%</span>
                        </div>
                        <p className="text-xs text-purple-300/70">Fast but higher fees, compliance friction</p>
                      </div>
                      <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-400/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-emerald-200 font-semibold">Blockchain Settlement Rail</span>
                          <span className="text-emerald-300 font-bold">{result.decisionScorecard.stablecoin}%</span>
                        </div>
                        <p className="text-xs text-emerald-300/70">Optimal for this corridor - speed + cost efficiency</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Intelligence Tab */}
              {result && activeTab === 'intelligence' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Corridor Intelligence */}
                  <div className="bg-white/5 rounded-lg p-6 border border-emerald-400/20">
                    <p className="text-sm font-bold text-emerald-300 mb-4 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Corridor Intelligence: {result.corridorIntelligence.name}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded p-3">
                        <span className="text-slate-400 block text-xs mb-1">Remittance Demand</span>
                        <span className="text-emerald-200 font-semibold text-sm">{result.corridorIntelligence.remittanceDemand}</span>
                      </div>
                      <div className="bg-white/5 rounded p-3">
                        <span className="text-slate-400 block text-xs mb-1">Cross-border Efficiency</span>
                        <span className="text-emerald-200 font-semibold text-sm">{result.corridorIntelligence.efficiency}</span>
                      </div>
                      <div className="bg-white/5 rounded p-3">
                        <span className="text-slate-400 block text-xs mb-1">Banking Friction</span>
                        <span className="text-emerald-200 font-semibold text-sm">{result.corridorIntelligence.friction}</span>
                      </div>
                      <div className="bg-white/5 rounded p-3">
                        <span className="text-slate-400 block text-xs mb-1">Blockchain Settlement Rail Suitability</span>
                        <span className="text-emerald-200 font-semibold text-sm">{result.corridorIntelligence.stablecoinSuitability}</span>
                      </div>
                      <div className="bg-white/5 rounded p-3 md:col-span-2">
                        <span className="text-slate-400 block text-xs mb-1">Regulatory Sensitivity</span>
                        <span className="text-emerald-200 font-semibold text-sm">{result.corridorIntelligence.regulatory}</span>
                      </div>
                    </div>
                  </div>

                  {/* Corridor Risk Indicator */}
                  <div className="bg-white/5 rounded-lg p-6 border border-amber-400/20">
                    <p className="text-sm font-bold text-amber-300 mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Corridor Risk Indicator
                    </p>
                    <div className="space-y-4">
                      {[
                        { label: 'Compliance Risk', value: result.riskScores.compliance, color: 'emerald' },
                        { label: 'Settlement Risk', value: result.riskScores.settlement, color: 'blue' },
                        { label: 'FX Volatility', value: result.riskScores.fxVolatility, color: 'purple' },
                        { label: 'Overall Risk', value: result.riskScores.overall, color: 'amber' }
                      ].map((risk, idx) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-${risk.color}-200 font-semibold text-sm`}>{risk.label}</span>
                            <span className={`text-${risk.color}-300 font-bold`}>{risk.value}/10</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className={`bg-gradient-to-r from-${risk.color}-500 to-${risk.color}-400 h-2 rounded-full`}
                              style={{ width: `${(risk.value / 10) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Market Signals */}
                  <div className="bg-white/5 rounded-lg p-6 border border-cyan-400/20">
                    <p className="text-sm font-bold text-cyan-300 mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Real-Time Market Signals
                    </p>
                    <div className="space-y-3">
                      {[
                        { label: 'Network Congestion', value: result.marketSignals.networkCongestion },
                        { label: 'FX Volatility', value: result.marketSignals.fxVolatility },
                        { label: 'Liquidity Trend', value: result.marketSignals.liquidityTrend },
                        { label: 'Corridor Demand', value: result.marketSignals.corridorDemand },
                        { label: 'Settlement Conditions', value: result.marketSignals.settlementConditions }
                      ].map((signal, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-white/5 rounded p-3">
                          <span className="text-cyan-200 font-semibold text-sm">{signal.label}</span>
                          <span className="text-cyan-300 font-bold text-sm">{signal.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategic Insight */}
                  <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-6 border border-purple-400/20">
                    <p className="text-sm font-semibold text-purple-300 mb-3">Strategic Intelligence</p>
                    <p className="text-sm text-purple-200/80 leading-relaxed mb-4">
                      Blockchain Settlement Rails are being evaluated here not only as a payment method but as a programmable settlement layer that can complement traditional rails depending on speed, cost, and compliance requirements.
                    </p>
                    <p className="text-sm text-purple-200/80 leading-relaxed">
                      In high-friction corridors, they offer an alternative to correspondent banking networks, reducing settlement times and costs while maintaining compliance standards.
                    </p>
                  </div>
                </div>
              )}

              {/* Infrastructure Tab */}
              {result && activeTab === 'infrastructure' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Rail Performance Dashboard - placeholder using existing data */}
                  <div className="col-span-full bg-gradient-to-br from-violet-500/10 to-blue-500/10 rounded-lg p-6 border border-violet-400/20">
                    <p className="text-sm font-bold text-violet-300 mb-4">Rail Performance Dashboard</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { name: 'Traditional Banking Rail', score: result.decisionScorecard.bankWire, status: 'Operational' },
                        { name: 'Card Network Rail', score: result.decisionScorecard.cardNetwork, status: 'Operational' },
                        { name: 'Blockchain Settlement Rail', score: result.decisionScorecard.stablecoin, status: 'Optimal' }
                      ].map((rail, idx) => (
                        <div key={idx} className="bg-white/5 rounded-lg p-4 border border-violet-400/20">
                          <p className="text-violet-200 font-semibold mb-2">{rail.name}</p>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs text-slate-400">Performance</span>
                            <span className="text-violet-300 font-bold">{rail.score}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                            <div
                              className="bg-gradient-to-r from-violet-500 to-violet-400 h-2 rounded-full"
                              style={{ width: `${rail.score}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-emerald-400">{rail.status}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Liquidity Status */}
                  <div className="bg-white/5 rounded-lg p-6 border border-emerald-400/20">
                    <p className="text-sm font-bold text-emerald-300 mb-4">Liquidity Status</p>
                    <div className="space-y-4">
                      <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-400/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-emerald-200 font-semibold">Blockchain Settlement Rail Pools</span>
                          <span className="text-emerald-300 font-bold">High</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full" style={{ width: '85%' }}></div>
                        </div>
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-400/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-200 font-semibold">Fiat Reserves</span>
                          <span className="text-blue-300 font-bold">Adequate</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-blue-500 to-blue-400 h-2 rounded-full" style={{ width: '70%' }}></div>
                        </div>
                      </div>
                      <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-400/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-purple-200 font-semibold">Provider Availability</span>
                          <span className="text-purple-300 font-bold">98.5%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Network Status */}
                  <div className="bg-white/5 rounded-lg p-6 border border-blue-400/20">
                    <p className="text-sm font-bold text-blue-300 mb-4 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Network Status
                    </p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between bg-white/5 rounded p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                          <span className="text-blue-200 font-semibold text-sm">SWIFT Network</span>
                        </div>
                        <span className="text-emerald-400 font-bold text-sm">Online</span>
                      </div>
                      <div className="flex items-center justify-between bg-white/5 rounded p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                          <span className="text-blue-200 font-semibold text-sm">Card Network Rails</span>
                        </div>
                        <span className="text-emerald-400 font-bold text-sm">Online</span>
                      </div>
                      <div className="flex items-center justify-between bg-white/5 rounded p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                          <span className="text-blue-200 font-semibold text-sm">Blockchain Networks</span>
                        </div>
                        <span className="text-emerald-400 font-bold text-sm">Online</span>
                      </div>
                      <div className="flex items-center justify-between bg-white/5 rounded p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                          <span className="text-blue-200 font-semibold text-sm">Settlement Rails</span>
                        </div>
                        <span className="text-emerald-400 font-bold text-sm">Online</span>
                      </div>
                    </div>
                  </div>

                  {/* Rail Availability */}
                  <div className="col-span-full bg-white/5 rounded-lg p-6 border border-slate-600/50">
                    <p className="text-sm font-bold text-slate-300 mb-4">Multi-Rail Availability Matrix</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-400/20 text-center">
                        <p className="text-blue-300 font-semibold mb-2">Traditional Banking Rail</p>
                        <p className="text-2xl font-bold text-blue-200 mb-1">Available</p>
                        <p className="text-xs text-blue-300/70">2-3 day settlement</p>
                      </div>
                      <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-400/20 text-center">
                        <p className="text-purple-300 font-semibold mb-2">Card Network Rail</p>
                        <p className="text-2xl font-bold text-purple-200 mb-1">Available</p>
                        <p className="text-xs text-purple-300/70">Instant - 1 day</p>
                      </div>
                      <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-400/20 text-center">
                        <p className="text-emerald-300 font-semibold mb-2">Blockchain Settlement Rail</p>
                        <p className="text-2xl font-bold text-emerald-200 mb-1">Available</p>
                        <p className="text-xs text-emerald-300/70">Minutes to hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Simulation Tab */}
              {result && activeTab === 'simulation' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Settlement Flow Visualization */}
                  <div className="bg-white/5 rounded-lg p-6 border border-emerald-400/20">
                    <p className="text-sm font-bold text-emerald-300 mb-4 flex items-center gap-2">
                      <TrendingDown className="w-4 h-4" />
                      Settlement Flow: {result.recommended}
                    </p>
                    {result.recommended === 'Blockchain Settlement Rail' && (
                      <div className="flex items-center justify-between">
                        <div className="flex-1 text-center bg-emerald-500/10 rounded-lg p-3 border border-emerald-400/30">
                          <p className="text-xs text-emerald-300 font-semibold">Originating Wallet</p>
                          <p className="text-xs text-slate-400 mt-1">Initiation</p>
                        </div>
                        <div className="px-2">
                          <div className="text-emerald-400">→</div>
                        </div>
                        <div className="flex-1 text-center bg-emerald-500/10 rounded-lg p-3 border border-emerald-400/30">
                          <p className="text-xs text-emerald-300 font-semibold">Blockchain</p>
                          <p className="text-xs text-slate-400 mt-1">Validation</p>
                        </div>
                        <div className="px-2">
                          <div className="text-emerald-400">→</div>
                        </div>
                        <div className="flex-1 text-center bg-emerald-500/10 rounded-lg p-3 border border-emerald-400/30">
                          <p className="text-xs text-emerald-300 font-semibold">Recipient Wallet</p>
                          <p className="text-xs text-slate-400 mt-1">Settlement</p>
                        </div>
                      </div>
                    )}
                    {result.recommended === 'Traditional Banking Rail' && (
                      <div className="flex items-center justify-between">
                        <div className="flex-1 text-center bg-blue-500/10 rounded-lg p-3 border border-blue-400/30">
                          <p className="text-xs text-blue-300 font-semibold">Originating Bank</p>
                          <p className="text-xs text-slate-400 mt-1">Initiation</p>
                        </div>
                        <div className="px-2">
                          <div className="text-blue-400">→</div>
                        </div>
                        <div className="flex-1 text-center bg-blue-500/10 rounded-lg p-3 border border-blue-400/30">
                          <p className="text-xs text-blue-300 font-semibold">SWIFT Network</p>
                          <p className="text-xs text-slate-400 mt-1">Processing</p>
                        </div>
                        <div className="px-2">
                          <div className="text-blue-400">→</div>
                        </div>
                        <div className="flex-1 text-center bg-blue-500/10 rounded-lg p-3 border border-blue-400/30">
                          <p className="text-xs text-blue-300 font-semibold">Recipient Bank</p>
                          <p className="text-xs text-slate-400 mt-1">Settlement</p>
                        </div>
                      </div>
                    )}
                    {result.recommended === 'Card Network Rail' && (
                      <div className="flex items-center justify-between">
                        <div className="flex-1 text-center bg-purple-500/10 rounded-lg p-3 border border-purple-400/30">
                          <p className="text-xs text-purple-300 font-semibold">Cardholder</p>
                          <p className="text-xs text-slate-400 mt-1">Initiation</p>
                        </div>
                        <div className="px-2">
                          <div className="text-purple-400">→</div>
                        </div>
                        <div className="flex-1 text-center bg-purple-500/10 rounded-lg p-3 border border-purple-400/30">
                          <p className="text-xs text-purple-300 font-semibold">Card Network Rail</p>
                          <p className="text-xs text-slate-400 mt-1">Authorization</p>
                        </div>
                        <div className="px-2">
                          <div className="text-purple-400">→</div>
                        </div>
                        <div className="flex-1 text-center bg-purple-500/10 rounded-lg p-3 border border-purple-400/30">
                          <p className="text-xs text-purple-300 font-semibold">Merchant</p>
                          <p className="text-xs text-slate-400 mt-1">Settlement</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Autonomous Payment Negotiation */}
                  <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-lg p-6 border border-cyan-400/30">
                    <p className="text-sm font-bold text-cyan-300 mb-4 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      Autonomous Payment Negotiation
                    </p>
                    <div className="space-y-3">
                      <div className="bg-white/5 rounded p-3">
                        <span className="text-slate-400 block text-xs mb-1">Payer Preference</span>
                        <span className="text-cyan-200 font-semibold text-sm">{result.negotiation.payerPref}</span>
                      </div>
                      <div className="bg-white/5 rounded p-3">
                        <span className="text-slate-400 block text-xs mb-1">Recipient Preference</span>
                        <span className="text-cyan-200 font-semibold text-sm">{result.negotiation.recipientPref}</span>
                      </div>
                      <div className="bg-cyan-500/10 rounded p-3 border border-cyan-400/30">
                        <span className="text-cyan-400 block text-xs font-bold mb-1">AI Negotiation Outcome</span>
                        <span className="text-cyan-200 font-semibold text-sm">{result.negotiation.outcome}</span>
                      </div>
                      <div className="bg-white/5 rounded p-3">
                        <span className="text-slate-400 block text-xs mb-1">Explanation</span>
                        <span className="text-cyan-200/80 text-xs leading-relaxed">{result.negotiation.explanation}</span>
                      </div>
                    </div>
                  </div>

                  {/* Execution Simulation */}
                  <div className="bg-white/5 rounded-lg p-6 border border-violet-400/20">
                    <p className="text-sm font-bold text-violet-300 mb-4">Execution Simulation</p>
                    <div className="space-y-4">
                      <div className="bg-violet-500/10 rounded-lg p-4 border border-violet-400/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-violet-200 font-semibold text-sm">Expected Settlement</span>
                          <span className="text-violet-300 font-bold">{result.settlementTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-violet-300/70">
                          <Clock className="w-3 h-3" />
                          <span>Based on current network conditions</span>
                        </div>
                      </div>
                      <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-400/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-emerald-200 font-semibold text-sm">Success Probability</span>
                          <span className="text-emerald-300 font-bold">{result.settlementProbability[result.recommended.toLowerCase().replace(' ', '')]}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-emerald-500 to-emerald-400 h-2 rounded-full"
                            style={{ width: `${result.settlementProbability[result.recommended.toLowerCase().replace(' ', '')]}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-400/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-200 font-semibold text-sm">Estimated Cost</span>
                          <span className="text-blue-300 font-bold">{result.costImpact}</span>
                        </div>
                        <p className="text-xs text-blue-300/70">Including all fees and FX costs</p>
                      </div>
                    </div>
                  </div>

                  {/* What-If Simulation */}
                  <div className="bg-white/5 rounded-lg p-6 border border-amber-400/20">
                    <p className="text-sm font-bold text-amber-300 mb-4">What-If Simulation</p>
                    <div className="space-y-3">
                      <div className="bg-amber-500/10 rounded-lg p-4 border border-amber-400/20">
                        <p className="text-amber-200 font-semibold text-sm mb-2">If Amount Doubled</p>
                        <p className="text-xs text-amber-300/80">Recommendation would remain {result.recommended}</p>
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-400/20">
                        <p className="text-blue-200 font-semibold text-sm mb-2">If Urgency Changed to High</p>
                        <p className="text-xs text-blue-300/80">Would prioritize Card Network Rail or Blockchain Settlement Rail</p>
                      </div>
                      <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-400/20">
                        <p className="text-purple-200 font-semibold text-sm mb-2">If Compliance Risk Increased</p>
                        <p className="text-xs text-purple-300/80">Would default to Traditional Banking Rail for safety</p>
                      </div>
                      <div className="bg-emerald-500/10 rounded-lg p-4 border border-emerald-400/20">
                        <p className="text-emerald-200 font-semibold text-sm mb-2">Corridor-Specific Insights</p>
                        <p className="text-xs text-emerald-300/80">{result.corridorIntelligence.name}: {result.corridorIntelligence.stablecoinSuitability}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
                </div>
              )}

              {!result && (
                <div className="border-2 border-dashed border-slate-600 rounded-2xl p-12 text-center">
                  <AlertCircle className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                  <p className="text-slate-400 font-medium">
                    Configure your payment request and click{' '}
                    <span className="text-blue-400">Run AI Decision</span> to receive a
                    recommendation
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-8 border-t border-slate-700/50 text-center">
        <p className="text-slate-500 text-sm">
          Prototype concept and design by Avik
        </p>
      </div>
    </div>
  );
}
