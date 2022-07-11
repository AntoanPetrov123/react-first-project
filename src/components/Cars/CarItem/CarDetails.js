import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../UI/NotFound";

import classes from './CarDetails.module.css';

// const carPosts = [
//     {
//         id: 'car1',
//         description: "Brand New Model 2022 CLS 8.0 BTurbo",
//         imageUrl: "https://www.drivearabia.com/app/uploads/2021/04/mercedes-amg-cls-53-2021-4.jpg",
//         name: "Mercedes",
//         price: 153000.99
//     },
//     {
//         id: 'car2',
//         description: "Audi S8 2019 from Germany 140000km, 260hp",
//         imageUrl: "http://superkoli.net/wp-content/uploads/2019/07/Audi-S8-Official2.jpg",
//         name: "AUDI",
//         price: 74999.99
//     },
//     {
//         id: 'car3',
//         description: "Brand New Lambo, color: green, hp: 500, gear: automatic",
//         imageUrl: "https://www.bentleylongisland.com/galleria_images/2595/2595_main_f.jpg",
//         name: "Lamborgini",
//         price: 1199999.99
//     },
//     {
//         id: 'car4',
//         description: "The most beautiful car Chevrolet Camaro; brand new; color: yellow; 450hp",
//         imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjSP8rlkfkDDyPMkEb_X1AtiX4XSWfxq126cG-544hRGVR86QaKjMnoy5LXlN6sDDsQMs&usqp=CAU",
//         name: "Chevrolet Camaro",
//         price: 149999.99
//     },
// ];

const CarDetails = () => {
    const params = useParams();
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            const response = await fetch('https://change-your-car-react-default-rtdb.firebaseio.com/cars.json');

            if (!response.ok) {
                throw new Error('Somthing is wrong!');
            }
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
            // console.log(loadedCars);
            setCars(loadedCars);
            setIsLoading(false);
        };

        //chech if we have any errors
        fetchCars().catch((err) => {
            setIsLoading(false);
            setError(err.message);
        });

    }, []);

    if (isLoading) {
        return (
            <div className={classes['spinner-container']} >
                <div className={classes["loading-spinner"]}>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <section className={classes['cars-error-box']}>
                <p className={classes['cars-error']}>{error}</p>
            </section>
        );
    }

    // console.log(cars);
    // console.log(params.id);
    const post = cars.find(car => car.id === params.id);
    // console.log(post);

    if (!post) {
        return (
            <NotFound />
        );
    }

    return (
        <section className={classes['card-details']}>
            <h1 className={classes['card-header']}>{post.name}</h1>
            <img className={classes['card-img']} src={post.imageUrl} alt="car-img" />
            <p className={classes['card-dedscription']}>{post.description}</p>
            <div className={classes.divider}></div>
            <p className={classes['card-price']}>${post.price}</p>
        </section>
    );
};

export default CarDetails;