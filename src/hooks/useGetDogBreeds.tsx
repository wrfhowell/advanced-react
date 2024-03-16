import { useState } from "react";
import { useToastContext } from "../contexts/ToastContext";
// Interface defining response type for API listing dog breeds
interface DogsListResponse {
	status: string;
	message: {
		[key: string]: string[];
	};
}

export const useGetDogBreeds = () => {
	const [breedsList, setBreedsList] = useState<string[]>([]);
	const { toast } = useToastContext();

	const getBreedsList = () => {
		fetch("https://dog.ceo/api/breeds/list/all")
			.then((response) => response.json())
			.then((data: DogsListResponse) => {
				const dogs = data.message;
				const breeds: string[] = [];
				Object.keys(dogs).forEach((dog) => {
					if (dogs[dog].length === 0) {
						breeds.push(dog);
					} else {
						dogs[dog].forEach((subDog) => {
							breeds.push(`${subDog} ${dog}`);
						});
					}
				});
				toast("Data Fetched");
				setBreedsList([" ", ...breeds]);
			})
			.catch((err) => {
				toast("Error Fetching Data");
				console.log(err);
			});
	};

	return { breedsList, getBreedsList };
};
