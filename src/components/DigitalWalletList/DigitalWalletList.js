import React, { useEffect, useState } from "react";
import "./DigitalWalletList.scss";
import { RxCopy } from "react-icons/rx";
import {
  LoadingOutlined,
  PlusOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
// import {AiOutlineArrowUp} from "react-icons/ai";
// import {AiOutlineArrowDown} from "react-icons/ai";
import { Card, message, Input, Popover } from "antd";
import { v4 as uuid } from "uuid";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { AddDigitalWallet } from "../AddDigitalWallet/AddDigitalWallet";

export const DigitalWalletList = ({ totalDigitalWallets, setTotalDigitalWallets }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  // const [finish, setFinish] = useState(false);
  // console.log(totalWalletsFromLocalStorage)
  // useEffect(() => {
  //   let totalWalletsFromLocalStorage = JSON.parse(localStorage.getItem("storingDigitalWalletsToLocalStorage"));
  //   if (totalWalletsFromLocalStorage === null) {
  //     setTotalDigitalWallets([]);

  //   } else {
  //     setTotalDigitalWallets(totalWalletsFromLocalStorage);
  //   }
  // }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };
  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
    // return false;
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      // setLoading(true);
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const sendToLocalStorage = (values) => {
    let digitalWalletsData = [];
    let digitalWallets = JSON.parse(localStorage.getItem("storingDigitalWalletsToLocalStorage"));
    if (digitalWallets === null) {
      digitalWalletsData = [];
    } else {
      digitalWalletsData = digitalWallets;
    }

    const wallet = {
      logo: imageUrl,
      crypto: values.crypto,
      inUSD: values.inUSD,
      inPercentage: values.inPercentage,
      cryptoRate: values.cryptoRate,
      currency: values.currency,
      cryptoCurrency: values.cryptoCurrency,
      uuid: uuid(),
    };
    digitalWalletsData.push(wallet);
    setTotalDigitalWallets(digitalWalletsData);
    localStorage.setItem(
      "storingDigitalWalletsToLocalStorage",
      JSON.stringify(digitalWalletsData)
    );
    values.logo="";
  };

  return (
    <>
      <div className="digital-wallet-container">
        

        {totalDigitalWallets.map((item) => (
          <Card className="each-digital-wallet">
            <div className="digital-wallet-top-container">
              <div className="each-wallet-logo-name-container">
                <img
                  className="each-wallet-logo"
                  src={item.logo}
                  alt="cryptoImage"
                />
                <p className="each-wallet-name">{item.crypto}</p>
              </div>
              <div className="each-wallet-price-container">
                <p className="each-wallet-price">
                  {item.inUSD} {item.currency}
                </p>
                {item.inPercentage < 0 ? (
                  <div className="each-wallet-pricein-per-red">
                    <ArrowDownOutlined className="each-wallet-icon" />
                    {item.inPercentage}%
                  </div>
                ) : (
                  <div className="each-wallet-pricein-per-green">
                    <ArrowUpOutlined className="each-wallet-icon" />
                    {item.inPercentage}%
                  </div>
                )}
              </div>
            </div>
            <p className="digital-wallet-cryptorate">
              {item.cryptoRate} {item.cryptoCurrency}
            </p>
            <Input
              value={item.uuid}
              addonAfter={
                <CopyToClipboard text={item.uuid} >
                  <Popover trigger="click" content={<p>Copied to clipboard</p>}>
                    <span>
                      <RxCopy />
                    </span>
                  </Popover>
                </CopyToClipboard>
              }
            />
          </Card>
        ))}
        <AddDigitalWallet
          imageUrl={imageUrl}
          beforeUpload={beforeUpload}
          handleOk={handleOk}
          uploadButton={uploadButton}
          isModalOpen={isModalOpen}
          showModal={showModal}
          handleChange={handleChange}
          sendToLocalStorage={sendToLocalStorage}
          handleCancel={handleCancel}
          normFile={normFile}
        />
      </div>
    </>
  );
};
