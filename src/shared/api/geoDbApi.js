const GEO_DB_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';
const RAPIDAPI_KEY = 'ebf17faf2dmshfc4ac01e8ad5786p1303b1jsn83061c32d80a';

export const getCountries = async () => {
	const response = await fetch(`${GEO_DB_URL}/countries`, {
		method: 'GET',
		headers: {
			'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
			'X-RapidAPI-Key': RAPIDAPI_KEY,
		},
	});

	if (!response.ok) {
		throw new Error('Failed to fetch countries');
	}

	const data = await response.json();
	return data.data;
};

export const getCitiesByCountry = async countryCode => {
	const response = await fetch(
		`${GEO_DB_URL}/cities?countryIds=${countryCode}`,
		{
			method: 'GET',
			headers: {
				'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
				'X-RapidAPI-Key': RAPIDAPI_KEY,
			},
		}
	);

	if (!response.ok) {
		throw new Error('Failed to fetch cities');
	}

	const data = await response.json();
	return data.data;
};
