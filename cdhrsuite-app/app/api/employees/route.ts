import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db/prisma';

export async function GET() {
  try {
    // Ensure database connection is established
    await prisma.$connect();
    
    // Fetch employees with better error handling
    const employees = await prisma.employee.findMany({
      include: {
        contracts: true
      }
    }).catch((dbError) => {
      console.error('Database error while fetching employees:', dbError);
      throw new Error('Database connection failed. Please try again later.');
    });
    
    // Add proper status and validate response
    if (!employees) {
      return NextResponse.json(
        { error: 'No employee data available' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(employees, { status: 200 });
  } catch (error) {
    // Improved error logging
    console.error('Error fetching employees:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    // Return a more descriptive error response
    return NextResponse.json(
      { 
        error: 'Failed to fetch employees', 
        message: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  } finally {
    // Always disconnect from database to prevent connection leaks
    await prisma.$disconnect();
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