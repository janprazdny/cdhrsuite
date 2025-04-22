import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/db/prisma';

export async function GET() {
  try {
    const currencies = await prisma.currencyExchange.findMany();
    
    if (currencies.length === 0) {
      // Create default currencies if none exist
      const defaultCurrencies = [
        { currency: 'CZK', rateToEUR: 0.041 },
        { currency: 'CHF', rateToEUR: 1.05 },
        { currency: 'GBP', rateToEUR: 1.17 },
        { currency: 'ZAR', rateToEUR: 0.051 }
      ];
      
      await prisma.currencyExchange.createMany({
        data: defaultCurrencies
      });
      
      return NextResponse.json(defaultCurrencies);
    }
    
    return NextResponse.json(currencies);
  } catch (error) {
    console.error('Error fetching currency exchange rates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch currency exchange rates' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const data = await request.json();
    const updates = [];
    
    // Update each currency
    for (const [currency, rateToEUR] of Object.entries(data)) {
      const existingCurrency = await prisma.currencyExchange.findUnique({
        where: { currency }
      });
      
      if (existingCurrency) {
        // Update existing currency
        const updated = await prisma.currencyExchange.update({
          where: { currency },
          data: { rateToEUR: parseFloat(rateToEUR as string) }
        });
        
        updates.push(updated);
      } else {
        // Create new currency
        const created = await prisma.currencyExchange.create({
          data: {
            currency,
            rateToEUR: parseFloat(rateToEUR as string)
          }
        });
        
        updates.push(created);
      }
    }
    
    return NextResponse.json(updates);
  } catch (error) {
    console.error('Error updating currency exchange rates:', error);
    return NextResponse.json(
      { error: 'Failed to update currency exchange rates' },
      { status: 500 }
    );
  }
}