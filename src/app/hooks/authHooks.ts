import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { User } from '../types'

const authHooks = async () => {
	const session = (await getServerSession(authOptions)) as User | null

	if (session) {
        console.log(session)
		const { user } = session
		const { username, id } = user
		return {
			profile: {
                id: id || '',
				username: username || '',
			}
		}
	} else {
		return { profile: null }
	}
}

export default authHooks