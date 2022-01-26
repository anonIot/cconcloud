import "./App.css";
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
// import axios from "axios";

const endpoint = "http://localhost:5000";

const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjFlNjQ5ZmYwYTU5ZDljZDIxZjY5MGUyIiwiZW1haWwiOiJzdXBlci5hZG1pbjNAc2Fpam8tZGVua2kuY28udGgiLCJyb2xlIjoiMSIsImlhdCI6MTY0MjY3MzQ3NywiZXhwIjoxNjQyNjgwNjc3fQ.5gTrheNu3Cn3yXRpxaL6sxPHegyM14t3TnYHBRpREmU";

  localStorage.setItem("WS_SRV",token)

const socket = io(endpoint, { query: { token: localStorage.getItem("WS_SRV") } });

function App() {
  const [response, setResponse] = useState([]);

  const [proInfo, setProInfo] = useState([]);

  const setSocket = () => {
    socket.on("283B96C3015B/L2-803", (data) => {
      // console.log("Message: ", data);

      let productInfo = JSON.parse(data);

      productInfo.map((item) => setResponse(item));

      // console.log(productInfo[0].info);
      setProInfo(productInfo[0].info);

      // setResponse(productInfo);
    });
  };

  // const getData = () => {
  //   axios
  //     .get(endpoint)
  //     .then((res) => {
  //       setResponse(res.data);
  //     })
  //     .catch((err) => {});
  // };

  // const listItems = response.map((item) => <li>{item.device_sn}</li>);

  useEffect(() => {
    setSocket();
    // getData()
  }, []);

  // const acInfo = new Object(response.info);

  //  console.log(acInfo)

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <table style={{ width: "100%", tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th>Device No.</th>
                <th>Unit Id</th>
                <th>Connected</th>
                <th>Info</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{response.device_sn}</td>
                <td>{response.unit_id}</td>
                <td>{response.connection}</td>
                <td style={{ textAlign: "left" }}>
                  <ul>
                    <li>
                      Power {proInfo.onoff === "1" ? "On" : "Off"}{" "}
                      {proInfo.onoff}
                    </li>
                    <li>Temp. {proInfo.rt}</li>
                    <li>Set Temp. {proInfo.st}</li>
            
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </header>
    </div>
  );
}

export default App;
