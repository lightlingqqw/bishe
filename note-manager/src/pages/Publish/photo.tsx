import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import mobxStore from 'src/store';
import { request } from 'src/request';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

const Photo = (props: any) => {
const [, forceUpdate] = useState<number>();
    useEffect(()=>{
        const uuid = uuidv4();
        mobxStore.setUuid(uuid);
        forceUpdate(Math.random());
        return ()=>{
            mobxStore.deleteUuid();
        }
    },[])    

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>{
        console.log(fileList);
        
        const base64 = fileList.map((i)=>i.thumbUrl)
        props.onChange(base64);
        setFileList(newFileList);
    }
        

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    return (
        <>
            <Upload
                action="http://localhost:8080/upload"
                headers={{Authorization: 'Bearer '+localStorage.getItem('token') }}
                data={{uuid:mobxStore.getUuid(),uid:uuidv4()}}
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                onRemove={(file)=>{console.log(file);request(`upload?name=${file.name}`)}}
                beforeUpload={(file)=>{
                    const newFileName = file.uid+'.'+file.name.split('.').pop();  // 这里可以根据需要生成新的文件名
                    
                    // 创建新的 File 对象，替换原始的文件对象
                    const newFile = new File([file], newFileName, { type: file.type });
                    // 返回修改后的文件对象
                    return newFile;
                }}
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    );
};

export default Photo;