import React from "react";
import {routeTable} from './route'
import { useRoutes } from 'react-router-dom'
const MyRouter = ()=>{
    const element = useRoutes(routeTable);
    return <>
    {element}
        {/* <Routes>
            {routeTable.map((i,index)=>{
                if(i.path==='/home'){
                    return <Route path='/' element={i.component} key={index}>
                        {i.children?.map((i)=>{
                            return <Route/>
                        })}
                    </Route>
                    
                }
                return <Route path={i.path} element={i.component} key={index} />
            })}
        </Routes> */}

    </>
}
export default MyRouter
