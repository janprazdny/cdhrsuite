import Link from 'next/link';
import EmployeeForm from './EmployeeForm';

export default function NewEmployeePage() {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Employee</h1>
        <Link
          href="/employees"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
        >
          Cancel
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <EmployeeForm />
      </div>
    </div>
  );
}