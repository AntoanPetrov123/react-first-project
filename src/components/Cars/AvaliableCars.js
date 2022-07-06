import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import CarItem from './CarItem/CarItem';

import classes from './AvaliableCars.module.css';

const AvaliableCars = () => {
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch('https://change-your-car-react-default-rtdb.firebaseio.com/cars.json');
            const responseData = await response.json();

            const loadedCars = [];

            for (const key in responseData) {
                loadedCars.push({
                    id: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    imageUrl: responseData[key].imageUrl,
                    price: responseData[key].price,
                });
            }
            setCars(loadedCars);
            setIsLoading(false);
        };

        fetchCars();
    }, []);

    if (isLoading) {
        return (
            <div className={classes['spinner-container']} >
                <div className={classes["loading-spinner"]}>
                </div>
            </div>
        );
    }

    const carList = cars.map((car) =>
        <CarItem
            key={car.id}
            id={car.id}
            name={car.name}
            description={car.description}
            imageUrl={car.imageUrl}
            price={car.price}
            inCart={car.inCart}
        />
    );

    return (
        <section className={classes.cars}>
            <Card>
                <ul>
                    {carList}
                </ul>
            </Card>
        </section>
    );
};

export default AvaliableCars;