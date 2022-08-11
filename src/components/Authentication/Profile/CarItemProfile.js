import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import urls from '../../../storage/urls';
import classes from './CarItemProfile.module.css';
const CarItemProfile = (props) => {

    const price = `$${+props.price}`

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userPosts, setCars] = useState([]);
    let userPostsIds = [];

    const redirect = useNavigate();

    console.log(props.name, 'props');

    const deleteButtonHandler = (postId) => {

        const fetchCars = async () => {
            const responsePosts = await fetch(`https://change-your-car-react-default-rtdb.firebaseio.com/cars/${postId}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!responsePosts.ok) {
                throw new Error('Somthing is wrong!');
            }
        };

        const fetchCarsInProfile = async () => {
            const responsePostsInProfile = await fetch(`https://change-your-car-react-default-rtdb.firebaseio.com/users/${localStorage.userId}/posts.json`);
            if (!responsePostsInProfile) {
                console.log('empty');
            }
            const resData = await responsePostsInProfile.json();

            const dataEntries = Object.entries(resData);

            let indexForDelete;

            dataEntries.map(([k, v]) => v === postId ? indexForDelete = k : indexForDelete);

            const responseCurrentPostInProfile = await fetch(`https://change-your-car-react-default-rtdb.firebaseio.com/users/${localStorage.userId}/posts/${indexForDelete}.json`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            if (!responseCurrentPostInProfile.ok) {
                throw new Error('Somthing is wrong!');
            }
            console.log(localStorage.userId, 'ids');
            props.handleCarDeleted();
        }
        fetchCars().catch((err) => {
            setIsLoading(false);
            setError(err.message);
        });

        fetchCarsInProfile().catch((err) => {
            setIsLoading(false);
            setError(err.message);
        });

        redirect('/profile')
    };

    // chech if we have any errors
    // if (isLoading && !error) {
    //     return (
    //         <div className={classes['spinner-container']} >
    //             <div className={classes["loading-spinner"]}>
    //             </div>
    //         </div>
    //     );
    // }
    const postData = {
        name: props.name,
        imageUrl: props.imageUrl,
        description: props.description,
        price: +props.price,
        _id: props.id
    }


    return (
        <li className={classes.car}>
            <div>
                <img src={props.imageUrl} alt="car img" className={classes.img} />
            </div>
            <div>
                <div><h3>{props.name}</h3></div>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div className={classes['details-btn']}>
                <Link to={`/edit/${props.id}`}
                    state={postData}
                >
                    Edit
                </Link>
            </div>
            <div>
                <button className={classes['delete-btn']} onClick={() => deleteButtonHandler(props.id)}>Delete</button>
            </div>
        </li>
    );
}
export default CarItemProfile;