"use client";
import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Calculator = () => {
  const [selectedOption, setSelectedOption] = useState('option1');
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderValue2, setSliderValue2] = useState(9);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [results, setResults] = useState({
    result1: '',
    result2: '',
    result3: '',
    result4: '',
    result5: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (selectedOption === 'option1') {
      setInput1(20);
      setInput2(5);
      setInput3(20);
    } else if (selectedOption === 'option2') {
      setInput1(30);
      setInput2(2);
      setInput3(5);
    } else if (selectedOption === 'option3') {
      setInput1(30);
      setInput2(5);
      setInput3(15);
    }
  }, [selectedOption]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSliderChange = (e) => {
    setSliderValue(e.target.value);
  };

  const handleSliderChange2 = (e) => {
    setSliderValue2(e.target.value);
  };

  const handleCalculate = () => {
    const input1Value = parseFloat(input1) || 0;
    const input2Value = parseFloat(input2) || 0;
    const input3Value = parseFloat(input3) || 0;

    const result1 = (sliderValue * input1Value) / 100;
    const afterDownPayment = sliderValue - result1;
    const intrest = sliderValue2 * input2Value;
    const remainingAmountPlusIntrest = afterDownPayment + (afterDownPayment * (intrest / 100));
    const result2 = remainingAmountPlusIntrest / (input2Value * 12);
    const salaryUnit = 100 / input3Value;
    const result3 = result2 * salaryUnit;

    setResults({
      result1: result1.toFixed(2),
      result2: result2.toFixed(2),
      result3: result3.toFixed(2),
      result4: afterDownPayment.toFixed(2),
      result5: (remainingAmountPlusIntrest - afterDownPayment).toFixed(2),
    });

    if (sliderValue <= 1000) {
      setIsVideoVisible(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 100);
    } else {
      setIsVideoVisible(false);
    }

    setIsModalOpen(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Warikoo Calculator</h1>

      <div className="mb-4">
        <label htmlFor="option" className="block text-gray-700 mb-2">Choose option:</label>
        <select
          id="option"
          value={selectedOption}
          onChange={handleOptionChange}
          className="w-full p-3 border rounded-lg"
        >
          <option value="option1">Car Emi (20-5-30 rule)</option>
          <option value="option2">Expensive Phone Emi (30-2-5 rule)</option>
          <option value="option3">Bike Emi (30-5-15 rule)</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="slider" className="block text-gray-700 mb-2">Total Purchase Value (₹)</label>
        <input
          type="range"
          id="slider"
          min="0"
          max="50000000"
          value={sliderValue}
          onChange={handleSliderChange}
          className="w-full"
        />
        <input
          type="number"
          value={sliderValue}
          onChange={(e) => setSliderValue(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="slider2" className="block text-gray-700 mb-2">Bank Interest Value (%)</label>
        <input
          type="range"
          id="slider2"
          min="0"
          max="20"
          value={sliderValue2}
          onChange={handleSliderChange2}
          className="w-full"
        />
        <input
          type="number"
          value={sliderValue2}
          onChange={(e) => setSliderValue2(e.target.value)}
          className="w-full mt-2 p-3 border rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Downpayment Value in (%)</label>
        <input
          type="text"
          placeholder="Input 1"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />
        <label className="block text-gray-700 mb-2">Loan Tenure (Years)</label>
        <input
          type="text"
          placeholder="Input 2"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />
        <label className="block text-gray-700 mb-2">Percentage from your monthly salary (%)</label>
        <input
          type="text"
          placeholder="Input 3"
          value={input3}
          onChange={(e) => setInput3(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />
      </div>

      <div>
        <button
          onClick={handleCalculate}
          className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Calculate
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[800px] h-[700px] flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold mb-4">Approx salary should be ₹{results.result3}</h2>
            <h3 className="text-2xl font-bold mb-4">Downpayment Amount - ₹{results.result1}</h3>
            <h3 className="text-2xl font-bold mb-4">Approx Monthly Emi - ₹{results.result2}</h3>
            <h3 className="text-2xl font-bold mb-4">Total Loan Amount - ₹{results.result4}</h3>
            <h3 className="text-2xl font-bold mb-4">Total interest payable with {sliderValue2}% interest - ₹{results.result5}</h3>
            {showConfetti && <Confetti width={width} height={height} />}
            <button
              onClick={closeModal}
              className="mt-6 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
