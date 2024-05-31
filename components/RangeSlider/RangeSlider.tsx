'use client';
import React, { ChangeEventHandler, useEffect, useRef } from 'react';
import './RangeSlider.css';

const minGap = 10;

interface RangeSliderProps {
  min?: number;
  max?: number;
  minValue?: number;
  maxValue?: number;
  setMinValue?: (value: number) => void;
  setMaxValue?: (value: number) => void;
}

// const [minValue, setMinValue] = useState(20);
// const [maxValue, setMaxValue] = useState(80);

const RangeSlider = ({
  min = 0,
  max = 100,
  minValue = min,
  maxValue = max,
  setMinValue = (value: number) => {},
  setMaxValue = (value: number) => {},
}: RangeSliderProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value <= maxValue - minGap) {
      setMinValue(value);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (value >= minValue + minGap) {
      setMaxValue(value);
    }
  };

  useEffect(() => {
    fillColor();
  }, [minValue, maxValue]);

  const fillColor = () => {
    const percent1 = (minValue / max) * 100;
    const percent2 = (maxValue / max) * 100;
    if (ref.current) {
      ref.current.style.background = `linear-gradient(to right, #ddd ${percent1}%, #007bff ${percent1}%, #007bff ${percent2}%, #ddd ${percent2}%)`;
    }
  };

  return (
    <div className="range-slider-wrap">
      <label className="range-slider-values">
        <output htmlFor="minValue">{minValue}</output>
        <span>цена</span>
        <output htmlFor="maxValue">{maxValue}</output>
      </label>
      <div className="range-slider py-3">
        <input
          id="minValue"
          type="range"
          step={100}
          min={min}
          max={max}
          value={minValue}
          onChange={handleMinChange}
        />
        <input
          id="maxValue"
          type="range"
          step={1000}
          min={min}
          max={max}
          value={maxValue}
          onChange={handleMaxChange}
        />
        <div className="slider-track" ref={ref}></div>
      </div>
    </div>
  );
};

export default RangeSlider;
