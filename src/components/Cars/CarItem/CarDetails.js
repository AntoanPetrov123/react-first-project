import { useParams } from "react-router-dom";

import classes from './CarDetails.module.css';

const carPosts = [
    {
        id: 'car1',
        description: "Brand New Model 2022 CLS 8.0 BTurbo",
        imageUrl: "https://www.drivearabia.com/app/uploads/2021/04/mercedes-amg-cls-53-2021-4.jpg",
        name: "Mercedes",
        price: 153000.99
    },
    {
        id: 'car2',
        description: "Audi S8 2019 from Germany 140000km, 260hp",
        imageUrl: "http://superkoli.net/wp-content/uploads/2019/07/Audi-S8-Official2.jpg",
        name: "AUDI",
        price: 74999.99
    },
    {
        id: 'car3',
        description: "Brand New Lambo, color: green, hp: 500, gear: automatic",
        imageUrl: "https://www.bentleylongisland.com/galleria_images/2595/2595_main_f.jpg",
        name: "Lamborgini",
        price: 1199999.99
    },
    {
        id: 'car4',
        description: "The most beautiful car Chevrolet Camaro; brand new; color: yellow; 450hp",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjSP8rlkfkDDyPMkEb_X1AtiX4XSWfxq126cG-544hRGVR86QaKjMnoy5LXlN6sDDsQMs&usqp=CAU",
        name: "Chevrolet Camaro",
        price: 149999.99
    },
];

const CarDetails = () => {
    const params = useParams();

    const post = carPosts.find(post => post.id === params.id);

    console.log(post);

    return (
        <section className={classes['card-details']}>
            <h1 className={classes['card-header']}>{post.name}</h1>
            <img className={classes['card-img']} src={post.imageUrl} alt="car-img"/>
            <p className={classes['card-dedscription']}>{post.description}</p>
            <div className={classes.divider}></div>
            <p className={classes['card-price']}>${post.price}</p>
        </section>
    );
};

export default CarDetails;