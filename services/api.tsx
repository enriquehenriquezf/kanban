import {app} from '@/firebase.config';
import { AuthSignUpType } from '@/types';
import {initializeAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, inMemoryPersistence, getAuth, setPersistence, browserSessionPersistence   } from 'firebase/auth';
import {getDatabase, set, ref} from 'firebase/database';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

export const api = (): { 
    signUp: (user: AuthSignUpType) => Promise<{ success: boolean; user?: any; error?: string }> 
  } => 
{
    const auth = initializeAuth(app, {
        persistence: [inMemoryPersistence] 
        // persistence: getReactNativePersistence(ReactNativeAsyncStorage)
    });
    const db = getDatabase(app);

    const signUp = async (user: AuthSignUpType): Promise<{ success: boolean; user?: any; error?: string }>  => {

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
            const userData = userCredential.user;
            console.log(userData);

            await set(ref(db, 'users/' + userData.uid), {
                name: user.name,
                lastName: user.lastName,
                email: user.email
            });

            return { success: true, user: userData };
        } catch (error: any) {
            console.error(error);
            return { 
                success: false, 
                error: error.message || 'Error during sign up' 
            };
        }

    }

    const signIn = async (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(JSON.stringify(error))
        });
    }

    return {signUp}
    
}