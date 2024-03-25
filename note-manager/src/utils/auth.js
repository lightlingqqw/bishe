import { request } from "src/request"
export const isLogined  = ()=>{
    request('xxx').then((res)=>{
        if(res.result===1){
            return true;
        }
        return false;
    }).catch(()=>{
        return false;
    })
    return false
}