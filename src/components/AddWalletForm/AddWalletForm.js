import React from 'react';
import "./AddWalletForm.scss";
import { Button, Form, Input, InputNumber, Select, Upload } from 'antd';
import {v4 as uuid} from "uuid";



export const AddWalletForm = ({imageUrl,handleChange,beforeUpload,uploadButton,sendToLocalStorage,normFile, handleCancel}) => {

  const { Option } = Select;
  return (
    <>
    <Form key={uuid()} autoComplete="on"  onFinish={(values)=>{
        sendToLocalStorage(values); 
        }}>
        <Form.Item  name="logo" valuePropName="fileList" getValueFromEvent={normFile}>
        <Upload
          rules={[{required:true}]}
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
          defaultValue=""
        >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: '100%',
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
        </Form.Item>
        <Form.Item labelCol={{span:24}} name="crypto" label="Name Of crypto"  rules={[{required:true}]}>
          <Input defaultValue="" type='text'/>
        </Form.Item>
        <div className='cost-currency-container'>
        <Form.Item labelCol={{span:24}} name="inUSD" label="Cost" className='cost' rules={[{required:true,type:"number"}]}>
            <InputNumber className='cost-input'/>
        </Form.Item>
        <Form.Item labelCol={{span:24}} name="currency"  label="Currency" className='currency' rules={[{required:true}]}>
          <Select className='currency-select'>
            <Option value="USD">USD</Option>
            <Option value="IND">IND</Option>
          </Select>
        </Form.Item>
        </div>
        <Form.Item labelCol={{span:24}} name="inPercentage" className='in-percentage' label="In%" rules={[{required:true}]}>
          <InputNumber className='in-percentage' defaultValue="" type='text'/>
        </Form.Item>
        <div className='crypto-rate-currency'>
        <Form.Item labelCol={{span:24}} name="cryptoRate" label="Crypto Rate" className='crypto-rate' rules={[{required:true}]}>
          <InputNumber defaultValue="" className='crypto-rate-number'  type='text'/>
        </Form.Item>
        <Form.Item labelCol={{span:24}} name="cryptoCurrency" label="Crypto Currency" rules={[{required:true}]} className='crypto-currency' >
          <Select>
            <Option value="BTC">BTC</Option>
            <Option value="SOL">SOL</Option>
            <Option value="ETH">ETH</Option>
          </Select>
        </Form.Item>
        </div>
        <div className='wallet-button-container'>
          <Form.Item>
            <Button type="primary" onClick={handleCancel} htmlType="Save">Save</Button>
          </Form.Item>
        </div> 
    </Form>  
   </>
  )
}
