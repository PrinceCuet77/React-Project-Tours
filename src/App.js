import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'

// data api
const url = 'https://course-api.com/react-tours-project'

// 'App' component
function App() {
	let [loading, setLoading] = useState(true) // for loading
	let [tours, setTours] = useState([]) // array

	// removing array one by one
	let removeTour = (id) => {
		let newTour = tours.filter((tour) => tour.id !== id)
		setTours(newTour)
	}

	let fetchTours = async () => {
		setLoading(true)

		try {
			// loading data from api
			let response = await fetch(url)
			let tours = await response.json()
			setLoading(false)
			setTours(tours)
		} catch (error) {
			setLoading(false)
			console.log(error)
		}
	}

	useEffect(() => {
		fetchTours()
	}, [])

	// calling loading component
	if (loading) {
		return (
			<main>
				<Loading />
			</main>
		)
	}

	// for refresh
	if (tours.length === 0) {
		return (
			<main className='title'>
				<h2>no tour left</h2>
				<button className='btn' onClick={fetchTours}>
					refresh
				</button>
			</main>
		)
	}

	return (
		<main>
			<Tours tours={tours} removeTour={removeTour} />
		</main>
	)
}

export default App
