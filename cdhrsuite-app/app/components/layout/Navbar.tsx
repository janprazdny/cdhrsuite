import Link from 'next/link';
import { Cog6ToothIcon, UsersIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          CDHRSuite
        </Link>
        <div className="flex space-x-4">
          <Link href="/employees" className="flex items-center hover:text-gray-300">
            <UsersIcon className="h-5 w-5 mr-1" />
            Employees
          </Link>
          <Link href="/settings" className="flex items-center hover:text-gray-300">
            <Cog6ToothIcon className="h-5 w-5 mr-1" />
            Settings
          </Link>
        </div>
      </div>
    </nav>
  );
}