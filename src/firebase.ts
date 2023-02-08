import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyBdFMZoNwEWNqCOfUezoSB-TewpOBUfX98",
    authDomain: "mgoalindo---app.firebaseapp.com",
    databaseURL: "https://mgoalindo---app-default-rtdb.firebaseio.com",
    projectId: "mgoalindo---app",
    storageBucket: "mgoalindo---app.appspot.com",
    messagingSenderId: "909481590933",
    appId: "1:909481590933:web:a0626d75765bd850a5db9c",
    measurementId: "G-RLCM7JVYFY"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const adminRef = collection(db, 'admin-games')

// Fortune wheel firestore
export const prizeRef = collection(db, 'luckyspin')
export const kuponRef = collection(db, 'kupon')
export const winnerRef = collection(db, 'prizespinwheel')

// pinball firestore
export const leaderboardRef = collection(db, 'pinball-leaderboard')
