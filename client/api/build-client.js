import axios from 'axios';

const buildClient = ({ req }) => {

  console.log(typeof window);
  if (typeof window === 'undefined') {
    // We are on the server
    console.log('Entro RSS');
    return axios.create({
      baseURL: 'http://ingress-nginx.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    console.log('Entro local');
    // We must be on the browser
    return axios.create({
      baseURL: '/',
    });
  }
};

export default buildClient;