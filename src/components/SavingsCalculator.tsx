import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const formatEUR = (value: number, locale: string = "fi-FI") =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

const formatNumber = (value: number, decimals: number = 1, locale: string = "fi-FI") => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
};

// Animated number component
const AnimatedNumber: React.FC<{ value: number; format?: (val: number) => string }> = ({
  value,
  format = (v) => formatNumber(v, 1),
}) => {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    if (prevValueRef.current === value) return;

    const start = prevValueRef.current;
    const end = value;
    const duration = 500; // ms
    const startTime = Date.now();

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3);

      const current = start + (end - start) * eased;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };

    requestAnimationFrame(animate);
    prevValueRef.current = value;
  }, [value]);

  return <span>{format(displayValue)}</span>;
};

export const SavingsCalculator: React.FC = () => {
  const { language } = useLanguage();
  const isFinnish = language === "fi";
  const locale = isFinnish ? "fi-FI" : "en-GB";
  const [inquiriesPerWeek, setInquiriesPerWeek] = useState(40);
  const [minutesPerInquiry, setMinutesPerInquiry] = useState(8);
  const [automationRate, setAutomationRate] = useState(70);
  const [hourlyCost, setHourlyCost] = useState(25);

  // Calculations
  const totalMinutes = inquiriesPerWeek * minutesPerInquiry;
  const humanMinutes = totalMinutes * (1 - automationRate / 100);
  const weeklySavingsMinutes = totalMinutes - humanMinutes;
  const weeklySavingsCost = (weeklySavingsMinutes / 60) * hourlyCost;
  const monthlySavings = weeklySavingsCost * 4;
  const monthlyTimeSavings = weeklySavingsMinutes * 4 / 60; // hours per month
  const yearlySavings = weeklySavingsCost * 52;
  const yearlyTimeSavings = weeklySavingsMinutes * 52 / 60; // hours per year
  const AI_ADVISOR_PRO_MONTHLY = 103; // AI Advisor Pro monthly cost
  const netYearlySavings = yearlySavings - AI_ADVISOR_PRO_MONTHLY * 12; // AI Advisor Pro annual subscription
  const typicalROI = netYearlySavings > 0 ? (yearlySavings / (AI_ADVISOR_PRO_MONTHLY * 12)).toFixed(1) : "0.0";

  const getSliderBackground = (value: number, min: number, max: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return `linear-gradient(to right, white 0%, white ${percentage}%, rgba(255,255,255,0.1) ${percentage}%, rgba(255,255,255,0.1) 100%)`;
  };

  return (
    <section id="savings-calculator" className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl p-8 lg:p-12 bg-white/[0.02] backdrop-blur-xl border border-white/10">
          <h3 className="text-2xl font-medium text-white mb-6 text-center">
            {isFinnish ? "Säästölaskuri" : "Savings Calculator"}
          </h3>

          <div className="space-y-8">
            {/* Viikottaiset yhteydenotot Slider */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-300">
                  {isFinnish ? "Viikottaiset yhteydenotot" : "Weekly inquiries"}
                </label>
                <span className="text-xl font-medium text-white">
                  {inquiriesPerWeek}
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="200"
                step="5"
                value={inquiriesPerWeek}
                onChange={(e) => setInquiriesPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                style={{
                  background: getSliderBackground(inquiriesPerWeek, 10, 200),
                }}
              />
              <div className="relative mt-2 h-5">
                <span className="absolute left-0 text-xs text-gray-500 whitespace-nowrap">10</span>
                <span className="absolute left-[34.2%] -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">75</span>
                <span className="absolute left-[68.4%] -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">140</span>
                <span className="absolute right-0 text-xs text-gray-500 whitespace-nowrap">200</span>
              </div>
            </div>

            {/* Aika per vastaus Slider */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-300">
                  {isFinnish ? "Aika per vastaus (min)" : "Time per response (min)"}
                </label>
                <span className="text-xl font-medium text-white">
                  {minutesPerInquiry}
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                step="1"
                value={minutesPerInquiry}
                onChange={(e) => setMinutesPerInquiry(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                style={{
                  background: getSliderBackground(minutesPerInquiry, 3, 12),
                }}
              />
              <div className="relative mt-2 h-5">
                <span className="absolute left-0 text-xs text-gray-500 whitespace-nowrap">3</span>
                <span className="absolute left-[33.3%] -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">6</span>
                <span className="absolute left-[66.7%] -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">9</span>
                <span className="absolute right-0 text-xs text-gray-500 whitespace-nowrap">12</span>
              </div>
            </div>

            {/* Automaatioaste Slider */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-300">
                  {isFinnish ? "Automaatioaste" : "Automation rate"}
                </label>
                <span className="text-xl font-medium text-white">
                  {automationRate} %
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                step="5"
                value={automationRate}
                onChange={(e) => setAutomationRate(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                style={{
                  background: getSliderBackground(automationRate, 50, 90),
                }}
              />
              <div className="relative mt-2 h-5">
                <span className="absolute left-0 text-xs text-gray-500 whitespace-nowrap">50 %</span>
                <span className="absolute left-[37.5%] -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">65 %</span>
                <span className="absolute left-[75%] -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">80 %</span>
                <span className="absolute right-0 text-xs text-gray-500 whitespace-nowrap">90 %</span>
              </div>
            </div>

            {/* Tuntikustannus Slider */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="text-sm font-medium text-gray-300">
                  {isFinnish ? "Tuntikustannus" : "Hourly cost"}
                </label>
                <span className="text-xl font-medium text-white">
                  {hourlyCost} €
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="35"
                step="5"
                value={hourlyCost}
                onChange={(e) => setHourlyCost(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-white"
                style={{
                  background: getSliderBackground(hourlyCost, 20, 35),
                }}
              />
              <div className="relative mt-2 h-5">
                <span className="absolute left-0 text-xs text-gray-500 whitespace-nowrap">20 €</span>
                <span className="absolute left-[33.3%] -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">25 €</span>
                <span className="absolute left-[66.7%] -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">30 €</span>
                <span className="absolute right-0 text-xs text-gray-500 whitespace-nowrap">35 €</span>
              </div>
            </div>

            {/* Results Card */}
            <div className="pt-6 border-t border-white/10 bg-white/5 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  {isFinnish ? "Aikaa säästyy:" : "Time saved:"}
                </span>
                <span className="text-lg font-medium text-white">
                  <AnimatedNumber value={monthlyTimeSavings} format={(v) => formatNumber(v, 1, locale)} /> {isFinnish ? "h / kk" : "h / mo"}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  {isFinnish ? "Kustannuksia säästyy:" : "Cost savings:"}
                </span>
                <span className="text-lg font-medium text-white">
                  <AnimatedNumber value={monthlySavings} format={(v) => formatEUR(v, locale)} /> {isFinnish ? "/ kk" : "/ mo"}
                </span>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-white">
                    {isFinnish ? "Vuositasolla:" : "Yearly:"}
                  </span>
                </div>
                <div className="flex justify-between items-center pl-4">
                  <span className="text-sm text-gray-400">
                    {isFinnish ? "Aikaa säästyy:" : "Time saved:"}
                  </span>
                  <span className="text-lg font-medium text-white">
                    <AnimatedNumber value={yearlyTimeSavings} format={(v) => formatNumber(v, 1, locale)} /> {isFinnish ? "h / vuosi" : "h / year"}
                  </span>
                </div>
                <div className="flex justify-between items-center pl-4">
                  <span className="text-sm text-gray-400">
                    {isFinnish ? "Kustannuksia säästyy:" : "Cost savings:"}
                  </span>
                  <span className="text-2xl font-light text-white">
                    <AnimatedNumber value={yearlySavings} format={(v) => formatEUR(v, locale)} />
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  {isFinnish ? "Nettosäästö (AI Advisor huomioitu):" : "Net savings (AI Advisor included):"}
                </span>
                <span className="text-lg font-medium text-white">
                  <AnimatedNumber value={netYearlySavings} format={(v) => formatEUR(v, locale)} />
                </span>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <span className="text-base font-medium text-white">
                  {isFinnish ? "Tyypillinen ROI:" : "Typical ROI:"}
                </span>
                <span className="text-2xl font-light text-white">
                  {typicalROI}×
                </span>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-gray-500 text-center mt-6">
              {isFinnish
                ? "Arviot perustuvat toimialakeskiarvoihin. Tulokset voivat vaihdella. Hinnat sisältävät Mitrox AI Advisor Pro -vuosittaisen tilauksen."
                : "Estimates are based on industry averages. Results may vary. Prices include Mitrox AI Advisor Pro annual subscription."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SavingsCalculator;

