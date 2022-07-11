import classes from './CreateCarPostForm.module.css';

const CreateCarPostForm = (props) => {

  function submitFormHandler(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let brnad = formData.get('name');
    let image = formData.get('image');
    let description = formData.get('description');
    let price = formData.get('price');

    // props.onCreatePost({ name: brnad, imageUrl: image, description: description, price: price});

    console.log(brnad, image, description, price);
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
          <input type='number' name='price' id='price' placeholder='8888.88' required />
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