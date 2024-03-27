import React from "react"
import { login } from "src/request/api";
import { Button, Checkbox, Form, type FormProps, Input } from 'antd';
import {useNavigate } from 'react-router-dom'

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
  };
  

const Login = ()=>{
    const navigate = useNavigate();
    const onFinish: FormProps<FieldType>["onFinish"] = (values:any) => {
        toLogin(values);
        console.log('Success:', values);
      };
      
      const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    const toLogin = (params:{username:string;password:string})=>{
        login(params).then((res)=>{
            if(res.result===1){
                localStorage.setItem('token',res.data);
                navigate('/')
            }
        });
    }

    return <div>
        <Form
            initialValues={{ remember: true }}
            onFinish={onFinish}
        >
            <Form.Item<FieldType>
                label="username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item<FieldType>
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
            <Input.Password />
            </Form.Item>


            <Form.Item>
                <Button type="primary" htmlType="submit">
                    登录
                </Button>
                <Button type="primary">
                    注册
                </Button>
            </Form.Item>
        </Form>
    </div>
}
export default Login