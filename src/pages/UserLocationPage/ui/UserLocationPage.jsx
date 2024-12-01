import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveLocation } from '../../../app/store/slices/locationSlice';
import { getCitiesByCountry, getCountries } from '../../../shared/api/geoDbApi';
import styles from './UserLocationPage.module.scss';

const UserLocationPage = () => {
	const [countries, setCountries] = useState([]);
	const [cities, setCities] = useState([]);
	const [selectedCountry, setSelectedCountry] = useState('');
	const [selectedCity, setSelectedCity] = useState('');
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const countriesData = await getCountries();
				setCountries(countriesData);
			} catch (error) {
				console.error('Error fetching countries:', error);
			}
		};

		fetchCountries();
	}, []);

	useEffect(() => {
		const fetchCities = async () => {
			if (!selectedCountry) return;

			try {
				const citiesData = await getCitiesByCountry(selectedCountry);
				setCities(citiesData);
			} catch (error) {
				console.error('Error fetching cities:', error);
			}
		};

		fetchCities();
	}, [selectedCountry]);

	const handleSubmit = event => {
		event.preventDefault();

		if (selectedCity) {
			const city = cities.find(city => city.city === selectedCity);
			const locationData = {
				city: selectedCity,
				country: selectedCountry,
				latitude: city.latitude,
				longitude: city.longitude,
			};
			dispatch(saveLocation(locationData));
			window.location.href = '/';
		}
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Select Your Location</h2>
					<Link to='/'>Go Back</Link>
				</div>
				<form onSubmit={handleSubmit} className={styles.formContainer}>
					<div className={styles.selectContainer}>
						<label htmlFor='country'>Country</label>
						<select
							id='country'
							value={selectedCountry}
							onChange={e => setSelectedCountry(e.target.value)}
						>
							<option value=''>Select a country</option>
							{countries.map(country => (
								<option key={country.code} value={country.code}>
									{country.name}
								</option>
							))}
						</select>
					</div>

					<div className={styles.selectContainer}>
						<label htmlFor='city'>City</label>
						<select
							id='city'
							value={selectedCity}
							onChange={e => setSelectedCity(e.target.value)}
							disabled={!selectedCountry}
						>
							<option value=''>Select a city</option>
							{cities.map(city => (
								<option key={city.city} value={city.city}>
									{city.city}
								</option>
							))}
						</select>
					</div>

					<button type='submit' disabled={!selectedCity}>
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export { UserLocationPage };
