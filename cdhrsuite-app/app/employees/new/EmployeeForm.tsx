'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormInput from '@/app/components/ui/FormInput';
import FormSelect from '@/app/components/ui/FormSelect';

export default function EmployeeForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const cooperationTypeOptions = [
    { value: 'Employee', label: 'Employee' },
    { value: 'Freelancer', label: 'Freelancer' },
    { value: 'External', label: 'External' },
  ];

  const statusOptions = [
    { value: 'Active', label: 'Active' },
    { value: 'Inactive', label: 'Inactive' },
    { value: 'On Leave', label: 'On Leave' },
  ];

  const workTypeOptions = [
    { value: 'Project-based', label: 'Project-based' },
    { value: 'Operations', label: 'Operations' },
    { value: 'Leadership', label: 'Leadership' },
  ];

  const blendedRateLevelOptions = [
    { value: 'A', label: 'A' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'D', label: 'D' },
    { value: 'E', label: 'E' },
    { value: 'F', label: 'F' },
    { value: 'G', label: 'G' },
  ];

  const blendedRateCountryOptions = [
    { value: 'CZ', label: 'Czech Republic (CZ)' },
    { value: 'DE', label: 'Germany (DE)' },
    { value: 'CH', label: 'Switzerland (CH)' },
    { value: 'SA', label: 'South Africa (SA)' },
    { value: 'UK', label: 'United Kingdom (UK)' },
    { value: 'GW', label: 'Global (GW)' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      const formValues = Object.fromEntries(formData.entries());

      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create employee');
      }

      router.push('/employees');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Personal Information</h2>
          <FormInput label="Full Name" name="fullName" required />
          <FormInput label="Personal Email" name="personalEmail" type="email" required />
          <FormInput label="Work Email" name="workEmail" type="email" />
          <FormInput label="Nationality" name="nationality" required />
          <FormInput label="Date of Birth" name="dateOfBirth" type="date" />
          <FormInput label="Address" name="address" />
          <FormInput label="Account Number" name="accountNumber" />
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">Job Information</h2>
          <FormInput label="Role Title" name="roleTitle" required />
          <FormSelect 
            label="Blended Rate Level" 
            name="blendedRateLevel" 
            options={blendedRateLevelOptions}
            required 
          />
          <FormSelect 
            label="Blended Rate Country" 
            name="blendedRateCountry" 
            options={blendedRateCountryOptions}
            required 
          />
          <FormInput label="Hay Grade" name="hayGrade" />
          <FormSelect 
            label="Type of Cooperation" 
            name="cooperationType" 
            options={cooperationTypeOptions}
            required 
          />
          <FormInput label="Department" name="department" required />
          <FormInput label="Team" name="team" />
          <FormInput label="Employee Start Date" name="employeeStartDate" type="date" required />
          <FormSelect 
            label="Status" 
            name="status" 
            options={statusOptions}
            required 
          />
          <FormSelect 
            label="Type of Work" 
            name="typeOfWork" 
            options={workTypeOptions}
            required 
          />
          <FormInput label="Weekly Allocation %" name="weeklyAllocation" type="number" min="0" max="100" />
          <FormInput label="Notes" name="notes" />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">Contract Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <FormInput label="Legal Entity" name="legalEntity" required />
            <FormInput label="Contract Type" name="contractType" required />
            <FormInput label="Contract Start Date" name="contractStartDate" type="date" required />
            <FormInput label="Contract End Date" name="contractEndDate" type="date" />
            <FormSelect 
              label="Contract Duration Type" 
              name="contractDurationType" 
              options={[
                { value: 'Limited', label: 'Limited' },
                { value: 'Unlimited', label: 'Unlimited' },
              ]}
              required 
            />
          </div>
          <div>
            <FormInput label="Fix Amount" name="fixAmount" type="number" step="0.01" required />
            <FormSelect 
              label="Fix Currency" 
              name="fixCurrency" 
              options={[
                { value: 'CZK', label: 'CZK' },
                { value: 'EUR', label: 'EUR' },
                { value: 'CHF', label: 'CHF' },
              ]}
              required 
            />
            <FormSelect 
              label="Fix Frequency" 
              name="fixFrequency" 
              options={[
                { value: 'Hourly', label: 'Hourly' },
                { value: 'Daily', label: 'Daily' },
                { value: 'Monthly', label: 'Monthly' },
                { value: 'Annual', label: 'Annual' },
              ]}
              required 
            />
            <FormInput label="Variable Amount" name="variableAmount" type="number" step="0.01" />
            <FormSelect 
              label="Variable Currency" 
              name="variableCurrency" 
              options={[
                { value: 'CZK', label: 'CZK' },
                { value: 'EUR', label: 'EUR' },
                { value: 'CHF', label: 'CHF' },
              ]}
            />
            <FormSelect 
              label="Variable Frequency" 
              name="variableFrequency" 
              options={[
                { value: 'Hourly', label: 'Hourly' },
                { value: 'Daily', label: 'Daily' },
                { value: 'Monthly', label: 'Monthly' },
                { value: 'Annual', label: 'Annual' },
              ]}
            />
            <FormSelect 
              label="Variable Type" 
              name="variableType" 
              options={[
                { value: 'KPI based', label: 'KPI based' },
                { value: 'Revenue share', label: 'Revenue share' },
                { value: 'Option 3', label: 'Option 3' },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`${
            isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          } text-white px-6 py-2 rounded-md`}
        >
          {isSubmitting ? 'Creating...' : 'Create Employee'}
        </button>
      </div>
    </form>
  );
}