import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db/prisma';

export async function GET() {
  try {
    let workingTimeRef = await prisma.workingTimeReference.findFirst();
    
    if (!workingTimeRef) {
      // Create default working time reference if none exists
      workingTimeRef = await prisma.workingTimeReference.create({
        data: {
          workdayHours: 8,
          monthlyHours: 168,
          monthlyWorkdays: 21,
          monthsPerYear: 12
        }
      });
    }
    
    return NextResponse.json(workingTimeRef);
  } catch (error) {
    console.error('Error fetching working time reference:', error);
    return NextResponse.json(
      { error: 'Failed to fetch working time reference' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Find the existing record or create a new one if it doesn't exist
    const existingRef = await prisma.workingTimeReference.findFirst();
    
    if (existingRef) {
      // Update existing record
      const updated = await prisma.workingTimeReference.update({
        where: { id: existingRef.id },
        data: {
          workdayHours: parseFloat(data.workdayHours),
          monthlyHours: parseFloat(data.monthlyHours),
          monthlyWorkdays: parseFloat(data.monthlyWorkdays),
          monthsPerYear: parseFloat(data.monthsPerYear)
        }
      });
      
      return NextResponse.json(updated);
    } else {
      // Create new record
      const created = await prisma.workingTimeReference.create({
        data: {
          workdayHours: parseFloat(data.workdayHours),
          monthlyHours: parseFloat(data.monthlyHours),
          monthlyWorkdays: parseFloat(data.monthlyWorkdays),
          monthsPerYear: parseFloat(data.monthsPerYear)
        }
      });
      
      return NextResponse.json(created, { status: 201 });
    }
  } catch (error) {
    console.error('Error updating working time reference:', error);
    return NextResponse.json(
      { error: 'Failed to update working time reference' },
      { status: 500 }
    );
  }
}