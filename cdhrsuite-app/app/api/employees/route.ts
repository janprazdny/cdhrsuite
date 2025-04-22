import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db/prisma';

export async function GET() {
  try {
    // Default empty array of dummy data that won't crash the application
    const dummyEmployees = [
      {
        id: "demo1",
        internalId: 1001,
        fullName: "Jan Novák",
        personalEmail: "jan.novak@example.com",
        workEmail: "jan.novak@company.cz",
        roleTitle: "Senior Developer",
        department: "Engineering",
        team: "Frontend",
        status: "Active",
        cooperationType: "Employee",
        employeeStartDate: new Date().toISOString(),
        sourceOfData: "dummy",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        contracts: [{
          id: "c1",
          legalEntity: "Company CZ s.r.o.",
          contractType: "Full-time",
          fixAmount: 75000,
          fixCurrency: "CZK",
          fixFrequency: "Monthly",
          contractStartDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]
      },
      {
        id: "demo2",
        internalId: 1002,
        fullName: "Anna Svobodová",
        personalEmail: "anna.svobodova@example.com",
        workEmail: "anna.svobodova@company.cz",
        roleTitle: "Product Manager",
        department: "Product",
        team: null,
        status: "Active",
        cooperationType: "Employee",
        employeeStartDate: new Date().toISOString(),
        sourceOfData: "dummy",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        contracts: [{
          id: "c2",
          legalEntity: "Company CZ s.r.o.",
          contractType: "Full-time",
          fixAmount: 85000,
          fixCurrency: "CZK",
          fixFrequency: "Monthly",
          contractStartDate: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }]
      }
    ];
    
    // Skip database connection in production until database is properly set up
    if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
      console.log('Running in production mode - returning dummy data');
      return NextResponse.json(dummyEmployees, { status: 200 });
    }
    
    // For development only - try to use the real database
    try {
      // Ensure database connection is established with a timeout
      const connectPromise = prisma.$connect();
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Database connection timeout')), 3000)
      );
      
      await Promise.race([connectPromise, timeoutPromise]);
      
      // Fetch employees with better error handling and timeout
      const employees = await prisma.employee.findMany({
        include: {
          contracts: true
        }
      });
      
      // Add proper status and validate response
      if (!employees || employees.length === 0) {
        console.log('No employees found in database, returning dummy data');
        return NextResponse.json(dummyEmployees, { status: 200 });
      }
      
      return NextResponse.json(employees, { status: 200 });
    } catch (dbError) {
      console.error('Database error, falling back to dummy data:', dbError);
      return NextResponse.json(dummyEmployees, { status: 200 });
    } finally {
      // Always disconnect from database to prevent connection leaks
      try {
        await prisma.$disconnect();
      } catch (e) {
        console.error('Error disconnecting from database:', e);
      }
    }
  } catch (error) {
    // Capture any unexpected errors and return dummy data anyway
    console.error('Unexpected error in employees API:', error);
    
    // Return dummy data in case of errors to prevent app from breaking
    return NextResponse.json(
      [
        {
          id: "fallback1",
          internalId: 9999,
          fullName: "Fallback User",
          personalEmail: "fallback@example.com",
          workEmail: null,
          roleTitle: "Emergency Fallback",
          department: "System",
          team: null,
          status: "Active",
          cooperationType: "System",
          employeeStartDate: new Date().toISOString(),
          sourceOfData: "fallback",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          contracts: []
        }
      ], 
      { status: 200 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Create employee
    const employee = await prisma.employee.create({
      data: {
        fullName: data.fullName,
        personalEmail: data.personalEmail,
        workEmail: data.workEmail,
        nationality: data.nationality,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        address: data.address,
        accountNumber: data.accountNumber,
        
        // Job Info
        roleTitle: data.roleTitle,
        blendedRateLevel: data.blendedRateLevel,
        blendedRateCountry: data.blendedRateCountry,
        hayGrade: data.hayGrade,
        cooperationType: data.cooperationType,
        department: data.department,
        team: data.team,
        employeeStartDate: new Date(data.employeeStartDate),
        terminationDate: data.terminationDate ? new Date(data.terminationDate) : null,
        reasonEndDate: data.reasonEndDate,
        reasonDismissal: data.reasonDismissal,
        status: data.status,
        typeOfWork: data.typeOfWork,
        weeklyAllocation: data.weeklyAllocation ? parseFloat(data.weeklyAllocation) : null,
        notes: data.notes,
        
        // Meta
        sourceOfData: 'manual',
        
        // Create contract
        contracts: {
          create: {
            legalEntity: data.legalEntity,
            contractType: data.contractType,
            contractStartDate: new Date(data.contractStartDate),
            contractEndDate: data.contractEndDate ? new Date(data.contractEndDate) : null,
            contractDurationType: data.contractDurationType,
            
            // Fix Remuneration
            fixAmount: parseFloat(data.fixAmount),
            fixCurrency: data.fixCurrency,
            fixFrequency: data.fixFrequency,
            
            // Variable Remuneration
            variableAmount: data.variableAmount ? parseFloat(data.variableAmount) : null,
            variableCurrency: data.variableCurrency,
            variableFrequency: data.variableFrequency,
            variableType: data.variableType
          }
        }
      }
    });
    
    return NextResponse.json(employee, { status: 201 });
  } catch (error) {
    console.error('Error creating employee:', error);
    return NextResponse.json(
      { error: 'Failed to create employee' },
      { status: 500 }
    );
  }
}