import { db } from "../../../lib/db";
import { NextResponse } from "next/server";
import { URL } from "url";

export async function POST(req: Request) {
  const { brand, model, licensePlate, rentalRate } = await req.json();

  try {
    const newCar = await db.car.create({
      data: {
        brand,
        model,
        licensePlate,
        rentalRate,
      },
    });
    return NextResponse.json(newCar, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add car" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search");
  const page = searchParams.get("page") || "1";
  const size = searchParams.get("size") || "10";
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  try {
    const validStartDate = startDate ? new Date(startDate) : null;
    const validEndDate = endDate ? new Date(endDate) : null;
    const rentals = await db.rental.findMany({
      where: {
        ...(validStartDate && { startDate: { gt: validStartDate } }),
        ...(validEndDate && { endDate: { lt: validEndDate } }),
      },
    });

    const unavailableCarIds = rentals.map((rental) => rental.carId);
    const count = await db.user.count();
    const pageNumber = parseInt(page, 10);
    const pageSize = size ? parseInt(size, 10) : count;

    const cars = await db.car.findMany({
      where: {
        ...(search && {
          OR: [
            { brand: { contains: search, mode: "insensitive" } },
            { model: { contains: search, mode: "insensitive" } },
          ],
        }),
        ...(unavailableCarIds.length > 0 && {
          id: { notIn: unavailableCarIds },
        }),
      },
      skip: (pageNumber - 1) * pageSize,
      take: pageSize,
    });
    const totalCount = await db.car.count();
    const totalPages = Math.ceil(totalCount / pageSize);
    return NextResponse.json(
      {
        data: cars,
        page,
        size,
        total: totalCount,
        totalPages: totalPages,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to retrieve cars" },
      { status: 500 }
    );
  }
}
