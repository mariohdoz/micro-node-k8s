import { useState } from "react";
import axios from "axios";

const signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [errors, setErrors] = useState([]);

    const onSubmit = async (event) => {
        event.preventDefault();
        
        try {            
            const response = await axios.post('/api/users/signup', {
              email,
              password,
              name,
            });

            console.log('response');
            console.log(response);
            console.log('response.data');
            console.log(response.data);
        } catch (error) {
            console.log(error.response.data.errors)
            setErrors(error.response.data.errors);
        }

    };

    return (
      <form onSubmit={onSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        { errors.length > 0 && <div className="alert alert-danger">
          {errors.map((err) => (
              <ul className="my-0">
                  <li key={err.message}>{err.message}</li>
              </ul>
          ))}
        </div>}
        <button className="btn btn-primary">Sign Up</button>
      </form>
    );
};

export default signup;