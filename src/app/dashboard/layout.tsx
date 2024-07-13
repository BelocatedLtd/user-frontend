'use client'

import DashboardLayout from '@/components/Layouts/dashboard'
import React from 'react'
//import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'

const DashLayout = ({ children }: { children: React.ReactNode }) => {
	return <DashboardLayout>{children}</DashboardLayout>
}

export default DashLayout
