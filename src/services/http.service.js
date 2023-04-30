import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
// import { httpAuth } from "../hooks/useAuth";
import authService from "./auth.service";
import localStorageService from "./localStorage.service";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

// axios.defaults.baseURL = configFile.apiEndpoint;

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            // config.url = "profession/12332";
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            // config.url = config.url.slice(0, -1) + ".json";
            // console.log(config.url);
            const expiresDate = localStorageService.getTokenExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && expiresDate < Date.now()) {
                // const { data } = await httpAuth.post("token", {
                //     grant_type: "refresh_token",
                //     refresh_token: refreshToken
                // });
                const data = await authService.refresh();
                // console.log(data);
                localStorageService.setTokens({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : data; // было []
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            // console.log("1", res.data);
            // Object.keys(res.data)
            transformData(res.data);
            res.data = { content: transformData(res.data) };
            // console.log(res.data);
        }
        return res;
    },
    function (error) {
        // console.log("interceptor");
        const expeftedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expeftedErrors) {
            // logger.log(error);
            // console.log(error);
            toast.error("Something wrong . Try  it later.");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch
};

export default httpService;
