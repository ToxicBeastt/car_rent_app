import Typography from '@/app/components/base/Typography'
import { MENU_ITEMS } from '@/app/constants'
import { MenuItem } from '@/app/types'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Sidebar = (props: { isOpen:boolean; toggleSidebar: () => void;}) => {
    const { toggleSidebar, isOpen } = props;
	const router = useRouter()
	const [open, setOpen] = useState<{ [key: string]: boolean }>({})

	const handleNavigate = (url?: string) => {
		if (url) {
			router.push(`/${url}`)
			toggleSidebar()
		}
	}

	const handleClick = (itemId: string) => {
		setOpen((prevOpen) => ({ ...prevOpen, [itemId]: !prevOpen[itemId] }))
	}

	const renderMenuItems = (items: MenuItem[]) => {
		return items.map((item, index) => (
			<ListItem key={index} sx={{ display: 'block' }}>
				{item.children && item.children.length > 0 ? (
					<>
						<ListItemButton
							sx={{
								pl: 1
							}}
							onClick={() => handleClick(item.id)}
						>
							<ListItemText>
								<Typography size={1} weight={1.1}>
									{item.label}
								</Typography>
							</ListItemText>
							{item.children && item.children.length > 0 && (
								<>{open[item.id] ? <ExpandLessIcon /> : <ExpandMoreIcon />}</>
							)}
						</ListItemButton>
						<Collapse in={open[item.id]} timeout='auto' unmountOnExit>
							<List component='div' disablePadding>
								{item.children.map((submenu) => (
									<ListItemButton key={submenu.id} onClick={() => handleNavigate(submenu.href)}>
										<ListItemText>
											<Typography size={0.875} weight={1.05}>
												{submenu.label}
											</Typography>
										</ListItemText>
									</ListItemButton>
								))}
							</List>
						</Collapse>
					</>
				) : (
					<ListItemButton onClick={() => handleNavigate(item.href)}>
						<ListItemText>
							<Typography>{item.label}</Typography>
						</ListItemText>
					</ListItemButton>
				)}
			</ListItem>
		))
	}

	return (
		<Drawer open={isOpen} onClose={toggleSidebar} disableScrollLock>
			<Box sx={{ width: 250 }} role='presentation'>
				<List component='nav'>
					<ListItem
						sx={{
							display: 'flex',
							justifyContent: 'space-between'
						}}
					>
						<IconButton
							size='large'
							edge='start'
							color='inherit'
							aria-label='menu'
							sx={{ mr: 2 }}
							onClick={toggleSidebar}
						>
							<MenuIcon />
						</IconButton>
					</ListItem>
					<Divider />
					{renderMenuItems(MENU_ITEMS)}
				</List>
			</Box>
		</Drawer>
	)
}

export default Sidebar;