import MyLayout from 'src/layout'
import Login from 'src/pages/Login'
import Registration from "src/pages/Registration"
import Statistics from 'src/pages/Statistics'
import Publish from 'src/pages/Publish'
import PersonManage from 'src/pages/PersonManage'

export const routeTable = [
    {path:'/',element:<MyLayout/>,children:[
        {path:'/statistics',element:<Statistics/>},
        {path:'/publish',element:<Publish/>},
        {path:'/person',element:<PersonManage/>},
    ]},
    {path:'/login',element:<Login/>},
    {path:'/registration',element:<Registration/>}
]