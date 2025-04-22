import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';
import EmployeeTable from './EmployeeTable';

export default function EmployeesPage() {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Link
          href="/employees/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add Employee
        </Link>
      </div>
      
      <EmployeeTable />
    </div>
  );
}