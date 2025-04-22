'use client';

import { useState } from 'react';

export default function SettingsForms() {
  const [workingTimeValues, setWorkingTimeValues] = useState({
    workdayHours: 8,
    monthlyHours: 168,
    monthlyWorkdays: 21,
    monthsPerYear: 12
  });
  
  const [currencyValues, setCurrencyValues] = useState({
    czk: 0.041,
    chf: 1.05,
    gbp: 1.17,
    zar: 0.051
  });
  
  const [isSubmittingWorkingTime, setIsSubmittingWorkingTime] = useState(false);
  const [isSubmittingCurrency, setIsSubmittingCurrency] = useState(false);
  const [workingTimeError, setWorkingTimeError] = useState('');
  const [currencyError, setCurrencyError] = useState('');
  const [workingTimeSuccess, setWorkingTimeSuccess] = useState(false);
  const [currencySuccess, setCurrencySuccess] = useState(false);

  const handleWorkingTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWorkingTimeValues(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrencyValues(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const handleWorkingTimeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingWorkingTime(true);
    setWorkingTimeError('');
    setWorkingTimeSuccess(false);

    try {
      const response = await fetch('/api/settings/working-time', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(workingTimeValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update working time reference');
      }

      setWorkingTimeSuccess(true);
    } catch (err) {
      setWorkingTimeError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmittingWorkingTime(false);
    }
  };

  const handleCurrencySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmittingCurrency(true);
    setCurrencyError('');
    setCurrencySuccess(false);

    try {
      const response = await fetch('/api/settings/currency-exchange', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currencyValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update currency exchange rates');
      }

      setCurrencySuccess(true);
    } catch (err) {
      setCurrencyError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmittingCurrency(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Working Time Reference</h2>
        
        {workingTimeError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{workingTimeError}</p>
          </div>
        )}
        
        {workingTimeSuccess && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-green-700">Working time reference updated successfully!</p>
          </div>
        )}
        
        <form onSubmit={handleWorkingTimeSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="workdayHours" className="block text-sm font-medium text-gray-700 mb-1">
                Workday Hours
              </label>
              <input
                type="number"
                id="workdayHours"
                name="workdayHours"
                value={workingTimeValues.workdayHours}
                onChange={handleWorkingTimeChange}
                min="1"
                step="0.5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="monthlyHours" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Hours
              </label>
              <input
                type="number"
                id="monthlyHours"
                name="monthlyHours"
                value={workingTimeValues.monthlyHours}
                onChange={handleWorkingTimeChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="monthlyWorkdays" className="block text-sm font-medium text-gray-700 mb-1">
                Monthly Workdays
              </label>
              <input
                type="number"
                id="monthlyWorkdays"
                name="monthlyWorkdays"
                value={workingTimeValues.monthlyWorkdays}
                onChange={handleWorkingTimeChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="monthsPerYear" className="block text-sm font-medium text-gray-700 mb-1">
                Months Per Year
              </label>
              <input
                type="number"
                id="monthsPerYear"
                name="monthsPerYear"
                value={workingTimeValues.monthsPerYear}
                onChange={handleWorkingTimeChange}
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmittingWorkingTime}
                className={`${
                  isSubmittingWorkingTime ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } text-white px-4 py-2 rounded-md`}
              >
                {isSubmittingWorkingTime ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Currency Exchange Rates (to EUR)</h2>
        
        {currencyError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
            <p className="text-red-700">{currencyError}</p>
          </div>
        )}
        
        {currencySuccess && (
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
            <p className="text-green-700">Currency exchange rates updated successfully!</p>
          </div>
        )}
        
        <form onSubmit={handleCurrencySubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="czk" className="block text-sm font-medium text-gray-700 mb-1">
                CZK
              </label>
              <input
                type="number"
                id="czk"
                name="czk"
                value={currencyValues.czk}
                onChange={handleCurrencyChange}
                min="0"
                step="0.001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="chf" className="block text-sm font-medium text-gray-700 mb-1">
                CHF
              </label>
              <input
                type="number"
                id="chf"
                name="chf"
                value={currencyValues.chf}
                onChange={handleCurrencyChange}
                min="0"
                step="0.001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="gbp" className="block text-sm font-medium text-gray-700 mb-1">
                GBP
              </label>
              <input
                type="number"
                id="gbp"
                name="gbp"
                value={currencyValues.gbp}
                onChange={handleCurrencyChange}
                min="0"
                step="0.001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="zar" className="block text-sm font-medium text-gray-700 mb-1">
                ZAR
              </label>
              <input
                type="number"
                id="zar"
                name="zar"
                value={currencyValues.zar}
                onChange={handleCurrencyChange}
                min="0"
                step="0.001"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmittingCurrency}
                className={`${
                  isSubmittingCurrency ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                } text-white px-4 py-2 rounded-md`}
              >
                {isSubmittingCurrency ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}