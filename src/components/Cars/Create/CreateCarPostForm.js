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
import { useNavigate } from 'react-router-dom';
import classes from './CreateCarPostForm.module.css';

const CreateCarPostForm = (props) => {

  const redirect = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let brnad = formData.get('name');
    let image = formData.get('image');
    let description = formData.get('description');
    let price = formData.get('price');

    // props.onCreatePost({ name: brnad, imageUrl: image, description: description, price: price});

    const url = 'https://change-your-car-react-default-rtdb.firebaseio.com/cars.json';
    setIsLoading(true);

    // useEffect(() => {
      fetch(url,
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
            let errorMessage = 'Creation failed';
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message;
            }
            // alert(errorMessage);
            throw new Error(errorMessage);
          }
        })
        .then(data => {
          const postId = data.name;
          setIsLoading(true);
          fetch('https://change-your-car-react-default-rtdb.firebaseio.com/users.json')
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
  }
  return (
    <section className={classes.auth}>
      <h1>Create a post</h1>
      <form method="POST" onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor='name'>Car Brand</label>
          <input type='text' name='name' id='name' placeholder='Mercedes' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Car Photo</label>
          <input type='text' name='image' id='image' placeholder='http://...' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Car Description</label>
          <textarea type='text' name='description' id='description' rows='4' placeholder='Brand new; Color: red; Year: 2018...' required></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor='price'>Car Price</label>
          <input type='number' name='price' id='price' placeholder='8888.88' step="any" required />
        </div>
        <div className={classes.actions}>

          {!isLoading && <button>Submit</button>}
          {isLoading && <p>Sending request...</p>}

          <button
            type='button'
            className={classes.toggle}
          >
            Go to Home Page!
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateCarPostForm;