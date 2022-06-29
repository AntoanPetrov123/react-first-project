import Card from '../UI/Card';
import CarItem from './CarItem/CarItem';

import classes from './AvaliableCars.module.css';

const DUMMY_CARS = [
    {
        id: 'car1',
        name: 'Mercedes',
        description: 'Brand New Model 2022 CLS 8.0 BTurbo',
        imageUrl: 'https://www.drivearabia.com/app/uploads/2021/04/mercedes-amg-cls-53-2021-4.jpg',
        price: 153000.00,
    },
    {
        id: 'car2',
        name: 'AUDI',
        description: 'Audi S8 2019 from Germany 140000km, 260hp',
        imageUrl: 'http://superkoli.net/wp-content/uploads/2019/07/Audi-S8-Official2.jpg',
        price: 69000.00,
    },
    {
        id: 'car3',
        name: 'Lamborgini',
        description: 'Brand New Lambo, color: green, hp: 500, gear: automatic',
        imageUrl: 'https://i.pinimg.com/originals/5a/70/fa/5a70fa3a41a543693f3d3ae018b82eab.jpg',
        price: 1200000.00,
    },
];

const AvaliableCars = () => {
    const carList = DUMMY_CARS.map((car) =>
        <CarItem
            key={car.id}
            name={car.name}
            description={car.description}
            imageUrl={car.imageUrl}
            price={car.price}
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