import bcryptjs from 'bcryptjs'
import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(req: Request) {
	try {
		
		const body = await req.json()
		const { username, fullname, password, contact } = body
		
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
				fullname: fullname,
				contact: contact,
				password: hashedPassword,
			}
		})
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password: newUserPassword, ...rest } = newUser

		return NextResponse.json({ user: rest, message: 'success' }, { status: 201 })
	} catch (error) {
		return NextResponse.json({ message: 'regis error' }, { status: 500 })
	}
}