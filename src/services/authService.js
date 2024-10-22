const BACKEND_URL = 'http://localhost:3000'; // The Express API url

const signUp = async (userData) => {
  try {
    const res = await fetch(`${BACKEND_URL}/users/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const json = await res.json();
    if (json.err) {
      throw new Error(json.err);
    }
    if (json.token) {
      localStorage.setItem('token', json.token); // add this line to store the JWT token in localStorage

      const user = JSON.parse(atob(json.token.split('.')[1]));
      return user;
    }
    return json;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const signIn = async (user) => {
    try {
      const res = await fetch(`${BACKEND_URL}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
    });
      const json = await res.json();
  
      if (json.error) {
        throw new Error(json.error);
      }
  
      if (json.token) {
        localStorage.setItem('token', json.token); // add this line to store the JWT token in localStorage

        const user = JSON.parse(atob(json.token.split('.')[1]));
        console.log(user)
        return user;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const getUser = () =>  {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const myUser = JSON.parse(atob(token.split('.')[1]));
    return myUser;
  }

  const signOut = (props) => {
    try {
      const token = localStorage.getItem('token');


      if (token) {
        localStorage.removeItem('token');
        
      } else {
        console.log("No token found. User might already be signed out.");
      }
      // You can add any additional cleanup here, such as clearing other storage or state
      return true; //successful sign-out

    } catch (err) {
      console.log(err);
      return false; //failed sign-out
    }
  };
  
  export { signUp, signIn, getUser, signOut};
