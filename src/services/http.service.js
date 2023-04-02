import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

// axios.defaults.baseURL = configFile.apiEndpoint;

http.interceptors.request.use(
    function (config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            // config.url = "profession/12332";
            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            // config.url = config.url.slice(0, -1) + ".json";
            console.log(config.url);
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : [];
}

http.interceptors.response.use(
    (res) => {
        if (configFile.isFireBase) {
            console.log("1", res.data);
            // Object.keys(res.data)
            transformData(res.data);
            res.data = { content: transformData(res.data) };
            console.log(res.data);
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
            console.log(error);
            toast.error("Something wrong . Try  it later.");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete
};

export default httpService;
