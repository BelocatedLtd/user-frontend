'use client'

import Link from 'next/link'
import { redirect, usePathname } from 'next/navigation'
import React from 'react'

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
	const pathname = usePathname()

	if (!pathname) redirect('/dashboard/settings/edit-profile')

	return (
		<div className='flex flex-col lg:flex-row w-full '>
			<aside className='w-full lg:w-64  p-4 lg:sticky top-0'>
				<ul className='flex flex-col lg:flex-col md:space-y-4  md:space-x-0 '>
					<li>
						<Link
							href='/dashboard/settings/edit-profile'
							className={`block py-2 px-4 rounded ${
								pathname === '/dashboard/settings/edit-profile'
									? 'bg-gray-200 text-black'
									: 'text-'
							}`}>
							Edit Profile
						</Link>
					</li>
					<li>
						<Link
							href='/dashboard/settings/change-password'
							className={`block py-2 px-4 rounded ${
								pathname === '/dashboard/settings/change-password'
									? 'bg-gray-200 text-black'
									: 'text-'
							}`}>
							Change Password
						</Link>
					</li>
				</ul>
			</aside>
			<main className='flex-1 p-6 border rounded-lg border-gray-200'>
				{children}
			</main>
		</div>
	)
}

export default SettingsLayout
