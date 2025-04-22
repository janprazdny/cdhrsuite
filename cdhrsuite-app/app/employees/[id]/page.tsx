import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function EmployeeDetailPage() {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link
            href="/employees"
            className="mr-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Employee Details</h1>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow text-center">
        <p className="text-gray-600 mb-4">
          Employee detail functionality will be available in the next update.
        </p>
        <Link
          href="/employees"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Back to Employees
        </Link>
      </div>
    </div>
  );
}