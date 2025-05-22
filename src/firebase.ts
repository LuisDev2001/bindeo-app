import { initializeApp } from 'firebase/app'

import { getFirestore } from 'firebase/firestore'

export const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCwVZFoE4ZQDxGO_yCNzeTeg9XGGGJ9m7g',
  authDomain: 'bindeo-app.firebaseapp.com',
  projectId: 'bindeo-app',
  storageBucket: 'bindeo-app.firebasestorage.app',
  messagingSenderId: '96861018819',
  appId: '1:96861018819:web:4339a1a02816738b52a076',
})

export const db = getFirestore(firebaseApp)
