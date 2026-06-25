"use client";

import { useState, useMemo, useEffect } from "react";
import { CalendarDays, Clock, Calculator, Check, ArrowLeft, ArrowRight, Copy, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface DayData {
  dateStr: string; // "YYYY-MM-DD"
  dayNumber: string; // "01", "02"
  dayName: string; // "Mon", "Tue"
  isWeekend: boolean;
  hours: string;
}

export default function HoursCalculator() {
  const [monthYear, setMonthYear] = useState("");
  const [includeWeekdays, setIncludeWeekdays] = useState(true);
  const [includeWeekends, setIncludeWeekends] = useState(false);
  const [defaultHours, setDefaultHours] = useState("08");

  const [days, setDays] = useState<DayData[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    // Set default month to current month
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    setMonthYear(`${yyyy}-${mm}`);
  }, []);

  const handleGenerate = () => {
    if (!monthYear) return;
    const [year, month] = monthYear.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    
    const newDays: DayData[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dateObj = new Date(year, month - 1, i);
      const dayOfWeek = dateObj.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      
      let hrs = "00";
      if (isWeekend && includeWeekends) hrs = defaultHours;
      if (!isWeekend && includeWeekdays) hrs = defaultHours;

      // Ensure 2 digits for hours initially if it's a whole number
      if (hrs !== "00" && !hrs.includes(".")) {
        hrs = String(Number(hrs)).padStart(2, '0');
      }

      newDays.push({
        dateStr: `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`,
        dayNumber: String(i).padStart(2, '0'),
        dayName: dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
        isWeekend,
        hours: hrs,
      });
    }
    setDays(newDays);
  };

  const handleHourChange = (index: number, val: string) => {
    const updated = [...days];
    updated[index].hours = val;
    setDays(updated);
  };

  const adjustHours = (index: number, amount: number) => {
    const current = parseFloat(days[index].hours || "0");
    const newAmount = Math.max(0, current + amount);
    let newStr = String(newAmount);
    if (!newStr.includes(".")) {
      newStr = newStr.padStart(2, '0');
    }
    handleHourChange(index, newStr);
  };

  const totalHours = useMemo(() => {
    return days.reduce((sum, day) => sum + (parseFloat(day.hours) || 0), 0);
  }, [days]);

  const handleCopy = () => {
    if (days.length === 0) return;
    
    let copyText = `Timesheet: ${monthYear}\n\n`;
    days.forEach(day => {
      copyText += `${day.dayNumber} - ${day.hours}\n`;
    });
    copyText += `\nTotal: ${totalHours.toFixed(1).replace(/\.0$/, '')} hrs`;
    
    navigator.clipboard.writeText(copyText).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };


  return (
    <div className="min-h-screen hero-bg flex flex-col items-center pt-24 pb-16 px-6 relative z-10 text-white font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-white mb-8 transition-colors text-sm font-mono uppercase tracking-wider">
          <ArrowLeft size={16} /> Back to Hub
        </Link>
        
        <div className="mb-10 anim-1">
          <h1 className="font-display text-4xl md:text-5xl font-semibold mb-4 text-[#EDF2F7]">
            Hours <span className="gold-gradient">Calculator</span>
          </h1>
          <p className="text-[var(--text-muted)] max-w-xl">
            Configure your standard working hours and instantly generate a timesheet for any month. Adjust hours for public holidays or overtime below.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          
          {/* Controls Panel */}
          <div className="md:col-span-4 space-y-6 anim-2">
            <div className="card p-6 rounded-sm shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-[var(--navy-border)] group-hover:bg-[var(--gold)] transition-colors duration-300"></div>
              <h2 className="text-lg font-semibold mb-6 flex items-center gap-2 text-white">
                <CalendarDays size={18} className="text-[var(--gold)]" /> Parameters
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-2">Month & Year</label>
                  <input 
                    type="month" 
                    value={monthYear}
                    onChange={(e) => setMonthYear(e.target.value)}
                    className="w-full bg-[var(--navy)] border border-[var(--navy-border)] focus:border-[var(--gold)] rounded-sm px-4 py-2 text-white outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-[var(--text-muted)] uppercase mb-2">Default Daily Hours</label>
                  <div className="relative">
                    <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                    <input 
                      type="number" 
                      step="0.5"
                      min="0"
                      value={defaultHours}
                      onChange={(e) => setDefaultHours(e.target.value)}
                      className="w-full bg-[var(--navy)] border border-[var(--navy-border)] focus:border-[var(--gold)] rounded-sm pl-10 pr-4 py-2 text-white outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${includeWeekdays ? 'bg-[var(--gold)] border-[var(--gold)]' : 'border-[var(--navy-border)] group-hover:border-[var(--text-muted)]'}`}>
                      {includeWeekdays && <Check size={14} className="text-white" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={includeWeekdays} 
                      onChange={(e) => setIncludeWeekdays(e.target.checked)} 
                    />
                    <span className="text-sm text-[var(--text-body)] group-hover:text-white transition-colors">Include Weekdays</span>
                  </label>
                  
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${includeWeekends ? 'bg-[var(--gold)] border-[var(--gold)]' : 'border-[var(--navy-border)] group-hover:border-[var(--text-muted)]'}`}>
                      {includeWeekends && <Check size={14} className="text-white" />}
                    </div>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={includeWeekends} 
                      onChange={(e) => setIncludeWeekends(e.target.checked)} 
                    />
                    <span className="text-sm text-[var(--text-body)] group-hover:text-white transition-colors">Include Weekends</span>
                  </label>
                </div>

                <button 
                  onClick={handleGenerate}
                  className="w-full btn-gold px-6 py-3 rounded-sm text-sm font-semibold flex items-center justify-center gap-2 mt-4"
                >
                  <Calculator size={16} /> Generate Timesheet
                </button>
              </div>
            </div>

            {days.length > 0 && (
              <div className="card p-6 rounded-sm shadow-xl bg-gradient-to-br from-[var(--navy-card)] to-[var(--navy)] anim-3 border border-[var(--navy-border)]">
                <p className="text-xs font-mono text-[var(--text-muted)] uppercase mb-2">Total Hours</p>
                <div className="flex items-end gap-2">
                  <span className="text-5xl font-display font-semibold gold-gradient">{totalHours.toFixed(1).replace(/\.0$/, '')}</span>
                  <span className="text-[var(--text-muted)] mb-1.5">hrs</span>
                </div>
              </div>
            )}
          </div>

          {/* Results Panel */}
          <div className="md:col-span-8 anim-3">
            {days.length === 0 ? (
              <div className="h-full min-h-[300px] border border-dashed border-[var(--navy-border)] rounded-sm flex flex-col items-center justify-center text-[var(--text-muted)] bg-[var(--navy-card)] bg-opacity-50">
                <CalendarDays size={48} className="mb-4 opacity-20" />
                <p>Configure parameters and generate to view timesheet.</p>
              </div>
            ) : (
              <div className="card rounded-sm overflow-hidden border border-[var(--navy-border)] shadow-2xl flex flex-col">
                {/* Table Header */}
                <div className="grid grid-cols-2 bg-[rgba(0,0,0,0.85)] border-b border-[var(--navy-border)] p-4 text-xs font-mono text-[var(--gold)] uppercase tracking-wider">
                  <div className="pl-1">Date</div>
                  <div className="text-center">Hours</div>
                </div>
                
                {/* Table Body */}
                <div className="overflow-y-auto max-h-[600px] bg-[var(--navy)]">
                  {days.map((day, index) => (
                    <div 
                      key={day.dateStr} 
                      className={`grid grid-cols-2 items-center p-3 border-b border-[var(--navy-border)] hover:bg-[var(--navy-card)] transition-colors ${day.isWeekend ? 'bg-[var(--navy-mid)]' : ''}`}
                    >
                      <div className="flex items-center gap-3 pl-1">
                        <span className={`font-mono text-lg ${day.isWeekend ? 'text-[var(--text-muted)]' : 'text-white'}`}>
                          {day.dayNumber}
                        </span>
                        <span className={`text-xs uppercase tracking-wider ${day.isWeekend ? 'text-[var(--text-muted)] opacity-50' : 'text-[var(--text-muted)]'}`}>
                          {day.dayName}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 justify-center">
                        <button 
                          onClick={() => adjustHours(index, -0.5)}
                          className="w-7 h-7 flex items-center justify-center rounded-sm bg-[var(--navy-border)] hover:bg-[var(--gold)] text-white transition-colors"
                        >
                          -
                        </button>
                        <input 
                          type="number" 
                          step="0.5"
                          min="0"
                          value={day.hours}
                          onChange={(e) => handleHourChange(index, e.target.value)}
                          className={`w-14 bg-transparent border-b border-transparent hover:border-[var(--navy-border)] focus:border-[var(--gold)] focus:bg-[var(--navy-card)] px-1 py-1 text-center font-mono transition-all outline-none rounded-sm appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${parseFloat(day.hours) > 0 ? 'text-[var(--gold-light)] font-semibold' : 'text-[var(--text-muted)]'}`}
                        />
                        <button 
                          onClick={() => adjustHours(index, 0.5)}
                          className="w-7 h-7 flex items-center justify-center rounded-sm bg-[var(--navy-border)] hover:bg-[var(--gold)] text-white transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Table Footer */}
                <div className="bg-[rgba(0,0,0,0.85)] border-t border-[var(--navy-border)] p-4 flex justify-between items-center">
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--text-muted)] hover:text-white transition-colors"
                  >
                    {isCopied ? <CheckCircle2 size={16} className="text-green-400" /> : <Copy size={16} />}
                    {isCopied ? 'Copied!' : 'Copy to Clipboard'}
                  </button>
                  <div className="text-right flex items-center">
                    <span className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider mr-4 hidden sm:inline">Monthly Total</span>
                    <span className="text-xl font-display font-semibold text-white">{totalHours.toFixed(1).replace(/\.0$/, '')} <span className="text-sm text-[var(--gold)]">HRS</span></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
