import React, { useState, useRef, useEffect } from 'react';
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from 'lucide-react';
import { useTheme } from '@/components/shared/contexts/ThemeContext';

interface DateTimeDropdownProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const DateTimeDropdown: React.FC<DateTimeDropdownProps> = ({
  value,
  onChange,
  placeholder = 'Select date',
  className = '',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(value || '');
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [position, setPosition] = useState<'top' | 'bottom' | 'left' | 'right'>('bottom');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const { currentTheme } = useTheme();

  // Handle selection
  useEffect(() => {
    if (value) {
      setSelectedDate(value);
      const date = new Date(value + 'T00:00:00');
      setCurrentMonth(date.getMonth());
      setCurrentYear(date.getFullYear());
    }
  }, [value]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Calculate dropdown position
  useEffect(() => {
    if (isOpen && buttonRef.current && contentRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const contentHeight = 450;
      const contentWidth = 320;
      
      const spaceTop = buttonRect.top;
      const spaceBottom = window.innerHeight - buttonRect.bottom;
      const spaceLeft = buttonRect.left;
      const spaceRight = window.innerWidth - buttonRect.right;
      
      const minSpace = 20;
      
      // Determine best vertical position first
      if (spaceBottom >= contentHeight + minSpace) {
        setPosition('bottom');
      } else if (spaceTop >= contentHeight + minSpace) {
        setPosition('top');
      } else if (spaceRight >= contentWidth + minSpace) {
        setPosition('right');
      } else if (spaceLeft >= contentWidth + minSpace) {
        setPosition('left');
      } else {
        // Fallback: use direction with most space
        const spaces = { top: spaceTop, bottom: spaceBottom, left: spaceLeft, right: spaceRight };
        const bestDirection = Object.entries(spaces).reduce((prev, current) =>
          current[1] > prev[1] ? current : prev
        )[0] as 'top' | 'bottom' | 'left' | 'right';
        setPosition(bestDirection);
      }
    }
  }, [isOpen]);

  const handleDateSelect = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDate(dateStr);
    onChange(dateStr);
    setIsOpen(false);
  };

  const handleToday = () => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
    onChange(today);
    const date = new Date(today + 'T00:00:00');
    setCurrentMonth(date.getMonth());
    setCurrentYear(date.getFullYear());
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedDate('');
    onChange('');
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return placeholder;
    try {
      return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    const today = new Date().toISOString().split('T')[0];

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10" />);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isSelected = selectedDate === dateStr;
      const isToday = dateStr === today;

      days.push(
        <button
          key={day}
          onClick={() => handleDateSelect(day)}
          className={`h-8 text-xs font-normal rounded transition-all ${
            isSelected
              ? 'bg-green-500 text-white'
              : isToday
              ? currentTheme === 'dark'
                ? 'bg-gray-600 text-white'
                : 'bg-blue-100 text-blue-900'
              : currentTheme === 'dark'
              ? 'text-gray-300 hover:bg-gray-700'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        ref={buttonRef}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-3 py-1.5 text-sm text-left border rounded-lg font-normal transition-all flex items-center justify-between gap-2 ${
          currentTheme === 'dark'
            ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600 disabled:opacity-50'
            : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50 disabled:opacity-50'
        } ${isOpen ? 'ring-2 ring-green-500' : ''}`}
      >
        <span className={`text-sm ${selectedDate ? '' : 'text-gray-500'}`}>
          {formatDate(selectedDate)}
        </span>
        <CalendarIcon className="w-4 h-4 flex-shrink-0" />
      </button>

      {isOpen && (
        <div
          ref={contentRef}
          className={`absolute z-50 rounded-lg border shadow-2xl p-3 transition-all ${
            position === 'bottom'
              ? 'top-full left-0 mt-1.5 w-full sm:w-72'
              : position === 'top'
              ? 'bottom-full left-0 mb-1.5 w-full sm:w-72'
              : position === 'right'
              ? 'left-full top-0 ml-1.5 w-72 max-h-96 overflow-y-auto'
              : 'right-full top-0 mr-1.5 w-72 max-h-96 overflow-y-auto'
          } ${
            currentTheme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => {
                setCurrentMonth(prevMonth);
                setCurrentYear(prevYear);
              }}
              className={`p-1 rounded-lg transition-all ${
                currentTheme === 'dark'
                  ? 'hover:bg-gray-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>

            <div className="flex-1 text-center">
              <div className="text-sm font-semibold">
                {months[currentMonth]} {currentYear}
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentMonth(nextMonth);
                setCurrentYear(nextYear);
              }}
              className={`p-1 rounded-lg transition-all ${
                currentTheme === 'dark'
                  ? 'hover:bg-gray-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d} className={`h-8 flex items-center justify-center text-xs font-normal ${
                currentTheme === 'dark' ? 'text-gray-400' : 'text-gray-500'
              }`}>
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {renderDays()}
          </div>

          {/* Action buttons */}
          <div className="flex gap-1.5">
            <button
              onClick={handleToday}
              className={`flex-1 py-1.5 px-2 text-xs rounded-lg font-normal transition-all ${
                currentTheme === 'dark'
                  ? 'bg-green-600/20 text-green-400 hover:bg-green-600/30'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              Today
            </button>
            <button
              onClick={handleClear}
              className={`flex-1 py-1.5 px-2 text-xs rounded-lg font-normal transition-all flex items-center justify-center gap-1 ${
                currentTheme === 'dark'
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <XIcon className="w-3 h-3" />
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateTimeDropdown;
