import {useNcaLayer} from "./hooks/useNcaLayer";
import React, {useState} from "react";

const XmlSign = () => {
    const { signXmlCall, xmlRes } = useNcaLayer();
    const [xml, setXml] = useState("");

    return (
        <div className="bg-blue-100 max-w-3xl max-h-96 flex flex-col m-auto rounded-2xl p-5">
            <h3 className="text-2xl mb-4">Подписать XML</h3>
            <div className="flex justify-between mb-4">
                <div className="w-2/5 overflow-hidden rounded-xl">
          <textarea
              className="w-full h-full resize-none p-3 outline-none"
              id="xmlToSign"
              onChange={(e) => setXml(e.target.value)}
              value={xml}
              placeholder="Введите XML"
              rows={6}
          />
                </div>
                <div className="w-2/5 overflow-hidden rounded-xl">
          <textarea
              className="w-full h-full resize-none p-3 outline-none"
              id="signedXml"
              value={xmlRes}
              placeholder="Подписанный XML"
              rows={6}
              readOnly
          />
                </div>
            </div>

            <input
                className="py-3 rounded-xl"
                value="Подписать XML"
                disabled={!xml}
                onClick={() => signXmlCall(xml)}
                type="button"
            />
        </div>
    );
};

export default XmlSign;
