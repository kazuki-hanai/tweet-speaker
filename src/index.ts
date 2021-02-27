import request, { RequestCallback, Response } from 'request';
import * as fs from 'fs';
import { exec } from 'child_process';


export const isJapanese = (sentence: string): boolean =>
    (sentence.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/)) ? true : false;

export const speak = (sentence: string): void => {
    if (isJapanese(sentence) === true) {
        console.log("speak japanese");
    } else {
        console.log("speak english");
    }
};

export const getAudioFromMaryTTS = (sentence: string, filename: string, playAudio: (filename: string) => void): void => {
    const MARYTTS_SERVER = 'http://localhost:59125/process';
    const callback: RequestCallback = (error: any, response: Response, body: any): void => {
        if (error === null) {
            playAudio(filename);
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

const main = async (): Promise<void> => {
    const sentence = "hello from ubuntu! how are you?";
    const filename = "test.out";

    const playAudio = (filename: string): void => {
        const PLAY_CMD = 'aplay';
        exec(`${PLAY_CMD} ${filename}`);
    }

    if (isJapanese(sentence)) {
        console.log('Japanese are not supported yet.');
    } else {
        getAudioFromMaryTTS(sentence, filename, playAudio);
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});