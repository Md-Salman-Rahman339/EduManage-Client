import { createContext, useEffect, useState } from "react";
 import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import useAxiosPublic from "../hooks/useAxiosPublic";

 
 
 export const AuthContext = createContext(null);
 

 
 const AuthProvider = ({children}) => {
     const [user, setUser] = useState(null);
     const [loading, setLoading] = useState(true);
     const googleProvider=new GoogleAuthProvider();
     const axiosPublic=useAxiosPublic();
 
     const createUser = (email, password) => {
         setLoading(true);
         return createUserWithEmailAndPassword(auth, email, password)
     }
     const googleSignIn=()=>{
        setLoading(true);
        return signInWithPopup(auth,googleProvider);
     }
 
     const signIn = (email, password) => {
         setLoading(true);
         return signInWithEmailAndPassword(auth,email, password);
     }
 
     const logOut = () =>{
         setLoading(true);
         return signOut(auth);
     }
    //   const updateUserProfile = (name,  photoURL) => {
    //     return updateProfile(auth.currentUser, {
    //         displayName: name, photoURL:  photoURL,
    //     });
    // }
                const updateUserProfile = (name, photoURL = "") => {
            setLoading(true);
            const updateData = {
                displayName: name
            };
            
            // Only add photoURL if it's provided
            if (photoURL) {
                updateData.photoURL = photoURL;
            }

            return updateProfile(auth.currentUser, updateData)
                .then(() => {
                setLoading(false);
                })
                .catch(error => {
                setLoading(false);
                throw error;
                });
            }
 
     useEffect( () =>{
         const unsubscribe = onAuthStateChanged(auth, currentUser =>{
             setUser(currentUser);
             if(currentUser){
                const userInfo={email:currentUser.email};
                axiosPublic.post('/jwt',userInfo)
                .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                    }
                })

             }
             else{
                localStorage.removeItem('access-token')
             }
            //  console.log('current user', currentUser);
             setLoading(false);
         });
         return () => {
             return unsubscribe();
         }
     }, [axiosPublic])
 
     const authInfo = {
         user,
         loading,
         createUser,
         signIn,
         googleProvider,
         logOut,updateUserProfile
     }
     
     return (
         <AuthContext.Provider value={authInfo}>
             {children}
         </AuthContext.Provider>
     );
 };
 
 export default AuthProvider;