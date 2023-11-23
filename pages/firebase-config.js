import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth" ;


const firebaseConfig = {
    apiKey: "AIzaSyDkXXZwkIl2UwuRq72lSZTUYa1JglHqGoA",
    authDomain: "video-deck.firebaseapp.com",
    projectId: "video-deck",
    storageBucket: "video-deck.appspot.com",
    messagingSenderId: "641712399923",
    appId: "1:641712399923:web:71544301b09097e7f4a546"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth ( app )
