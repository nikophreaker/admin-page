import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, limit } from "firebase/firestore";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyBdFMZoNwEWNqCOfUezoSB-TewpOBUfX98",
  authDomain: "mgoalindo---app.firebaseapp.com",
  databaseURL: "https://mgoalindo---app-default-rtdb.firebaseio.com",
  projectId: "mgoalindo---app",
  storageBucket: "mgoalindo---app.appspot.com",
  messagingSenderId: "909481590933",
  appId: "1:909481590933:web:a0626d75765bd850a5db9c",
  measurementId: "G-RLCM7JVYFY",
});

// used for the firestore refs
export const db = getFirestore(firebaseApp);

// here we can export reusable database references
export const adminRef = collection(db, "admin-games");

// Fortune wheel firestore
export const col = "luckyspin";
export const col2 = "kupon";
export const col3 = "prizespinwheel";
export const prizeRef = collection(db, col);
export const kuponRef = collection(db, col2);
export const winnerRef = collection(db, col3);

// Fortune wheel Vip firestore
export const colVip = "luckyspin-vip";
export const colVip2 = "kupon-vip";
export const colVip3 = "prizespinwheel-vip";
export const prizeVipRef = collection(db, colVip);
export const kuponVipRef = collection(db, colVip2);
export const winnerVipRef = collection(db, colVip3);

// Fortune wheel Mobile firestore
export const colMobile = "luckyspin-mobile";
export const colMobile2 = "kupon-mobile";
export const colMobile3 = "prizespinwheel-mobile";
export const prizeMobileRef = collection(db, colMobile);
export const kuponMobileRef = collection(db, colMobile2);
export const winnerMobileRef = collection(db, colMobile3);

// Fortune wheel M88 firestore
export const colM = "luckyspin-m";
export const colM2 = "kupon-m";
export const colM3 = "prizespinwheel-m";
export const prizeMRef = collection(db, colM);
export const kuponMRef = collection(db, colM2);
export const winnerMRef = collection(db, colM3);

// Fortune wheel M882 firestore
export const colM12 = "luckyspin-m2";
export const colM22 = "kupon-m2";
export const colM32 = "prizespinwheel-m2";
export const prizeMRef2 = collection(db, colM12);
export const kuponMRef2 = collection(db, colM22);
export const winnerMRef2 = collection(db, colM32);

// Scratch firestore
export const colScratch = "scratch";
export const colScratch2 = "kuponscratch";
export const colScratch3 = "prize-scratch";
export const prizeScratchRef = collection(db, colScratch);
export const kuponScratchRef = collection(db, colScratch2);
export const winnerScratchRef = collection(db, colScratch3);

// pinball firestore
export const colPinball = "pinball-m88-leaderboard";
export const leaderboardRef = collection(db, colPinball);

// fish firestore
export const colFish = "fishshoot-m88-leaderboard";
export const leaderboardFishRef = collection(db, colFish);

// fish2 firestore
export const colFish2 = "akumaujuara-fishshoot-leaderboard";
export const leaderboardFishRef2 = collection(db, colFish2);

// akumaujuara-users firestore
export const colUser = "akumaujuara-users";
export const akumaujuaraUserRef = collection(db, colUser);
