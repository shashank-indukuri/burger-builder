import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-dc8ee.firebaseio.com/'
});

export default instance;