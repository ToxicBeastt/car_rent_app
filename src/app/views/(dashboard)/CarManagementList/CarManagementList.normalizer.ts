import { Cars, CarsList } from "./CarManagementList.types"

const carManagementListNormalizer = (res: CarsList): CarsList => {
	const { data, page = 0, size = 0, total = 0, totalPages = 0 } = res
	const listData = (data || []).map((car: Cars): Cars => ({
		id: car.id || 0,
        brand: car.brand || '',
        model: car.model || '',
        licensePlate: car.licensePlate || '',
        rentalRate: car.rentalRate || 0,
	}))
	return {
		data: listData,
		page,
		size,
		total,
		totalPages
	}
}

export default carManagementListNormalizer