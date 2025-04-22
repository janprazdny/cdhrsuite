import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { prisma } from '@/app/lib/db/prisma';
import ProfileCard, { ProfileField } from '@/app/components/ui/ProfileCard';
import { notFound } from 'next/navigation';

export const dynamicParams = true;

async function getEmployee(id: string) {
  const employee = await prisma.employee.findUnique({
    where: { id },
    include: {
      contracts: true,
      reportingManager: true
    }
  });
  
  if (!employee) {
    notFound();
  }
  
  return employee;
}

export default async function EmployeeDetailPage({ params }: { params: { id: string } }) {
  const employee = await getEmployee(params.id);
  const contract = employee.contracts[0];
  
  const formatDate = (date: Date | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString();
  };
  
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
          <h1 className="text-2xl font-bold">{employee.fullName}</h1>
          <span className="ml-3 px-2 py-1 text-xs rounded-full bg-gray-100">
            #{employee.internalId.toString().padStart(4, '0')}
          </span>
        </div>
        <Link
          href={`/employees/${employee.id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Edit Profile
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <ProfileCard title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProfileField label="Full Name" value={employee.fullName} />
              <ProfileField label="Personal Email" value={employee.personalEmail} />
              <ProfileField label="Work Email" value={employee.workEmail} />
              <ProfileField label="Nationality" value={employee.nationality} />
              <ProfileField label="Date of Birth" value={formatDate(employee.dateOfBirth)} />
              <ProfileField label="Address" value={employee.address} />
              <ProfileField label="Account Number" value={employee.accountNumber} />
            </div>
          </ProfileCard>
          
          <ProfileCard title="Job Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProfileField label="Role Title" value={employee.roleTitle} />
              <ProfileField label="Blended Rate Level" value={employee.blendedRateLevel} />
              <ProfileField label="Blended Rate Country" value={employee.blendedRateCountry} />
              <ProfileField label="Hay Grade" value={employee.hayGrade} />
              <ProfileField label="Reporting Manager" value={employee.reportingManager?.fullName} />
              <ProfileField label="Type of Cooperation" value={employee.cooperationType} />
              <ProfileField label="Department" value={employee.department} />
              <ProfileField label="Team" value={employee.team} />
              <ProfileField label="Employee Start Date" value={formatDate(employee.employeeStartDate)} />
              <ProfileField label="Termination Date" value={formatDate(employee.terminationDate)} />
              <ProfileField label="Reason End Date" value={employee.reasonEndDate} />
              <ProfileField label="Status" value={employee.status} />
              <ProfileField label="Type of Work" value={employee.typeOfWork} />
              <ProfileField label="Weekly Allocation %" value={employee.weeklyAllocation?.toString()} />
              <ProfileField label="Notes" value={employee.notes} className="col-span-2" />
            </div>
          </ProfileCard>
        </div>
        
        <div>
          <ProfileCard title="Contract Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProfileField label="Legal Entity" value={contract?.legalEntity} />
              <ProfileField label="Contract Type" value={contract?.contractType} />
              <ProfileField label="Contract Start Date" value={formatDate(contract?.contractStartDate)} />
              <ProfileField label="Contract End Date" value={formatDate(contract?.contractEndDate)} />
              <ProfileField label="Contract Duration Type" value={contract?.contractDurationType} />
            </div>
          </ProfileCard>
          
          <ProfileCard title="Remuneration">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProfileField 
                label="Fixed Amount" 
                value={contract ? `${contract.fixAmount} ${contract.fixCurrency} (${contract.fixFrequency})` : '-'} 
              />
              {contract?.variableAmount && (
                <ProfileField 
                  label="Variable Amount" 
                  value={`${contract.variableAmount} ${contract.variableCurrency} (${contract.variableFrequency})`} 
                />
              )}
              {contract?.variableType && (
                <ProfileField label="Variable Type" value={contract.variableType} />
              )}
            </div>
          </ProfileCard>
          
          <ProfileCard title="Metadata">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ProfileField label="Created At" value={formatDate(employee.createdAt)} />
              <ProfileField label="Last Updated" value={formatDate(employee.updatedAt)} />
              <ProfileField label="Source of Data" value={employee.sourceOfData} />
            </div>
          </ProfileCard>
        </div>
      </div>
    </div>
  );
}