export interface Profile {
    id: string;
    username: string;
}

export interface User {
    user: Profile;
    username: string;
}

export interface MenuItem {
	label: string
	href?: string
	children?: MenuItem[]
	id: string
}
