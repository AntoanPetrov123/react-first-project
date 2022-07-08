import classes from './CreateCarPost.module.css';

const CreateCarPost = () => {

    return(
<section className={classes.auth}>
      <h1>Create a post</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor='name'>Car Brand</label>
          <input type='text' id='name' placeholder='Mercedes' required />
        </div> 
        <div className={classes.control}>
          <label htmlFor='image'>Car Photo</label>
          <input type='text' id='image' placeholder='http://...' required />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Car Description</label>
          <textarea type='text' id='description' rows='4' placeholder='Brand new; Color: red; Year: 2018...' required></textarea>
        </div>
        <div className={classes.control}>
          <label htmlFor='price'>Car Price</label>
          <input type='number' id='price' placeholder='8888.88' required />
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

export default CreateCarPost;