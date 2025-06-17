
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createUser = (userData) => {
        setLoading(true);
        return axiosPublic.post('/api/users/create/', userData)
            .then(res => {
                // Automatically log in the user after creation
                return login({email: userData.email, password: userData.password});
            });
    }

    // const login = (credentials) => {
    //     setLoading(true);
    //     return axiosPublic.post('/api/token/', credentials)
    //         .then(res => {
    //             const { access, refresh } = res.data;
    //             localStorage.setItem('access-token', access);
    //             localStorage.setItem('refresh-token', refresh);
    //             // Get user info
    //             return axiosPublic.get(`/api/users/by-email/?email=${user.email}`)
    //                 .then(userRes => {
    //                     setUser(userRes.data);
    //                     return userRes.data;
    //                 });
    //         });
    // }
    const login = (credentials) => {
    setLoading(true);
    return axiosPublic.post('/api/token/', credentials)
        .then(res => {
            const { access, refresh } = res.data;
            localStorage.setItem('access-token', access);
            localStorage.setItem('refresh-token', refresh);

            // Fetch the current user info using token
            return axiosPublic.get('/api/users/me/', {
                headers: {
                    Authorization: `Bearer ${access}`
                }
            }).then(userRes => {
                setUser(userRes.data);
                return userRes.data;
            });
        });
};

    const logout = () => {
        setLoading(true);
        localStorage.removeItem('access-token');
        localStorage.removeItem('refresh-token');
        setUser(null);
        setLoading(false);
    }

    // useEffect(() => {
    //     const token = localStorage.getItem('access-token');
    //     if (token) {
    //         // Verify token and get user info
    //         axiosPublic.get('/api/users/me/')  // You'll need to create this endpoint
    //             .then(res => {
    //                 setUser(res.data);
    //             })
    //             .catch(() => {
    //                 localStorage.removeItem('access-token');
    //                 localStorage.removeItem('refresh-token');
    //             })
    //             .finally(() => setLoading(false));
    //     } else {
    //         setLoading(false);
    //     }
    // }, [axiosPublic]);
            useEffect(() => {
            const token = localStorage.getItem('access-token');
            if (token) {
                // Verify token and get user info
                axiosPublic.get('/api/users/me/', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    setUser(res.data);
                })
                .catch(() => {
                    localStorage.removeItem('access-token');
                    localStorage.removeItem('refresh-token');
                })
                .finally(() => setLoading(false));
            } else {
                setLoading(false);
            }
        }, [axiosPublic]);



    const authInfo = {
        user,
        loading,
        createUser,
        login,
        logout
    };
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
