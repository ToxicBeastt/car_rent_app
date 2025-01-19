export interface Profile {
    id: string;
    username: string;
}

export interface User {
    user: Profile;
    username: string;
}

export interface MenuItem {
    label: string;
    href?: string;
    children?: MenuItem[];
    id: string;
}

export interface ColumnTable {
	label: string
	key: string
	type?: 'string' | 'image' | 'action-detail' | 'action' | 'status' | 'component'
	sortable?: boolean
	width?: boolean
	size?: number,
	hidden?: boolean;
}

export interface queryParam {
	page: string
	size: string
	search?: string
	date?: Date | null;
}

export interface Car {
    id: number;
    brand: string;
    model: string;
    licensePlate: string;
    rentalRate: number;
}

export interface ListResponse {
	page: number
	size: number
	total: number
	totalPages: number
}

export interface Rental {
    id: number;
    carId: number;
    userId: number;
    startDate: Date;
    endDate: Date;
    car: Car;
    user: User;
}
