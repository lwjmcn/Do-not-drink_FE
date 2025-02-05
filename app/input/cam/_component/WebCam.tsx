"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const WebCam = () => {
  const screenRef = useRef<HTMLVideoElement>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState<number>(0);
  const [imgData, setImgData] = useState<string | null>(null);

  const loadDevices = async () => {
    // get all camera devices
    const mediaDevices = await navigator.mediaDevices.enumerateDevices();
    const cameraDevices = [];
    for (const device of mediaDevices) {
      if (device.kind === "videoinput") {
        cameraDevices.push(device);
      }
    }
    setDevices(cameraDevices);
  };

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: devices[selectedDeviceIndex]?.deviceId || undefined,
        },
        audio: false,
      });
      setMediaStream(stream);
    } catch (error) {
      console.log(error);
    }
  }, [devices, selectedDeviceIndex]);

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
  };

  const takeSnapshot = async () => {
    if (screenRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = screenRef.current.videoWidth;
      canvas.height = screenRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(screenRef.current, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL("image/png");
        //   .replace("image/png", "image/octet-stream");
        // window.location.href = data;
        console.log(data);

        // show the image
        setImgData(data);
      }
    }
  };

  useEffect(() => {
    startCamera();
  }, [startCamera]);

  useEffect(() => {
    if (screenRef.current && mediaStream)
      screenRef.current.srcObject = mediaStream;

    return () => stopCamera();
  }, [screenRef, mediaStream]);

  return (
    <div>
      <video ref={screenRef} autoPlay muted />
      <button onClick={loadDevices}>Load Devices</button>
      {devices.map((device, index) => (
        <li key={device.deviceId} onClick={() => setSelectedDeviceIndex(index)}>
          {device.label}
        </li>
      ))}
      <button onClick={takeSnapshot}>Take Snapshot</button>
      <button onClick={startCamera}>Start Camera</button>
      <button onClick={stopCamera}>Stop Camera</button>
      {imgData && (
        <Image
          src={imgData}
          alt="cam"
          width={300}
          height={300}
          onLoad={(e) =>
            document
              .createElement("canvas")
              .getContext("2d")
              ?.drawImage(e.target as HTMLImageElement, 0, 0)
          }
        />
      )}
    </div>
  );
};
export default WebCam;
