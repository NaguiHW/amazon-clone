import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://us-central1-clone-b5e54.cloudfunctions.net/api ',
  // baseURL: 'http://localhost:5001/clone-b5e54/us-central1/api',
});

export default instance;
