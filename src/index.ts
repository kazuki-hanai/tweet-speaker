import request, { RequestCallback, Response } from 'request';
import * as fs from 'fs';

export const isJapanese = (sentence: string): boolean =>
    (sentence.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/)) ? true : false;

export const speak = (sentence: string): void => {
    if (isJapanese(sentence) === true) {
        console.log("speak japanese");
    } else {
        console.log("speak english");
    }
};

export const getAudioFromMaryTTS = (sentence: string, filename: string): void => {
    const MARYTTS_SERVER = 'http://localhost:59125/process';
    const callback: RequestCallback = (error: any, response: Response, body: any): void => {
        if (error === null) {
            // console.log(response);
            // console.log(body);
        } else {
            console.log(error);
        }
    };
    request.post(MARYTTS_SERVER, {
        form: {
            'INPUT_TEXT': sentence,
            'INPUT_TYPE': 'TEXT',
            'OUTPUT_TYPE': 'AUDIO',
            'LOCALE': 'en_US',
            'AUDIO': 'AU_STREAM',
            'VOICE': 'cmu-slt-hsmm',
            'STYLE': '',
        }
    }, callback).pipe(fs.createWriteStream(filename));
};

getAudioFromMaryTTS("hello from ubuntu! how are you?", 'test.out');