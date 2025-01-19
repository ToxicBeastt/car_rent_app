import { MenuItem } from "../types";

export const MENU_ITEMS: MenuItem[] = [
	{
		label: 'Home',
		id: '1',
		children: [
			{
				label: 'Dashboard',
				href: 'dashboard',
				id: '1-1',
			}
		]
	},
]
