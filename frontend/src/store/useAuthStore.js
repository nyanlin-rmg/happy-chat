import { create } from "zustand";
import { catchError } from "../lib/catchErrors";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const useAuthStore = create((set, get) => (
    {
        authUser: null,
        isCheckingAuth: true,
        isLoading: false,
        isAuthenticate: false,
        socket: [],
        activeUserIds: [],

        checkAuth: async () => {
            try {
                const res = await axiosInstance.get('/auth/check');
                set({authUser: res.data.data.user, isAuthenticate: true});
                get().connectSocket();
            } catch (error) {
                catchError(error, 'checkAuth', 'useAuthStore');
            } finally {
                set({isCheckingAuth: false});
            }
        },

        updateProfile: async (image) => {
            const formData = new FormData();
            formData.append("profilePic", image);
            try {
                const res = await axiosInstance.put("/auth/update-profile", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                set({ authUser: res.data.data.user });
                toast.success("Profile updated successfully");
            } catch (error) {
                console.log("Error in update profile: ", error);
                toast.error("Something went wrong, Please try again later");
            }
        },

        signup: async (userInfo) => {
            set({isLoading: true})
            try {
                const res = await axiosInstance.post('/auth/signup', userInfo);
                if(res.data) {
                    toast.success('Your account has been registered successfully! Please login to start using HappyChat :)');
                    return res.data;
                }
            } catch (error) {
                console.log("Error in useAuthStore: Signup function: ", error);
                toast.error(error.response.data.errors[0].msg);
                return false;
            } finally {
                set({isLoading: false});
            }
        },

        login: async (email, password) => {
            set({isLoading: true});
            try {
                const res = await axiosInstance.post('/auth/signin', {email, password});
                console.log('response in login: ', res);
                set({authUser: res.data.data.user, isAuthenticate: true});
                get().connectSocket();
                toast.success("Logged in successfully");
                return true;
            } catch (error) {
                console.log("Error in login function: useAuthStore: ", error);
                toast.error(error.response.data.error.message);
                return false;
            } finally {
                set({isLoading: false})
            }
        },
        
        logout: async () => {
            set({isLoading: true});
            try {
                await axiosInstance.get('/auth/signout');
                set({authUser: null, isAuthenticate: false});
                get().disconnectSocket();
                toast.success('Logout successfully');
            } catch (error) {
                console.log("Logout error:", error);
                toast.error("Error logging out");
            } finally {
                set({isLoading: false});
            }
        },

        connectSocket: () => {
            const authUser = get().authUser;
            if (!authUser) return;

            const socket = io("http://localhost:8000", {
                withCredentials: true
            });

            socket.connect();

            set({socket});

            socket.on("getActiveUsers", (activeUserIds) => {
                set({activeUserIds});
            })
        },

        disconnectSocket: () => {
            if (get().socket?.connected) get().socket.disconnect();
        },

        isUserActive: (userId) => {
            return get().activeUserIds.includes(userId);
        }
    }
));

