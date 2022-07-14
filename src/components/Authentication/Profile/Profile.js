import { useState } from "react";
import CardProfile from "../../UI/CardProfile";
import CarItemProfile from "./CarItemProfile";

import classes from './Profile.module.css';

const Profile = () => {

    let userPostsIds = [];
    const [userPosts, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    fetch('https://change-your-car-react-default-rtdb.firebaseio.com/users.json')
        .then(res => {
            return res.json();
        })
        .then(result => {
            console.log(result, 'result');
            return Object.values(result);
        })
        .then(
            users => {
                // console.log(data.name, 'post');
                // console.log(localStorage.userId, 'id');
                const usersLength = users.length;
                for (let i = 0; i < usersLength; i++) {
                    if (users[i].userId === localStorage.userId) {
                        console.log(users[i], 'posts');
                        if (users[i].posts) {
                            users[i].posts.map(post => userPostsIds.push(post));
                        }
                    }
                }
            }
        ).catch(error => alert(error.message));

    fetch('https://change-your-car-react-default-rtdb.firebaseio.com/cars.json')
        .then(res => {
            return res.json();
        })
        .then(result => {
            return result;
        })
        .then(result => {
            for (let i = 0; i < userPostsIds.length; i++) {
                for (let j = 0; j < Object.keys(result).length; j++) {
                    if (userPostsIds[i] === Object.keys(result)[j]) {
                        userPosts.push({
                            id: userPostsIds[i],
                            description: result[Object.keys(result)[j].toString()].description,
                            imageUrl: result[Object.keys(result)[j].toString()].imageUrl,
                            name: result[Object.keys(result)[j].toString()].name,
                            price: result[Object.keys(result)[j].toString()].price,
                        });
                        setCars(userPosts);
                        setIsLoading(false);
                    }
                }
            }

        }).catch(error => alert(error.message));



    if (isLoading) {
        return (
            <div className={classes['spinner-container']} >
                <div className={classes["loading-spinner"]}>
                </div>
            </div>
        );
    }

    const carList = userPosts.map((post) =>
        <CarItemProfile
            key={post.id}
            id={post.id}
            name={post.name}
            description={post.description}
            imageUrl={post.imageUrl}
            price={post.price}
        />
    );

    return (
        <section className={classes.cars}>
            <CardProfile>
                <ul>
                    {carList}
                </ul>
            </CardProfile>
        </section>
    );
};

export default Profile;