import React from 'react'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import { formatDate } from '@/utils/formatDate'
import { useSelector } from 'react-redux'
import { selectAllReferrals } from '@/redux/slices/referrals'

const ReferralsTable = () => {
	const referrals = useSelector(selectAllReferrals)

	function createData(email: string, createdAt: string, status: string) {
		return { email, createdAt, status }
	}

	const rows = referrals.map((referral) => {
		const { referredEmail, createdAt, status } = referral
		return createData(referredEmail, createdAt, status)
	})

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 350 }} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell>Email</TableCell>
						<TableCell align='right'>Date</TableCell>
						<TableCell align='right'>Status</TableCell>
						<TableCell align='right'></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow
							key={row.email}
							sx={{
								'&:last-child td, &:last-child th': { border: 0 },
							}}>
							<TableCell component='th' scope='row'>
								{row.email}
							</TableCell>
							<TableCell align='right'>{formatDate(row?.createdAt)}</TableCell>
							<TableCell align='right'>{row?.status}</TableCell>
							<TableCell align='right'>
								{row.status === 'sent' && 'Resend invite'}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default ReferralsTable
