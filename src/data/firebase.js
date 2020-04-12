import firebase from 'firebase/app'
import 'firebase/functions'
import 'firebase/analytics'

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}

firebase.initializeApp(config)

export const analytics = config.measurementId ? firebase.analytics() : null

export const functions = {
  getDailyCoMeetings: firebase.functions().httpsCallable('getDailyCoMeetings'),
}

if (process.env.NODE_ENV === 'development') {
  firebase.functions().useFunctionsEmulator('http://localhost:5001')
}

if (process.env.NODE_ENV === 'production') {
  firebase.performance()
}
