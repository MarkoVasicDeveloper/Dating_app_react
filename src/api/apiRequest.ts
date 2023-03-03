import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { baseConfig } from "../config/baseConfig"

interface ApiResponse {
    status: 'ok' | 'error' | 'login'
    data: any
}

export function apiRequest (
    path: string,
    method: 'post' | 'get' | 'delete' | 'put',
    body: any,
    role: "lady" | "gentleman" | "gentlemanPremium" | "gentlemanVip" | "administrator"
) {
    return new Promise <ApiResponse>((resolve) => {
        const requestData = {
            method,
            url: path,
            baseURL: baseConfig.baseUrl,
            data: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                Authorization: getToken(role)
            }
        };

        axios(requestData)
            .then(res => responseHandler(res, resolve))
            .catch(async err => {
                if (err.response.status === 401) {
                    const newToken = await refreshToken(role);
          
                    if (!newToken) {
                      const response: ApiResponse = {
                        status: "login",
                        data: null,
                      };
          
                      return resolve(response);
                    }
          
                    saveToken(role, newToken);
          
                    requestData.headers["Authorization"] = getToken(role);
                    
                    return await repeatRequest(requestData, resolve);
                }
          
                const response: ApiResponse = {
                status: "error",
                data: err,
                };
        
                resolve(response);
            })
        
    })
}

async function responseHandler(
    res: AxiosResponse<any>,
    resolve: (value: ApiResponse) => void
) {
    if (res.status < 200 || res.status >= 300) {
        const response: ApiResponse = {
        status: "error",
        data: res.data,
        };

        return resolve(response);
    }

    const response: ApiResponse = {
        status: "ok",
        data: res.data,
    };

    return resolve(response);
}

async function refreshToken(
    role: "lady" | "gentleman" | "gentlemanPremium" | "gentlemanVip" | "administrator"
  ): Promise<string | null> {
      const token = getRefreshToken(role)
      const path = `/auth/refresh/${token}`;
   
  
    const refreshTokenRequestData: AxiosRequestConfig = {
      method: "get",
      url: path,
      baseURL: baseConfig.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    const rtr: { data: { token: string | undefined } } = await axios(
      refreshTokenRequestData
    );
  
    if (!rtr.data.token) {
      return null;
    }
  
    return rtr.data.token;
}

async function repeatRequest(
    requestData: AxiosRequestConfig,
    resolve: (value: ApiResponse) => void
  ) {
    axios(requestData)
      .then((res) => {
        let response: ApiResponse;
        console.log(res)
        if (res.status === 401) {
          response = {
            status: "login",
            data: null,
          };
        } else {
          response = {
            status: "ok",
            data: res.data,
          };
        }
  
        return resolve(response);
      })
      .catch((err) => {
        const response: ApiResponse = {
          status: "error",
          data: err,
        };
  
        return resolve(response);
    });
}

function getToken(role: "lady" | "gentleman" | "gentlemanPremium" | "gentlemanVip" | "administrator"): string {
    const token = localStorage.getItem("api_token" + role);
    return "Berer " + token;
}

function getRefreshToken(role: "lady" | "gentleman" | "gentlemanPremium" | "gentlemanVip" | "administrator"): string {
    const token = localStorage.getItem("api_refresh_token" + role);
    return token + "";
}

export function saveRefreshToken(role: "lady" | "gentleman" | "gentlemanPremium" | "gentlemanVip" | "administrator", token: string) {
  localStorage.setItem("api_refresh_token" + role, token);
}

export function saveToken(role: "lady" | "gentleman" | "gentlemanPremium" | "gentlemanVip" | "administrator", token: string) {
    localStorage.setItem("api_token" + role, token);
}