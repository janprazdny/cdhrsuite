import Link from 'next/link';
import { UsersIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Core HR Employee Database
      </h1>
      <p className="text-xl mb-12 text-center max-w-3xl">
        Structured database to store and manage core information about people working with the company
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Link href="/employees" 
          className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 border">
          <UsersIcon className="h-16 w-16 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Employees</h2>
          <p className="text-gray-600 text-center">
            View and manage all employee profiles and contracts
          </p>
        </Link>
        
        <Link href="/settings" 
          className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 border">
          <Cog6ToothIcon className="h-16 w-16 text-blue-600 mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Settings</h2>
          <p className="text-gray-600 text-center">
            Configure working time references and currency exchange rates
          </p>
        </Link>
      </div>
    </div>
  );
}
