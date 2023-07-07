import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import "../App.css";
const qrcodeRegionId = "html5qr-code-full-region";

//creates config object for html5QrcodeScanner
const createConfig = (props) => {
  let config = {};
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRation = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};
const QrReader = (props) => {
  useEffect(() => {
    const config = createConfig(props);
    const verbose = props.verbose === true;

    //success callback is required
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const qrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    qrcodeScanner.render(
      props.qrCodeSuccessCallback,
      props.qrCodeErrorCallback
    );

    return () => {
      qrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);
  return (
    <div
      style={{
        backgroundColor: "#adb5bd",
        color: "#282c34",
        fontSize: "12pt",
        textAlign: "center",
      }}
      className="html5qr-code-full-region"
      id={qrcodeRegionId}
    />
  );
};

export default QrReader;
