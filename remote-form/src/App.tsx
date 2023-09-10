import React, { ChangeEvent, useState } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import axios from "axios";

const App = () => {
  const [file, setFile] = useState<File>();
  const [responseText, setResponseText] = useState("Ответ сервера");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.length) {
      setFile(files[0]);
    }
  };

  const handleSign = async () => {
    const formData = new FormData();

    if (file) {
      formData.append("file11", file);
      const response = await axios.post(
        "http://localhost:8888/ncaTest",
        formData
      );
      console.log(response);
      setResponseText(response.data);
    }
  };

  const handleChangeTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (responseText) {
      setResponseText(responseText);
    }
  };

  return (
    <div className="bg-blue-100 max-w-3xl max-h-96 flex flex-col m-auto rounded-2xl p-5">
      <div className="flex justify-between">
        <div>
          <label className="cursor-pointer" htmlFor="inpFile">
            {file ? file.name : "Выберите файл"}
          </label>
          <input
            className="hidden"
            type="file"
            name="inpFile"
            onChange={(e) => handleFileChange(e)}
            id="inpFile"
          />
        </div>

        <div>
          <textarea
            onChange={(e) => handleChangeTextArea(e)}
            className="resize-none"
            value={responseText}
          />
        </div>
      </div>
      <button
        className="bg-white py-2 px-3 rounded-lg"
        disabled={!file ? true : false}
        onClick={() => handleSign()}
      >
        Подписать
      </button>
    </div>
  );
};

// ReactDOM.render(<App />, document.getElementById("app"));

export default App;
