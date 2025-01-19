import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
	try {
		const body = await req.json()
		const { username, password, contact, address, phone_number, sim_number } = body

		const dupUsername = await db.user.findUnique({
			where: { username: username }
		})
		if (dupUsername) {
			return NextResponse.json(
				{
					user: null,
					message: 'username Already Use'
				},
				{ status: 409 }
			)
		}
		const salt = bcryptjs.genSaltSync(10)
		const hashedPassword = bcryptjs.hashSync(password, salt)
		const newUser = await db.user.create({
			data: {
				username: username,
				contact: contact,
				password: hashedPassword,
				address: address,
				phone_number: phone_number,
				sim_number: sim_number
			}
		})
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: newUserPassword, ...rest } = newUser

		return NextResponse.json({ user: rest, message: 'sukses' }, { status: 201 })
	} catch (error) {
		return NextResponse.json({ message: 'regis error' }, { status: 500 })
	}
}