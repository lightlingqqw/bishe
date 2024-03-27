import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { fetchUserInfo } from 'src/request/api';

type TableRowSelection<T> = TableProps<T>['rowSelection'];

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: '昵称',
    dataIndex: 'nickname',
  },
  {
    title: '账号',
    dataIndex: 'username',
  },
  {
    title: '密码',
    dataIndex: 'password',
  },
  {
    title: '手机号码',
    dataIndex: 'phone',
  },
  {
    title: '地址',
    dataIndex: 'adress',
  },
  {
    title: '创建时间',
    dataIndex: 'create_time',
  },
  {
    title: '状态',
    dataIndex: 'state',
  },
  {
    title: '最后登录时间',
    dataIndex: 'last_logintime',
  },
  {
    title: '邮箱',
    dataIndex: 'email',
  },
  {
    title: '生日',
    dataIndex: 'birthday',
  },
];



// const data: DataType[] = [];
// for (let i = 0; i < 46; i++) {
//   data.push({
//     key: i,
//     name: `Edward King ${i}`,
//     age: 32,
//     address: `London, Park Lane no. ${i}`,
//   });
// }

const PersonManage = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [data, setData] = useState<{ data: []; total: number }>();

  useEffect(() => {
    fetchUserInfo({ page: 1, page_size: 10 }).then(res => {
      setData(res);
    })
  }, [])

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: (changeableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changeableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };
  const onFinish = (value:{[key:string]:any})=>{
    fetchUserInfo({page:1,page_size:10,inquire:value}).then((res)=>{
      setData(res)
    })
  }
  return <div>
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      onFinish={onFinish}
    >
      <Form.Item label="id" name="id">
        <Input />
      </Form.Item>
      <Form.Item label="账号" name="username">
        <Input />
      </Form.Item>

      <Form.Item label="昵称" name="nickname">
        <Input />
      </Form.Item>
      <Form.Item label="邮箱" name="email">
        <Input />

      </Form.Item>
      <Form.Item label="手机号码" name="iphone">
        <Input />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
      </Form.Item>
    </Form>

    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={data?.data}
      pagination={{
        total: data?.total,
        onChange: (page) => {
          fetchUserInfo({ page: page, page_size: 10 }).then(res => {
            setData(res);
          })
        }
      }}
    />;

  </div>
}
export default PersonManage