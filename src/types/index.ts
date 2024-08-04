export type ApiResponse = {
	message: string
	success: boolean
	status?: boolean
	token?: string
	user?: any
	data?: any
	[key: string]: any
}
