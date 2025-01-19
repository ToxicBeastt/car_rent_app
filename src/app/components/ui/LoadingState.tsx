import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
const LoadingState = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				height: '100vh'
			}}
		>
			<CircularProgress size={40} color='primary' />
			<Typography variant='h5' color='primary' sx={{ ml: 2 }}>
				Loading...
			</Typography>
		</div>
	)
}

export default LoadingState