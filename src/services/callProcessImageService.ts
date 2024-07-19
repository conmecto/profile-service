import axios from 'axios';
import logger from './logger';
import { Environments } from '../utils';

const callProcessImage = (userId: number, url: string, fileName: string, postIdRef: Number) => {
    const key = Environments.proccessImageKey;
    const body = {
        userId, 
        url, 
        fileName, 
        postIdRef
    }
    axios.post(key, body)
        .then(res => {})
        .catch(error => logger('Process Image ' + error.toString()));    
}

export default callProcessImage;