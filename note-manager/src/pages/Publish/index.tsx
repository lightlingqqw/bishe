import React from "react"
import Photo from "./photo"
import { Button, Form, Input } from "antd"
import TextArea from "antd/es/input/TextArea"
const Publish = () => {
    const onFinish = (value:any)=>{
        console.log(value);
        
    }
    return <div>
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            onFinish={onFinish}
        >
            <Form.Item label="图片" name="img">
                <Photo/>
            </Form.Item>
            <Form.Item label="标题" name="title">
                <Input />
            </Form.Item>

            <Form.Item label="内容" name="content">
                <TextArea rows={4} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    上传
                </Button>
            </Form.Item>
        </Form>
    </div>
}
export default Publish