import { NextRequest, NextResponse } from 'next/server';

// Simple static API that returns mock data without any database connection
export async function GET() {
  // Static employee data that will always work
  const staticEmployees = [
    {
      id: "static1",
      internalId: 1001,
      fullName: "Jan Novák",
      personalEmail: "jan.novak@example.com",
      workEmail: "jan.novak@company.cz",
      roleTitle: "Senior Developer",
      department: "Engineering",
      team: "Frontend",
      status: "Active",
      cooperationType: "Employee",
      employeeStartDate: "2023-01-15T00:00:00.000Z",
      sourceOfData: "static",
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
      contracts: [{
        id: "c1",
        legalEntity: "Company CZ s.r.o.",
        contractType: "Full-time",
        fixAmount: 75000,
        fixCurrency: "CZK",
        fixFrequency: "Monthly",
        contractStartDate: "2023-01-15T00:00:00.000Z",
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z"
      }]
    },
    {
      id: "static2",
      internalId: 1002,
      fullName: "Anna Svobodová",
      personalEmail: "anna.svobodova@example.com",
      workEmail: "anna.svobodova@company.cz",
      roleTitle: "Product Manager",
      department: "Product",
      team: null,
      status: "Active",
      cooperationType: "Employee",
      employeeStartDate: "2022-05-01T00:00:00.000Z",
      sourceOfData: "static",
      createdAt: "2022-05-01T00:00:00.000Z",
      updatedAt: "2022-05-01T00:00:00.000Z",
      contracts: [{
        id: "c2",
        legalEntity: "Company CZ s.r.o.",
        contractType: "Full-time",
        fixAmount: 85000,
        fixCurrency: "CZK",
        fixFrequency: "Monthly",
        contractStartDate: "2022-05-01T00:00:00.000Z",
        createdAt: "2022-05-01T00:00:00.000Z",
        updatedAt: "2022-05-01T00:00:00.000Z"
      }]
    },
    {
      id: "static3",
      internalId: 1003,
      fullName: "Petr Černý",
      personalEmail: "petr.cerny@example.com",
      workEmail: null,
      roleTitle: "UX Designer",
      department: "Design",
      team: "UX/UI",
      status: "On Leave",
      cooperationType: "Freelancer",
      employeeStartDate: "2023-03-10T00:00:00.000Z",
      sourceOfData: "static",
      createdAt: "2023-03-10T00:00:00.000Z",
      updatedAt: "2023-03-10T00:00:00.000Z",
      contracts: [{
        id: "c3",
        legalEntity: "Černý Design s.r.o.",
        contractType: "Freelance",
        fixAmount: 12000,
        fixCurrency: "CZK",
        fixFrequency: "Daily",
        contractStartDate: "2023-03-10T00:00:00.000Z",
        createdAt: "2023-03-10T00:00:00.000Z",
        updatedAt: "2023-03-10T00:00:00.000Z"
      }]
    }
  ];

  // Simply return the static data with 200 status
  return NextResponse.json(staticEmployees, { status: 200 });
}

// Simple mock implementation for POST that simulates creating an employee
export async function POST(request: NextRequest) {
  try {
    // Parse the request data
    const data = await request.json();
    
    // Create a simulated employee response with a generated ID
    const mockEmployeeResponse = {
      id: `mock_${Date.now()}`,
      internalId: Math.floor(1000 + Math.random() * 9000), // Random 4-digit number
      fullName: data.fullName,
      personalEmail: data.personalEmail,
      workEmail: data.workEmail || null,
      nationality: data.nationality || "Not specified",
      roleTitle: data.roleTitle,
      department: data.department,
      team: data.team || null,
      status: data.status || "Active",
      cooperationType: data.cooperationType,
      employeeStartDate: data.employeeStartDate || new Date().toISOString(),
      sourceOfData: "manual",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      // Include basic contract data
      contracts: [{
        id: `contract_${Date.now()}`,
        legalEntity: data.legalEntity,
        contractType: data.contractType,
        fixAmount: parseFloat(data.fixAmount || "0"),
        fixCurrency: data.fixCurrency || "CZK",
        fixFrequency: data.fixFrequency || "Monthly",
        contractStartDate: data.contractStartDate || new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }]
    };
    
    // Return a successful response with the mock data
    return NextResponse.json(mockEmployeeResponse, { status: 201 });
    
  } catch (error) {
    console.error('Error processing employee creation:', error);
    
    // Return a friendly error response
    return NextResponse.json(
      { 
        error: 'Failed to create employee',
        message: 'The server understood the request but could not process it',
        timestamp: new Date().toISOString()
      },
      { status: 400 }
    );
  }
}