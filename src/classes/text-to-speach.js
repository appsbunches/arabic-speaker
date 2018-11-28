import Tts from 'react-native-tts';
import {
    NetInfo  
  } from 'react-native';
import { ArabicRecorderAndPlayer } from './ArabicRecorderAndPlayer';
import { Storage } from './storage';
import Genders from '../constants/Genders';
export class TextToSpeach {
    static instance;
    constructor() {
        Tts.getInitStatus().then(() => {
            Tts.setDefaultLanguage('ar-SA');
            Tts.setDefaultRate(1.3);
            Tts.setDefaultPitch(1.3);
        })
    }

    static getInstance() {
        if(!TextToSpeach.instance) {
            TextToSpeach.instance = new TextToSpeach();    
        }
        return TextToSpeach.instance;
    }

     speak(text) {
        NetInfo.isConnected.fetch().then(isConnected => {
            if(isConnected) { // handle  Platform.OS === 'android'
                TextToSpeach.instance.responsiveVoiceSpeak(text)
            } else {
                Tts.speak(text);         
            }
          });
    }

    responsiveVoiceSpeak(text) {
        const storageInstance =  Storage.getInstance();  
        const settings = {value: 'null'};
        storageInstance.getItem('settingsValues', settings).then(res => {
            const requestPath = 'https://code.responsivevoice.org/getvoice.php?t=$text&tl=ar&gender=$gender';
            const gender = settings.value && settings.value.voiceGender === Genders.female ? 'female' : 'male';
            ArabicRecorderAndPlayer.getInstance().onStartPlay(requestPath.replace('$text', encodeURI(text)).replace('$gender', gender));
        });
    }
}