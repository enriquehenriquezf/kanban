import {app,getAuth} from '@/firebase.config';
import { AuthSignUpType, AuthType } from '@/types';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'firebase/auth';
import {getDatabase, set, ref, onValue, get , child, update, push } from 'firebase/database';

export const api = (): { 
    signUp: (user: AuthSignUpType) => Promise<{ success: boolean; user?: any; error?: string }>,
    signIn: (user: AuthType) => Promise<{ success: boolean; user?: any; error?: string }>,
    getBoard: (user_id: string) => Promise<{ success: boolean; board?: any; error?: string }>
  } => 
{
    const auth = getAuth(app);
    const db = getDatabase(app);

    const signUp = async (user: AuthSignUpType): Promise<{ success: boolean; user?: any; error?: string }>  => {

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
            const userData = userCredential.user;
            console.log(userData);

            await set(ref(db, 'users/' + userData.uid), {
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                board: {
                    name: 'Mi Tablero',
                    columns: [
                        {
                            id: "1",
                            name: 'Por hacer',
                            tasks: [
                            ]
                        },
                        {
                            id: "2",
                            name: 'En progreso',
                            tasks: [
                            ]
                        },
                        {
                            id: "3",
                            name: 'Hecho',
                            tasks: [
                            ]
                        },
                    ],
                }
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

    const signIn = async (user: AuthType): Promise<{ success: boolean; user?: any; error?: string }>  => {
        try{
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
            return { success: true, user: userCredential.user };
        }catch(error: any) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(JSON.stringify(error));
            return { 
                success: false, 
                error: errorMessage || 'Error during sign in' 
            };
        }
    }

    const getBoard = async (user_id: string) : Promise<{ success: boolean; board?: any; error?: string }> => {
        const dbRef = ref(db);
        const res = get(child(dbRef, 'users/' + user_id + '/board')).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                return { success: true, board: data };
            } else {
                console.log("No data available");
                return { success: false, board: {} };
            }
          }).catch((error) => {
            console.error(error);
            return { 
                success: false, 
                error: error.message || 'Error during sign in' 
            };
          });
        return res
    }

    const upsertTask = async (user_id: string, board: any, task: any) => {
        if(!task.id){
            const newTaskKey = push(child(ref(db), 'users/' + user_id + '/board/columns/' + task.column + '/tasks')).key;

            const updates: { [key: string]: any } = {};
            updates['/tasks/' + newTaskKey] = task;
            update(ref(db), updates);
        }
        else{
            await set(ref(db, 'users/' + user_id + '/board/columns/' + task.column + '/tasks'), {
                board: {
                    name: 'Mi Tablero',
                    columns: [
                        {
                            id: "1",
                            name: 'Por hacer',
                            tasks: [
                            ]
                        },
                        {
                            id: "2",
                            name: 'En progreso',
                            tasks: [
                            ]
                        },
                        {
                            id: "3",
                            name: 'Hecho',
                            tasks: [
                            ]
                        },
                    ],
                }
            });
        }
        
        return { success: true, message: "Updated" };
    }
    
    const deleteTask = async (user_id: string, board: any) => {
        
    }

    return {signUp, signIn, getBoard}
    
}