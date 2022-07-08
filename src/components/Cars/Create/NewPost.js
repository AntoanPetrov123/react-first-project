import CreateCarPostForm from "./CreateCarPostForm";

const NewPost = () => {
    const addPostHandler = postData => {

    };

    return(
        <CreateCarPostForm onAddPost={addPostHandler} />
    );
};

export default NewPost;