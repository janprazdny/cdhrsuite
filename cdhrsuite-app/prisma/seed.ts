import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create default working time reference
  await prisma.workingTimeReference.upsert({
    where: { id: 'default' },
    update: {},
    create: {
      id: 'default',
      workdayHours: 8,
      monthlyHours: 168,
      monthlyWorkdays: 21,
      monthsPerYear: 12
    }
  });

  // Create default currency exchange rates
  const currencies = [
    { currency: 'CZK', rateToEUR: 0.041 },
    { currency: 'CHF', rateToEUR: 1.05 },
    { currency: 'GBP', rateToEUR: 1.17 },
    { currency: 'ZAR', rateToEUR: 0.051 }
  ];

  for (const { currency, rateToEUR } of currencies) {
    await prisma.currencyExchange.upsert({
      where: { currency },
      update: { rateToEUR },
      create: { currency, rateToEUR }
    });
  }

  // Create sample employees if none exist
  const employeeCount = await prisma.employee.count();
  
  if (employeeCount === 0) {
    // Create sample employee 1
    const employee1 = await prisma.employee.create({
      data: {
        fullName: 'John Smith',
        personalEmail: 'john.smith@personal.com',
        workEmail: 'john.smith@company.com',
        nationality: 'Czech',
        address: 'Prague, Czech Republic',
        accountNumber: 'CZ123456789',
        
        roleTitle: 'Senior Developer',
        blendedRateLevel: 'C',
        blendedRateCountry: 'CZ',
        hayGrade: 'H12',
        cooperationType: 'Employee',
        department: 'Engineering',
        team: 'Frontend',
        employeeStartDate: new Date('2022-01-15'),
        status: 'Active',
        typeOfWork: 'Project-based',
        weeklyAllocation: 100,
        sourceOfData: 'manual',
        
        contracts: {
          create: {
            legalEntity: 'Company CZ s.r.o.',
            contractType: 'Full-time',
            contractStartDate: new Date('2022-01-15'),
            contractDurationType: 'Unlimited',
            
            fixAmount: 75000,
            fixCurrency: 'CZK',
            fixFrequency: 'Monthly',
          }
        }
      }
    });
    
    // Create sample employee 2
    const employee2 = await prisma.employee.create({
      data: {
        fullName: 'Anna Müller',
        personalEmail: 'anna.muller@personal.com',
        workEmail: 'anna.muller@company.com',
        nationality: 'German',
        address: 'Berlin, Germany',
        accountNumber: 'DE987654321',
        
        roleTitle: 'Product Manager',
        blendedRateLevel: 'D',
        blendedRateCountry: 'DE',
        hayGrade: 'H14',
        cooperationType: 'Employee',
        department: 'Product',
        team: null,
        employeeStartDate: new Date('2021-05-01'),
        status: 'Active',
        typeOfWork: 'Leadership',
        weeklyAllocation: 100,
        sourceOfData: 'manual',
        
        contracts: {
          create: {
            legalEntity: 'Company DE GmbH',
            contractType: 'Full-time',
            contractStartDate: new Date('2021-05-01'),
            contractDurationType: 'Unlimited',
            
            fixAmount: 5500,
            fixCurrency: 'EUR',
            fixFrequency: 'Monthly',
            
            variableAmount: 1100,
            variableCurrency: 'EUR',
            variableFrequency: 'Monthly',
            variableType: 'KPI based'
          }
        }
      }
    });
    
    // Create sample freelancer
    const freelancer = await prisma.employee.create({
      data: {
        fullName: 'Michael Johnson',
        personalEmail: 'michael.johnson@personal.com',
        nationality: 'British',
        address: 'London, UK',
        accountNumber: 'GB456789123',
        
        roleTitle: 'UX Designer',
        blendedRateLevel: 'C',
        blendedRateCountry: 'UK',
        cooperationType: 'Freelancer',
        department: 'Design',
        team: 'UX/UI',
        employeeStartDate: new Date('2023-03-10'),
        status: 'Active',
        typeOfWork: 'Project-based',
        weeklyAllocation: 60,
        sourceOfData: 'manual',
        
        contracts: {
          create: {
            legalEntity: 'Johnson Design Ltd',
            contractType: 'Freelance',
            contractStartDate: new Date('2023-03-10'),
            contractEndDate: new Date('2023-12-31'),
            contractDurationType: 'Limited',
            
            fixAmount: 450,
            fixCurrency: 'GBP',
            fixFrequency: 'Daily',
          }
        }
      }
    });
    
    console.log('Seed data created successfully');
  } else {
    console.log('Database already has employee data, skipping seed');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });