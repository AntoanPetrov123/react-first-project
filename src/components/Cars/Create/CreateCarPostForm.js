// import classes from './CreateCarPostForm.module.css';

// const CreateCarPostForm = (props) => {

//   function submitFormHandler(event) {
//     event.preventDefault();

//     let formData = new FormData(event.currentTarget);
//     let brnad = formData.get('name');
//     let image = formData.get('image');
//     let description = formData.get('description');
//     let price = formData.get('price');

//     // props.onCreatePost({ name: brnad, imageUrl: image, description: description, price: price});

//     console.log(brnad, image, description, price);
//     const url = 'https://change-your-car-react-default-rtdb.firebaseio.com/cars.json'
//     fetch(url,
//       {
//         method: 'POST',
//         body: JSON.stringify({
//           brand: brnad,
//           imageUrl: image,
//           description: description,
//           price: price,
//         }),
//         headers: {
//           'Content-Type': 'application/json'
//         },
//       }
//     )
//       .then(res => {
//         if (res.ok) {
//           return res.json();
//         } else {
//           return res.json().then(data => {
//             let errorMessage = 'Authentication failed';
//             if (data && data.error && data.error.message) {
//               errorMessage = data.error.message;
//             }
//             // alert(errorMessage);
//             throw new Error(errorMessage);
//           });
//         }
//       })
//       .then(data => {
//         console.log(data, 'post');

//     })
//       .catch(error => alert(error.message));
//   };

//   return (
//     <section className={classes.auth}>
//       <h1>Create a post</h1>
//       <form method="POST" onSubmit={submitFormHandler}>
//         <div className={classes.control}>
//           <label htmlFor='name'>Car Brand</label>
//           <input type='text' name='name' id='name' placeholder='Mercedes' required />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor='image'>Car Photo</label>
//           <input type='text' name='image' id='image' placeholder='http://...' required />
//         </div>
//         <div className={classes.control}>
//           <label htmlFor='description'>Car Description</label>
//           <textarea type='text' name='description' id='description' rows='4' placeholder='Brand new; Color: red; Year: 2018...' required></textarea>
//         </div>
//         <div className={classes.control}>
//           <label htmlFor='price'>Car Price</label>
//           <input type='number' name='price' id='price' placeholder='8888.88' step="any" required />
//         </div>
//         <div className={classes.actions}>

//           <button>Submit</button>

//           <button
//             type='button'
//             className={classes.toggle}
//           >
//             Go to Home Page!
//           </button>
//         </div>
//       </form>
//     </section>
//   );
// };

// export default CreateCarPostForm;
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import urls from '../../../storage/urls';
import ErrorHandle from '../../Authentication/ErrorHandle';
import useInput from '../../hooks/use-input';
import classes from './CreateCarPostForm.module.css';

const CreateCarPostForm = (props) => {

  const redirect = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    resetForm: resetNameInput
  } = useInput(value => (value.trim() !== '' && value.trim().length > 2));

  const {
    value: enteredUrl,
    isValid: enteredUrlIsValid,
    hasError: urlInputHasError,
    valueChangeHandler: urlChangeHandler,
    inputBlurHandler: urlBlurHandler,
    resetForm: resetUrlInput
  } = useInput(value => (value.trim() !== '' && /^(http|https):\/\/.{0,}$/.test(value)));

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    resetForm: resetDescriptionInput
  } = useInput(value => (value.trim() !== '' && (value.trim().length >= 10 && value.trim().length <= 300)));

  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    resetForm: resetPriceInput
  } = useInput(value => value.trim() !== '');

  let formIsValid = false;

  if (enteredNameIsValid && enteredUrlIsValid && enteredDescriptionIsValid && enteredPriceIsValid) {
    formIsValid = true;
  }
  function submitFormHandler(event) {

    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let brnad = formData.get('name');
    let image = formData.get('image');
    let description = formData.get('description');
    let price = formData.get('price');

    // props.onCreatePost({ name: brnad, imageUrl: image, description: description, price: price});

    setIsLoading(true);

    // useEffect(() => {
    fetch(urls.cars,
      {
        method: 'POST',
        body: JSON.stringify({
          name: brnad,
          imageUrl: image,
          description: description,
          price: price,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      }
    )
      .then(async res => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          const data = await res.json();
          setHasError(true);
          setErrorMessage(ErrorHandle(data));
          throw new Error(ErrorHandle(data));
        }
      })
      .then(data => {
        const postId = data.name;
        setIsLoading(true);
        fetch(urls.users)
          .then(res => {
            return res.json();
          })
          .then(result => {
            return Object.values(result);
          }).then(
            users => {
              // console.log(data.name, 'post');
              // console.log(localStorage.userId, 'id');
              const usersLength = users.length;
              for (let i = 0; i < usersLength; i++) {
                if (users[i].userId === localStorage.userId) {
                  console.log(users[i], 'user i');
                  setIsLoading(true);
                  fetch(`https://change-your-car-react-default-rtdb.firebaseio.com/users/${localStorage.userId}.json`, {
                    method: 'PUT',
                    body: JSON.stringify({
                      ...users[i],
                      posts: users[i].posts ? [...users[i].posts, postId] : [postId],
                    })
                  })
                    .then(async res => {
                      setIsLoading(false);
                      if (res.ok) {
                        return res.json();
                      } else {
                        const data = await res.json();
                        let errorMessage = 'Creation failed';
                        if (data && data.error && data.error.message) {
                          errorMessage = data.error.message;
                        }
                        // alert(errorMessage);
                        throw new Error(errorMessage);
                      }
                    })

                  redirect('/cars-catalog');
                }
              }
            })
          .catch(error => alert(error.message));
      });
    // }, [localStorage.userId])
    resetNameInput();
    resetUrlInput();
    resetDescriptionInput();
    resetPriceInput();

  }

  const nameInputClasses = nameInputHasError ? 'form-control-invalid' : 'form-control';
  const urlInputClasses = urlInputHasError ? 'form-control-invalid' : 'form-control';
  const descriptionInputClasses = descriptionInputHasError ? 'form-control-invalid' : 'form-control';
  const priceInputClasses = priceInputHasError ? 'form-control-invalid' : 'form-control';

  return (
    <section className={classes.auth}>
      <h1>Create a post</h1>
      {hasError && (
        <div className={classes['error-box']}>
          <p className={classes.error}>{errorMessage}</p>
        </div>
      )}

      <form method="POST" onSubmit={submitFormHandler}>
        <div className={classes[nameInputClasses]}>
          <label htmlFor='name'>Car Brand</label>
          <input
            type='text'
            name='name'
            id='name'
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            placeholder='Mercedes'
            defaultValue={enteredName}
            required />
        </div>
        {nameInputHasError && (
          <p className={classes['error-text']}>Name is not valid!</p>
        )}
        <div className={classes[urlInputClasses]}>
          <label htmlFor='image'>Car Photo</label>
          <input
            type='text'
            name='image'
            id='image'
            onChange={urlChangeHandler}
            onBlur={urlBlurHandler}
            placeholder='http://...'
            defaultValue={enteredUrl}
            required />
        </div>
        {urlInputHasError && (
          <p className={classes['error-text']}>Image url is not valid!</p>
        )}
        <div className={classes[descriptionInputClasses]}>
          <label htmlFor='description'>Car Description</label>
          <textarea
            type='text'
            name='description'
            id='description'
            rows='4'
            onChange={descriptionChangeHandler}
            onBlur={descriptionBlurHandler}
            placeholder='Brand new; Color: red; Year: 2018...'
            defaultValue={enteredDescription}
            required ></textarea>
        </div>
        {descriptionInputHasError && (
          <p className={classes['error-text']}>Description is not valid!</p>
        )}
        <div className={classes[priceInputClasses]}>
          <label htmlFor='price'>Car Price</label>
          <input
            type='number'
            name='price'
            id='price'
            step="0.01"
            min={0}
            onChange={priceChangeHandler}
            onBlur={priceBlurHandler}
            placeholder='8888.88'
            defaultValue={enteredPrice}
            required />
        </div>
        {priceInputHasError && (
          <p className={classes['error-text']}>Price is not valid!</p>
        )}
        <div className={classes.actions}>

          {!isLoading && <button disabled={!formIsValid} >Submit</button>}
          {isLoading && <p>Sending request...</p>}

          <Link className={classes.toggle} to="/">Return to the home page</Link>
        </div>
      </form>
    </section>
  );
};

export default CreateCarPostForm;