import { useState } from "react";
import Router from 'next/router';
import useRequest from "../../hooks/use-request";

const signup = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const { doReq, errors } = useRequest({
      url: '/api/users/signup',
      method: 'post',
      body: {
        email,
        password,
        name
      },
      onSuccess: () =>  Router.push('/')
    });

    const onSubmit = async (event) => {
        event.preventDefault();
        await doReq();
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
        { errors }
        <button className="btn btn-primary">Sign Up</button>
      </form>
    );
};

export default signup;