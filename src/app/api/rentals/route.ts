import { db } from '../../../lib/db';
import { NextResponse } from 'next/server';
import { URL } from 'url';

export async function POST(req: Request) {
    const { carId, userId, startDate, endDate } = await req.json();

    try {
        const newRental = await db.rental.create({
            data: {
                carId,
                userId,
                startDate,
                endDate,
            },
        });
        return NextResponse.json(newRental, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create rental' }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    try {
        const rentals = await db.rental.findMany({
            where: {
                userId: userId,
            },
            include: {
                car: true,
            },
        });
        return NextResponse.json(rentals, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to retrieve rentals' }, { status: 500 });
    }
}

export async function checkAvailability(req: Request) {
    const { carId, startDate, endDate } = await req.json();

    try {
        const rentals = await db.rental.findMany({
            where: {
                carId: carId,
                OR: [
                    {
                        startDate: {
                            lte: endDate,
                        },
                        endDate: {
                            gte: startDate,
                        },
                    },
                ],
            },
        });

        const isAvailable = rentals.length === 0;
        return NextResponse.json({ available: isAvailable }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to check availability' }, { status: 500 });
    }
}
