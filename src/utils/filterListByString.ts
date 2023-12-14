export const filterListByString = (list: any[], query: string): any[] => {
	if (!query.trim()) {
		return list;
	}

	return list.filter((item) => {
		if (typeof item === 'string') {
			// If the item is a simple string, perform a case-insensitive search.
			return item.toLowerCase().includes(query.toLowerCase());
		} else if (typeof item === 'object') {
			// If the item is an object, check its values for a match with the query.
			const values = Object.values(item);
			for (const value of values) {
				if (
					typeof value === 'string' &&
					value.toLowerCase().includes(query.toLowerCase())
				) {
					return true;
				}
			}
		}
		return false;
	});
};
