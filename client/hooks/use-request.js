import axios from "axios";
import { useState } from "react";

const hook = ({url, method, body, onSuccess}) => {
  const [errors, setErrors] = useState(null);

  const doReq = async () => {
    try {
      setErrors(null);
      const response = await axios[method](url, body);

      if(onSuccess){
        onSuccess(response.data);
      }

      return response.body;
    } catch (err) {

      setErrors(
        <div className="alert alert-danger">
          {err.response.data.errors.map((err) => (
            <ul className="my-0">
              <li key={err.message}>{err.message}</li>
            </ul>
          ))}
        </div>
      )
    }
  }

  return {doReq, errors}

}

export default hook; 