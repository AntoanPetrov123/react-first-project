import { useEffect, useState } from "react";
import urls from "../../../storage/urls";
import CardProfile from "../../UI/CardProfile";
import CarItemProfile from "./CarItemProfile";

import classes from './Profile.module.css';

const Profile = () => {

    const [userPostsIds, setUserPostsIds] = useState([]);
    const [userPosts, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // const [isEmpty, setIsEmpty] = useState(false);

    console.log(isLoading);

    const loadUserPosts = () => {
        let userPostsIds = [];
        fetch(urls.users)
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
                            if (users[i].posts) {
                                console.log(users[i].posts, 'posts');
                                users[i].posts.forEach(post => post && userPostsIds.push(post));
                            }
                        }
                    }
                    setUserPostsIds(userPostsIds);
                }
            ).catch(error => alert(error.message));
        console.log('here');
    };
    useEffect(() => {
        loadUserPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setCars([]);
        if (userPostsIds.length > 0) {
            fetch(urls.cars)
                .then(res => {
                    return res.json();
                })
                .then(result => {
                    // if (!result) {
                    //     setIsEmpty(true);
                    //     return;
                    // }
                    return result;
                })
                .then(result => {
                    console.log(result);
                    console.log(userPostsIds);
                    const userPosts = [];
                    for (let i = 0; i < userPostsIds.length; i++) {
                        for (let j = 0; j < Object.keys(result).length; j++) {
                            if (userPostsIds[i] === Object.keys(result)[j]) {
                                userPosts.push({
                                    id: userPostsIds[i],
                                    description: result[Object.keys(result)[j]].description,
                                    imageUrl: result[Object.keys(result)[j]].imageUrl,
                                    name: result[Object.keys(result)[j]].name,
                                    price: result[Object.keys(result)[j]].price,
                                });
                                setCars(userPosts);
                                setIsLoading(false);
                            }
                        }
                    }

                }).catch(error => alert(error.message));


        }
    }, [userPostsIds])



    console.log(userPostsIds);

    const carList = userPosts.map((post) =>
        <CarItemProfile
            handleCarDeleted={loadUserPosts}
            key={post.id}
            description={post.description}
            id={post.id}
            imageUrl={post.imageUrl}
            name={post.name}
            price={post.price}
        />
        // console.log(post)
    );
    console.log(carList);

    if (isLoading && carList.length !== 0) {
        return (
            <div className={classes['spinner-container']} >
                <div className={classes["loading-spinner"]}>
                </div>
            </div>
        );
    }

    // if (carList.length === 0) {
    //     return (
    //         <section className={classes.cars}>
    //             <div className={classes.empty}>
    //                 <p className={classes['empty-text']}>Oops! You don't have any posts!</p>
    //                 <p className={classes['empty-text']}>Create One - <Link to="/create-post">Here!</Link> </p>
    //             </div>
    //         </section >
    //     );
    // }
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