import { useEffect, useState } from "react";

export const useNcaLayer = () => {
  const [callback, setCallBack] = useState<string>();
  const [webSocket, setWebSocket] = useState<WebSocket>();
  const [xmlRes, setXmlRes] = useState("");

  useEffect(() => {
    setWebSocket(new WebSocket("wss://127.0.0.1:13579/"));
  }, []);

  useEffect(() => {
    if (!webSocket) return;
    webSocket.onopen = function (event) {
      console.log("Connection opened");
    };

    webSocket.onclose = function (event) {
      if (event.wasClean) {
        console.log("connection has been closed");
      } else {
        console.log("Connection error");
        openDialog();
      }
      console.log("Code: " + event.code + " Reason: " + event.reason);
    };

    webSocket.onmessage = function (event) {
      const result = JSON.parse(event.data);

      if (result != null) {
        const rw = {
          code: result["code"],
          message: result["message"],
          responseObject: result["responseObject"],
          getResult: function () {
            return this.result;
          },
          getMessage: function () {
            return this.message;
          },
          getResponseObject: function () {
            return this.responseObject;
          },
          getCode: function () {
            return this.code;
          },
        };

        if (rw.code === "200") {
          setXmlRes(rw.getResponseObject());
        } else if (rw.code === "500") {
          setXmlRes(`Ошибка ${rw.getMessage()}, попытайтесь снова`);
        }
      }
    };
  }, [webSocket]);

  const signXml = (
    storageName: string,
    keyType: string,
    xmlToSign: string,
    callBack: string
  ) => {
    const signXml = {
      module: "kz.gov.pki.knca.commonUtils",
      method: "signXml",
      args: [storageName, keyType, xmlToSign, "", ""],
    };
    setCallBack(callBack);

    if (webSocket) {
      console.log(webSocket, "web");

      webSocket?.send(JSON.stringify(signXml));
    }
  };

  const signXmlCall = (xmlVal: string) => {
    const selectedStorage = "PKCS12";
    // blockScreen();
    // console.log(xmlVal, selectedStorage);

    if (xmlVal && selectedStorage) {
      signXml(selectedStorage, "SIGNATURE", xmlVal, "signXmlBack");
    }
  };

  return {
    signXmlCall,
    xmlRes,
  };
};

function openDialog() {
  if (
    confirm(
      "Ошибка при подключении к NCALayer. Запустите NCALayer и нажмите ОК"
    ) === true
  ) {
    location.reload();
  }
}
