import { Modal } from 'antd';
import "./AddDigitalWallet.scss";
import React from 'react';
import { AddWalletForm } from '../AddWalletForm/AddWalletForm';
import {AiOutlinePlus} from "react-icons/ai";


export const AddDigitalWallet = ({imageUrl,handleChange,beforeUpload,uploadButton,sendToLocalStorage,normFile, handleCancel,handleOk,showModal,isModalOpen}) => {
  return (
    <div className='add-wallet-card'>
      <div className='wallet-add-container'>
        <AiOutlinePlus className='wallet-add-icon' onClick={showModal}/>
      </div>
      <p className='digital-wallet-add-heading'>Add Wallet</p>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
        <AddWalletForm  imageUrl={imageUrl} handleChange={handleChange} beforeUpload={beforeUpload} uploadButton={uploadButton} sendToLocalStorage={sendToLocalStorage} handleCancel={handleCancel} normFile={normFile}/>
      </Modal>
    </div>
  )
}
