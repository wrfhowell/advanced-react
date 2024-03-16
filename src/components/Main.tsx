import { useState } from "react";
import { useGetDogBreeds } from "../hooks/useGetDogBreeds";
import { useGetImageUrl } from "../hooks/useGetImage";

// Interface defining response type for API providing dog image URL

export const Main = () => {
	const [imageLoading, setImageLoading] = useState<boolean>(false);
	const { breedsList, getBreedsList } = useGetDogBreeds();
	const { imageUrl, imageUrlLoading, getImageUrl } = useGetImageUrl();

	// Callback function to execute when select dropdown is changed
	const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedBreed = e.target.value.split(" ").reverse().join("/");
		setImageLoading(true);
		getImageUrl(selectedBreed);
	};

	// Callback function to execute after image has finished loading
	const imageLoaded = () => {
		setImageLoading(false);
	};

	// Function fetching dog breed list, transforming response into a format
	// we can work with

	return (
		<>
			<h1>Dog Picture App</h1>
			{breedsList.length == 0 && (
				<button onClick={getBreedsList}>Get Data</button>
			)}
			<br />
			{breedsList.length > 0 && (
				<select onChange={handleSelectChange}>
					{breedsList.map((breed) => (
						<option key={breed} value={breed}>
							{breed}
						</option>
					))}
				</select>
			)}
			<br />
			{(imageUrlLoading || imageLoading) && <p>Dog Image Loading</p>}
			{!imageUrlLoading && imageUrl && (
				<img
					style={{ marginTop: "50px" }}
					width="400px"
					onLoad={imageLoaded}
					src={imageUrl}
					hidden={imageLoading}
				/>
			)}
		</>
	);
};
