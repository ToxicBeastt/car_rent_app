import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcryptjs from 'bcryptjs'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from './db'

interface UserWithRemember {
	id: string
	username: string
	remember: string
}

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(db),
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: 'jwt'
	},
	pages: {
		signIn: '/login'
	},
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials, req) {
				const remember = req.body?.remember

				if (!credentials?.username || !credentials?.password) {
					throw new Error('Username and password are required.')
				}

				const existUser = await db.user.findUnique({
					where: { username: credentials.username },
					select: {
						id: true,
						username: true,
						password: true,
						status: true
					}
				})

				if (!existUser) {
					throw new Error('User does not exist.')
				}

				const isValidPassword = await bcryptjs.compare(credentials.password, existUser.password)

				if (!isValidPassword) {
					throw new Error('Invalid password.')
				}
				if (!existUser.status) {
					throw new Error('User account is inactive.')
				}

				return {
					id: `${existUser.id}`,
					username: existUser.username,
					remember: remember ?? 'false'
				}
			}
		})
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				const remember = (user as UserWithRemember).remember === 'true'

				let expires
				if (remember) {
					expires = Date.now() + 30 * 24 * 60 * 60 * 1000
				} else {
					expires = Date.now() + 24 * 60 * 60 * 1000
				}
				return {
					...token,
					username: user.email,
					remember: remember,
					exp: Math.floor(expires / 1000),
					expires: expires
				}
			}
			return token
		},
		async session({ session, token }) {
			if ('expires' in token && typeof token.expires === 'number') {
				const expires = new Date(token.expires)
				const now = new Date()
				const maxAge = Math.floor((expires.getTime() - now.getTime()) / 1000)

				return {
					...session,
					user: {
						...session.user,
						username: token.username
					},
					expires: expires.toISOString(),
					maxAge: maxAge
				}
			} else {
				return session
			}
		}
	}
}