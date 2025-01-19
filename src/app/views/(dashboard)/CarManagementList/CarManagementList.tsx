'use client'

import { useState } from 'react'
import Typography from '@/app/components/base/Typography'
import DataTable from '@/app/components/ui/DataTable'
import useGetData from '@/app/hooks/useGetData'
import { TABLE_COLUMNS } from './CarManagementList.constants'
import { queryParam } from 'app/types'
import carManagementListNormalizer from './CarManagementList.normalizer'
import CreateCarModal from './components/CreateCarModal'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

const CarsManagementList = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedId, setSelectedId] = useState<number | null>(null)
	const [query, setQuery] = useState<queryParam>({ page: '1', size: '10', search: '' })
	const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(null)
	const [endDate, setEndDate] = useState<dayjs.Dayjs | null>(null)

	const { data, loading, refetch } = useGetData('api/cars', {
		params: { 
			page: query.page, 
			size: query.size, 
			search: query.search || '', 
			startDate: startDate ? startDate.toISOString() : '', 
			endDate: endDate ? endDate.toISOString() : '' 
		},
		normalizer: carManagementListNormalizer,
	})

	const handleClose = () => {
		setSelectedId(null)
		setIsOpen(false)
		refetch()
	}

	const handleOpen = () => {
		setIsOpen(true)
	}

	const handlePageSize = (size: string) => {
		setQuery({ page: '1', size })
	}

	const handlePageChange = (text: string) => {
		setQuery((prev: queryParam) => ({ ...prev, page: text }))
	}

	const handleSearch = (text: string) => {
		setQuery((prev: queryParam) => ({
			...prev,
			page: '1',
			search: text
		}))
	}

	return (
		<>
			<Typography size={1.5} weight={1.2} marginBottom={2}>
				Cars
			</Typography>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<div>
					<DatePicker 
						label="Start Date" 
						value={startDate} 
						onChange={(newValue: dayjs.Dayjs | null) => setStartDate(newValue)} 
					/>
					<DatePicker 
						label="End Date" 
						value={endDate} 
						onChange={(newValue: dayjs.Dayjs | null) => setEndDate(newValue)} 
					/>
				</div>
			</LocalizationProvider>
			<DataTable
				data={data ? data.data : []}
				columns={TABLE_COLUMNS}
				loading={loading}
				showActions
				showSearch
				handleSearch={handleSearch}
				handleCreate={handleOpen}
				handlePageSize={handlePageSize}
				pageSize={Number(query.size)}
				totalPages={data ? data.totalPages : 0}
				page={Number(query.page) || 1}
				handleChangePage={handlePageChange}
			/>

			<CreateCarModal
				isOpen={isOpen}
				onClose={handleClose}
				id={selectedId}
				isEdit={!!selectedId}
			/>
		</>
	)
}

export default CarsManagementList
