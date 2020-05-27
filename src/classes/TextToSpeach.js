import { Alert, Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import Tts from "react-native-tts";

import { ArabicRecorderAndPlayer } from "./ArabicRecorderAndPlayer";
import { Storage } from "./Storage";
import Genders from "../constants/Genders";
import { AutoSoundsSaver } from "../classes/AutoSoundsSaver";

let isConnected;
export class TextToSpeach {
  static instance;
  constructor() {
    Tts.getInitStatus().then(() => {
      Tts.setDefaultLanguage("ar-SA");
      Tts.setDefaultRate(0.5);
      Tts.setDefaultPitch(0.7);
    });
    // NetInfo.addEventListener(state => {
    //   isConnected = state.isConnected;
    //   Alert.alert(isConnected);
    // });
  }

  static getInstance() {
    if (!TextToSpeach.instance) {
      TextToSpeach.instance = new TextToSpeach();
    }
    return TextToSpeach.instance;
  }
  fetchWithTimeout(url, options, timeout = 1000) {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeout)
      )
    ]);
  }

  speak(text) {
    const storageInstance = Storage.getInstance();
    const settings = { value: "null" };
    storageInstance.getItem("settingsValues", settings).then(res => {
      const gender =
        settings.value && settings.value.voiceGender === Genders.female
          ? "female"
          : "male";
      if(!this.playStoredFile(gender, text)) {
        NetInfo.fetch().then(state => {
          if (state.isConnected) {
            const responsiveVoiceSpeak = (text) => {
              ArabicRecorderAndPlayer.getInstance().onStartPlay(AutoSoundsSaver.getInstance().getUrlForResposiveVoiceRequest(text, gender));
            }
            this.formatSentenceAndExecuteCallback(text, responsiveVoiceSpeak);
          } else if(!this.playStoredFile( gender === "male" ? "female" : "male", text)) {
            if (Platform.OS === "android") {
              this.displayAlertMessage();
            } else {
              text = text.replace("بكم", "بِكَمْ");
              Tts.speak(text);
            }
          }
        });
      }
    });
  }

  playStoredFile(gender, text) {
    const autoSoundSaver = AutoSoundsSaver.getInstance();
    const fileName = autoSoundSaver.getFileName(gender, text);
    const isSoundExist = autoSoundSaver.isSoundExist(fileName);
    if (isSoundExist) {
      ArabicRecorderAndPlayer.getInstance().onStartPlay(
        Platform.select({
          ios: fileName + ".mpga",
          android: autoSoundSaver.getDirectory() + "/" + fileName + ".mpga"
        })
      );
    } 
    return isSoundExist;
  }

  formatSentenceAndExecuteCallback(text, callback) {
    text = text.replace("بكم", "بِكَمْ");
    TextToSpeach.instance
      .fetchWithTimeout(
        "http://18.224.240.0:8082/api/process?text=".concat(text),
        {
          method: "GET"
        }
      )
      .then(response => {
        if (response.status == "20") {
           return response.text();
        }
        debugger;
        return text;
      }).then(formattedText => {
        debugger;
          text = formattedText || text;
          callback(text);
        })
    .catch(err => {
      callback(text);
    });
  }

  displayAlertMessage() {
    Alert.alert("يجب أن تكون متصل بالانترنت");
  }
}
