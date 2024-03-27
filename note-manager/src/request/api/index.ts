import { request } from "..";

export const login = (params:any)=>{
    return request('login', {
        method: 'POST',
        body: {username:params.username,password:params.password}
      })
}
//用户管理表格获取数据
export const fetchUserInfo = (params:{page:number;page_size:number;inquire?:{[key:string]:any}})=>{
  return request('fetchUserInfo', {
      method: 'POST',
      body: {
        page:params.page,
        page_size:params.page_size,
        inquire:params.inquire
      }
    })
}

