import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router";
import test_drawer from '../test/test_drawer.json'

// Context data allows it to be shared (global) across child components
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {

    // Store the current user
    const [currentUser, setCurrentUser] = useState(null);
    const history = useHistory();

    // Load the current user when app is mounted/starts
    // called once when app starts
    const handleMount = async () => {
        if (process.env.REACT_APP_TEST_MODE === 'false') {
            setCurrentUser(test_drawer)
        } else {
            try {
                const { data } = await axios.get("dj-rest-auth/user/");
                setCurrentUser(data);
            } catch (err) {
                console.log(err);
            }
        }
    };

    // Mount the current user. Pass empty depedancy i.e.only runs once
    useEffect(() => {
        handleMount();
    }, []);

    // This runs before the handleMount
    useMemo(() => {
    axiosReq.interceptors.request.use(
        async (config) => {
        try {
            await axios.post("/dj-rest-auth/token/refresh/");
        } catch (err) {
            setCurrentUser((prevCurrentUser) => {
            if (prevCurrentUser) {
                history.push("/signin");
            }
            return null;
            });
            return config;
        }
        return config;
        },
        (err) => {
        return Promise.reject(err);
        }
    );

    axiosRes.interceptors.response.use(
        // If no error return the response
        (response) => response,
        async (err) => {
        if (err.response?.status === 401) {
            try {
            await axios.post("/dj-rest-auth/token/refresh/");
            } catch (err) {
            setCurrentUser((prevCurrentUser) => {
                if (prevCurrentUser) {
                history.push("/signin");
                }
                return null;
            });
            }
            return axios(err.config);
        }
        return Promise.reject(err);
        }
    );
    }, [history]);

      
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {/* render the children */}
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
