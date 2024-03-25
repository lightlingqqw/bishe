import { request } from "..";

export const login = (params)=>{
    return request('login', {
        method: 'POST',
        body: {username:params.username,password:params.password}
      })
}