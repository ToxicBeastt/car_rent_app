import { ReactNode } from 'react'
import authHooks from '../hooks/authHooks'
import { redirect } from 'next/navigation'
import Home from '@/app/views/(dashboard)/Dashboard/Home/page'

const DashboardLayout = async ({ children }: { readonly children: ReactNode }) => {
    const response = await authHooks();
	console.log(response)
    const { profile } = response;

    if (!profile) {
		redirect('/login')
	}

	return <Home profile={profile}>{children}</Home>
}

export default DashboardLayout;