import { useRef } from 'react';

import classes from './CreateCarPostForm.module.css';

const CreateCarPostForm = (props) => {

    const brandInputRef = useRef();
    const imageInputRef = useRef();
    const descriptionInputRef = useRef();
    const priceInputRef = useRef();


    function submitFormHandler(event) {
      event.preventDefault();

      const enteredBrand = brandInputRef.current.value;
      const enteredImage = imageInputRef.current.value;
      const enteredDescription = descriptionInputRef.current.value;
      const enteredPrice = priceInputRef.current.value;

      props.onCreatePost({ name: enteredBrand, imageUrl: enteredImage, description: enteredDescription, price: enteredPrice})
    }

    return(
<section className={classes.auth}>
      <h1>Create a post</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor='name'>Car Brand</label>
          <input type='text' id='name' placeholder='Mercedes' required ref={brandInputRef} />
        </div> 
        <div className={classes.control}>
          <label htmlFor='image'>Car Photo</label>
          <input type='text' id='image' placeholder='http://...' required ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Car Description</label>
          <textarea type='text' id='description' rows='4' placeholder='Brand new; Color: red; Year: 2018...' required ref={descriptionInputRef}></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor='price'>Car Price</label>
          <input type='number' id='price' placeholder='8888.88' required ref={priceInputRef} />
        </div>
        <div className={classes.actions}>
          
            <button>Submit</button>
          
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