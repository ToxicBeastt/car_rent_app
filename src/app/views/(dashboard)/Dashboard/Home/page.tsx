'use client'

import { SessionProvider } from 'next-auth/react'
import React, { useState } from 'react'
import { Profile } from '@/app/types'
import Header from '../layout/Header'
import Sidebar from '../layout/Sidebar'

type HomeProps = {
	children: React.ReactNode
	profile: Profile
}

const Home = ({ children, profile }: HomeProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const handleToggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen)
	}

	return (
		<SessionProvider>
			<div className='min-h-screen'>
				<div className='flex'>
					<Sidebar isOpen={isSidebarOpen} toggleSidebar={handleToggleSidebar} />
					<div className='flex flex-col flex-grow w-screen md:w-full min-h-screen'>
						<div className='sticky top-0 z-10'>
							<Header
								profile={profile}
								isOpen={isSidebarOpen}
								toggleSidebar={handleToggleSidebar}
							/>
						</div>
						<div className='flex flex-col flex-grow w-screen md:w-full p-4'>{children}</div>
					</div>
				</div>
			</div>
		</SessionProvider>
	)
}

export default Home