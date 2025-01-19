import AddIcon from '@mui/icons-material/Add'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid2'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Pagination from '@mui/material/Pagination'
import Paper from '@mui/material/Paper'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Image from 'next/image'
import React, { ChangeEvent, useMemo, useState } from 'react'
import Typography from '@/app/components/base/Typography'
import { ColumnTable } from '@/app/types'
import EmptyState from './EmptyState';
import TextField from '../base/TextField';
import ActionButton from '../base/ActionButton';

interface DataTableProps {
	data: DataRow[]
	columns: ColumnTable[]
	onClickDetail?: (value: string) => void
	showActions?: boolean
	actions?: Action[]
	loading?: boolean
	pagination?: boolean
	showCreateButton?: boolean
	onPageChange?: (page: number) => void
	rowsPerPage?: number
	handleCreate?: () => void
	showSearch?: boolean
	handleSearch?: (text: string) => void
	handlePageSize?: (text: string) => void
	pageSize?: number
	totalPages?: number
	handleChangePage?: (text: string) => void
	page?: number
	showCheckbox?: boolean
	selectedRows?: (number | string)[];
	onSelectRow?: (id: ((number | string)[])) => void;
	header?: React.ReactNode;
}

interface DataRow {
	id: number | string
	[key: string]: string | number | boolean | React.ReactNode
}

interface Action {
	label: string
	icon?: React.ReactElement
	color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info'
	onClick: (id: number | string) => void
	disabled?: (id: number | string) => boolean
}

const DataTable: React.FC<DataTableProps> = (props: DataTableProps) => {
	const {
		data,
		columns,
		onClickDetail,
		showActions = false,
		actions,
		loading = false,
		pagination = true,
		showCreateButton = true,
		showSearch = false,
		showCheckbox = false,
		pageSize = 10,
		totalPages = 1,
		page = 1,
		selectedRows = [],
		header,
		onSelectRow,
		handleChangePage,
		onPageChange,
		handleCreate,
		handleSearch,
		handlePageSize
	} = props
	const [sortColumn, setSortColumn] = useState<string | null>(null)
	const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
	const [searchTerm, setSearchTerm] = useState('')
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const [currentRow, setCurrentRow] = useState<number | string | null>(null)
	const open = Boolean(anchorEl)

	const handleSort = (columnKey: string) => {
		const isAsc = sortColumn === columnKey && sortDirection === 'asc'
		setSortDirection(isAsc ? 'desc' : 'asc')
		setSortColumn(columnKey)
	}

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value)
		if(onSelectRow){
			onSelectRow([]);
		}
		if (handleChangePage) {
			handleChangePage('1')
		}
		if (handleSearch) {
			handleSearch(event.target.value)
		}
	}

	const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, rowId: number | string) => {
		setAnchorEl(event.currentTarget)
		setCurrentRow(rowId)
	}

	const handleCloseMenu = () => {
		setAnchorEl(null)
		setCurrentRow(null)
	}

	const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (onSelectRow) {
			if (event.target.checked) {
				onSelectRow(data.map((row) => row.id));
			} else {
				onSelectRow([]);
			}
		}
	};

	const isAllSelected = data.length > 0 && selectedRows.length === data.length;

	const tableBody = useMemo(() => {
		const handleRowSelect = (id: number | string) => {
			if (onSelectRow) {
				const isSelected = selectedRows.includes(id);
				if (isSelected) {
					onSelectRow(selectedRows.filter((item) => item !== id) as (number | string)[]);
				} else {

					onSelectRow([...selectedRows, id] as (number | string)[]);
				}
			}
		};

		if (loading) {
			return (
				<TableRow>
					<TableCell colSpan={columns.length + 1 + (showActions ? 1 : 0)}>
						<div className="flex justify-center items-center">
							<CircularProgress
								size={40}
								color="primary"
							/>
							<Typography
								variant="h5"
								color="primary"
								sx={{ ml: 2 }}
							>
								Loading...
							</Typography>
						</div>
					</TableCell>
				</TableRow>
			)
		} else {
			if (data.length > 0) {
				return data.map((row, rowIndex) => (
					<TableRow
						key={rowIndex}
						sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
					>
						{showCheckbox && (
							<TableCell key={0} padding="checkbox">
								<div className="p-4">
									<Checkbox
										checked={selectedRows.includes(row.id)}
										onChange={() => handleRowSelect(row.id)}
									/>
								</div>
							</TableCell>
						)}

						<TableCell key={showCheckbox ? 1 : 0}>{(page - 1) * pageSize + rowIndex + 1}</TableCell>
						{columns.map((column, columnIndex) => {
							if (column.hidden) return null
							const value = row[column.key]
							switch (column.type) {
								case 'image':
									return (
										<TableCell key={columnIndex + 1 + (showCheckbox ? 1 : 0)}>
											<Image
												src={String(value)}
												alt={column.label}
												width={100}
												height={100}
												priority={true}
												style={{
													objectFit: 'cover',
													borderRadius: '4px',
													width: 'auto',
													height: '100%',
												}}
											/>
										</TableCell>
									)
								case 'action-detail':
									return (
										<TableCell key={columnIndex + 1 + (showCheckbox ? 1 : 0)}>
											<Link
												onClick={() => onClickDetail && onClickDetail(String(row.id))}
												sx={{
													display: 'inline-block',
													textDecoration: 'none',
													color: 'primary.main',
													fontSize: '1rem',
													cursor: 'pointer',
													'@media (max-width: 1599.98px)': {
														fontSize: `1rem`
													},
													'@media (max-width: 1199.98px)': {
														fontSize: `0.9rem`
													},
													'@media (max-width: 991.98px)': {
														fontSize: `0.8rem`
													},
													'@media (max-width: 767.98px)': {
														fontSize: `0.7rem`
													},
													'@media (max-width: 575.98px)': {
														fontSize: `0.6rem`
													}
												}}
												underline="none"
											>
												{value}
											</Link>
										</TableCell>
									)
								case 'status':
									return (
										<TableCell key={columnIndex + 1 + (showCheckbox ? 1 : 0)}>
											<Chip
												label={value ? 'Active' : 'Inactive'}
												color={value ? 'success' : 'error'}
											/>
										</TableCell>
									)
								case 'component':
									return <TableCell key={columnIndex + 1 + (showCheckbox ? 1 : 0)}>{value}</TableCell>
								default:
									return (
										<TableCell key={columnIndex + 1 + (showCheckbox ? 1 : 0)}>
											<Typography
												variant="caption"
												size={0.8}
											>
												{value}
											</Typography>
										</TableCell>
									)
							}
						})}
						{showActions && (
							<TableCell key={columns.length + 1 + (showCheckbox ? 1 : 0) + 1}>
								<div className="flex justify-end">
									<IconButton
										aria-controls={`menu-${row.id}`}
										aria-haspopup="true"
										onClick={(event) => handleOpenMenu(event, row.id)}
									>
										<MoreVertIcon />
									</IconButton>
								</div>

								<Menu
									id={`menu-${row.id}`}
									anchorEl={anchorEl}
									open={open && currentRow === row.id}
									onClose={handleCloseMenu}
								>
									<Box display="flex" flexDirection="row">
										{actions?.map((action, index) => (
											<MenuItem
												key={index}
												onClick={() => {
													action.onClick(row.id);
													handleCloseMenu();
												}}
												disabled={action.disabled ? action.disabled(row.id) : false}
												sx={{
													color: action.disabled ? 'grey.500' :
														(action.color === 'primary' ? 'primary.main' :
															action.color === 'warning' ? 'error.main' :
																action.color === 'secondary' ? 'secondary.main' :
																	action.color === 'error' ? 'error.main' :
																		'inherit'),
													marginRight: 1,
												}}
											>
												{action.icon && action.icon}
												{action.label}
											</MenuItem>
										))}
									</Box>
								</Menu>
							</TableCell>
						)}
					</TableRow>
				))
			}
			return (
				<TableRow>
					<TableCell colSpan={columns.length + 1 + (showActions ? 1 : 0)}>
						<EmptyState />
					</TableCell>
				</TableRow>
			)
		}
	}, [loading, onSelectRow, selectedRows, columns, showActions, data, showCheckbox, page, pageSize, anchorEl, open, currentRow, actions, onClickDetail])

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		if(onSelectRow){
			onSelectRow([]);
		}
		if (handleChangePage) {
			handleChangePage(String(value))
		}
		if (onPageChange) {
			onPageChange(value)
		}
	}

	const handleRowsPerPageChange = (event: SelectChangeEvent<number>) => {
		if(onSelectRow){
			onSelectRow([]);
		}
		if (handlePageSize) {
			handlePageSize(event.target.value as string)
		}
	}

	return (
		<Paper
			elevation={3}
			sx={{ padding: 2 }}
		>
			{header && header}
			<Grid
				container
				spacing={2}
				marginBottom={1}
			>
				<Grid
					size={4}
					sx={{ display: 'flex', justifyContent: 'flex-start' }}
				>
					{showSearch && (
						<TextField
							id="search-input"
							variant="outlined"
							label="Search"
							placeholder="Search..."
							value={searchTerm}
							onChange={handleSearchChange}
						/>
					)}
				</Grid>
				<Grid size={4} />
				<Grid
					size={4}
					sx={{ display: 'flex', justifyContent: 'flex-end' }}
				>
					{showCreateButton && handleCreate && (
						<div className="flex items-center justify-center">
							<ActionButton
								onClick={handleCreate}
								tooltip="Create"
								color="primary"
								icon={<AddIcon />}
							/>
						</div>
					)}
					{pagination && (
						<div className="flex items-center justify-center">
							<Select
								id="rows-per-page-select"
								name="rowsPerPage"
								value={pageSize}
								onChange={handleRowsPerPageChange}
								sx={{
									marginLeft: 2,
									width: 'fit-content',
									height: 'auto',
									fontSize: {
										xs: '0.5rem',
										sm: '0.9em',
										md: '1rem'
									}
								}}
								variant="outlined"
							>
								<MenuItem value={10}>10</MenuItem>
								<MenuItem value={20}>20</MenuItem>
								<MenuItem value={50}>50</MenuItem>
								<MenuItem value={100}>100</MenuItem>
							</Select>
						</div>
					)}
				</Grid>
			</Grid>
			<div className="overflow-x-auto border border-gray-200 w-full">
				<Table
					sx={{
						border: 0,
						borderRadius: 4,
						borderColor: 'divider',
						position: 'relative',
						tableLayout: 'fixed',
						minWidth: 650,
						zIndex: 0
					}}
					aria-label="simple table"
					stickyHeader
				>
					<TableHead>
						<TableRow>
							{showCheckbox && (
								<TableCell
									key={0}
									sx={{ width: '4rem' }}
								>
									<div className="flex justify-center items-center">
										<Checkbox
											indeterminate={selectedRows.length > 0 && selectedRows.length < data.length}
											checked={isAllSelected}
											onChange={handleSelectAll}
										/>
									</div>
								</TableCell>
							)}
							<TableCell
								key={showCheckbox ? 1 : 0}
								sx={{ width: '1rem' }}
							>
								<Typography
									variant="caption"
									size={0.8}
									weight={1.2}
								>
									No.
								</Typography>
							</TableCell>
							{columns.map(
								(column, index) =>
									!column.hidden && (
										<TableCell
											key={index + 1 + (showCheckbox ? 1 : 0)}
											sx={{ width: column.size ? `${column.size}rem` : 'fit-content' }}
										>
											{column.sortable && column.type !== 'component' ? (
												<TableSortLabel
													active={sortColumn === column.key}
													direction={sortColumn === column.key ? sortDirection : 'asc'}
													onClick={() => handleSort(column.key)}
												>
													{column.label}
												</TableSortLabel>
											) : (
												<Typography
													variant="caption"
													size={0.8}
													weight={1.2}
												>
													{column.label}
												</Typography>
											)}
										</TableCell>
									)
							)}
							{showActions && (
								<TableCell
									key={columns.length + 1}
									sx={{ width: '75px' }}
								>
									<div className="flex justify-end">
										<Typography
											variant="caption"
											size={0.8}
											weight={1.2}
										>
											Actions
										</Typography>
									</div>
								</TableCell>
							)}
						</TableRow>
					</TableHead>
					<TableBody>{tableBody}</TableBody>
				</Table>
			</div>
			{pagination && (
				<div className="flex justify-end p-4">
					<Pagination
						count={totalPages}
						page={page}
						onChange={handlePageChange}
						siblingCount={1}
						boundaryCount={1}
						color="primary"
						variant="outlined"
					/>
				</div>
			)}
		</Paper>
	)
}

export default DataTable