import { useEffect } from "react";
import Router from 'next/router';
import useRequest from "../../hooks/use-request";

const signOut = () => {

  const {doReq} = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess:  () => {
      Router.push('/');
    }
  });

  useEffect( () => {
    doReq();
  }, [])

  return <div>
    Sigin you out ...
  </div>
}

export default signOut