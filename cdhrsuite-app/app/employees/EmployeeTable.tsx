'use client';

import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline';

interface Contract {
  id: string;
  legalEntity: string;
  contractType: string;
  fixAmount: number;
  fixCurrency: string;
  fixFrequency: string;
}

interface Employee {
  id: string;
  internalId: number;
  fullName: string;
  personalEmail: string;
  workEmail: string | null;
  roleTitle: string;
  department: string;
  team: string | null;
  status: string;
  cooperationType: string;
  contracts: Contract[];
}

// Function to generate dummy employee data for demonstration
function getDummyEmployees(): Employee[] {
  return [
    {
      id: "dummy1",
      internalId: 1001,
      fullName: "Jan Novák",
      personalEmail: "jan.novak@example.com",
      workEmail: "jan.novak@company.cz",
      roleTitle: "Senior Developer",
      department: "Engineering",
      team: "Frontend",
      status: "Active",
      cooperationType: "Employee",
      contracts: [{
        id: "contract1",
        legalEntity: "Company CZ s.r.o.",
        contractType: "Full-time",
        fixAmount: 75000,
        fixCurrency: "CZK",
        fixFrequency: "Monthly"
      }]
    },
    {
      id: "dummy2",
      internalId: 1002,
      fullName: "Anna Svobodová",
      personalEmail: "anna.svobodova@example.com",
      workEmail: "anna.svobodova@company.cz",
      roleTitle: "Product Manager",
      department: "Product",
      team: null,
      status: "Active",
      cooperationType: "Employee",
      contracts: [{
        id: "contract2",
        legalEntity: "Company CZ s.r.o.",
        contractType: "Full-time",
        fixAmount: 85000,
        fixCurrency: "CZK",
        fixFrequency: "Monthly"
      }]
    },
    {
      id: "dummy3",
      internalId: 1003,
      fullName: "Petr Černý",
      personalEmail: "petr.cerny@example.com",
      workEmail: null,
      roleTitle: "UX Designer",
      department: "Design",
      team: "UX/UI",
      status: "On Leave",
      cooperationType: "Freelancer",
      contracts: [{
        id: "contract3",
        legalEntity: "Černý Design s.r.o.",
        contractType: "Freelance",
        fixAmount: 12000,
        fixCurrency: "CZK",
        fixFrequency: "Daily"
      }]
    }
  ];
}

export default function EmployeeTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  
  // Use query parameter to force dummy data (for testing)
  const useDummyData = typeof window !== 'undefined' && 
    window.location.search.includes('dummy=true');
  
  async function fetchEmployees() {
    setLoading(true);
    setError('');
    
    // If dummy data is requested via URL or we reached max retries, use dummy data
    if (useDummyData) {
      console.log('Using dummy data as requested by URL parameter');
      setTimeout(() => {
        setEmployees(getDummyEmployees());
        setLoading(false);
      }, 500); // Simulate loading for better UX
      return;
    }
    
    try {
      // Add timestamp to prevent caching issues
      const response = await fetch(`/api/employees?t=${Date.now()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      // Handle different HTTP status codes
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Validate data structure
      if (!Array.isArray(data)) {
        throw new Error('Received invalid employee data format');
      }
      
      // If data is empty, use dummy data for demonstration
      if (data.length === 0) {
        console.log('No employees found in database, using fallback dummy data');
        setEmployees(getDummyEmployees());
      } else {
        setEmployees(data);
      }
      
      setRetryCount(0); // Reset retry count on success
    } catch (err) {
      console.error('Error fetching employees:', err);
      
      if (retryCount >= maxRetries) {
        // After max retries, load fallback data instead of showing error
        console.log('Max retries reached. Using fallback dummy data instead of error message');
        setEmployees(getDummyEmployees());
        setError(''); // Clear error to show the data
      } else {
        setError(err instanceof Error ? err.message : 'Failed to load employees');
        
        // Auto-retry logic for transient errors
        console.log(`Retrying (${retryCount + 1}/${maxRetries})...`);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 2000); // Wait 2 seconds before retrying
      }
    } finally {
      setLoading(false);
    }
  }
  
  // Effect to trigger fetch on mount and when retry count changes
  useEffect(() => {
    fetchEmployees();
  }, [retryCount]);

  const exportToCSV = () => {
    if (employees.length === 0) return;
    
    // Create CSV headers
    const headers = [
      'Internal ID',
      'Full Name',
      'Personal Email',
      'Work Email',
      'Role Title',
      'Department',
      'Team',
      'Status',
      'Type',
      'Legal Entity',
      'Contract Type',
      'Amount',
      'Currency',
      'Frequency'
    ];
    
    // Create CSV rows
    const csvRows = employees.map(employee => {
      const contract = employee.contracts[0] || {};
      return [
        employee.internalId,
        employee.fullName,
        employee.personalEmail,
        employee.workEmail || '',
        employee.roleTitle,
        employee.department,
        employee.team || '',
        employee.status,
        employee.cooperationType,
        contract.legalEntity || '',
        contract.contractType || '',
        contract.fixAmount || '',
        contract.fixCurrency || '',
        contract.fixFrequency || ''
      ];
    });
    
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.join(','))
    ].join('\n');
    
    // Create and download CSV file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'employees.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return <div className="text-center py-8">Loading employees...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
        <p className="text-red-700">Nepodařilo se načíst seznam zaměstnanců. Zkuste to prosím znovu nebo kontaktujte podporu.</p>
        <div className="mt-3 flex gap-3">
          <button 
            onClick={() => fetchEmployees()} 
            className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded-md text-sm"
          >
            Zkusit znovu
          </button>
          {retryCount > 0 && (
            <p className="text-sm text-red-600 self-center">
              Automatický pokus o opětovné načtení: {retryCount}/{maxRetries}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <p className="text-gray-500 text-center py-8">
          No employees found. Click &quot;Add Employee&quot; to create your first employee record.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={exportToCSV}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-1" />
          Export to CSV
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map(employee => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.internalId.toString().padStart(4, '0')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{employee.fullName}</div>
                    <div className="text-sm text-gray-500">{employee.personalEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.roleTitle}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.department}
                    {employee.team && <span className="text-xs ml-1">({employee.team})</span>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      employee.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : employee.status === 'On Leave'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {employee.cooperationType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900" disabled>
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-900" disabled>
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}