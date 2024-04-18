import axios from 'axios';
import logger from './logger';
import { Environments } from '../utils';

const callProcessImage = (userId: number, url: string, fileName: string) => {
    const key = Environments.proccessImageKey;
    const body = {
        userId, 
        url, 
        fileName
    }
    axios.post(key, body)
        .then(res => {})
        .catch(error => logger(error));    
}

export default callProcessImage;