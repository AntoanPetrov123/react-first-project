const ErrorHandle = (data) => {
    let errorMessage = 'An unknown error occurred!';
    console.log(data, 'data');
    if (data && data.error && data.error.message) {
        switch (data.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already';
              break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email does not exist.';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'This email or password is not correct.';
              break;
              default:
                  errorMessage = 'An unknown error occurred!';
          }
    }

    return errorMessage;
  }

  export default ErrorHandle;