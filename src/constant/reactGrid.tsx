import * as React from "react";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import axios from "axios";
import { useState, useEffect } from "react";
import "@silevis/reactgrid/styles.css";

interface JsonData {
  name: string;
  surname: string;
  thirdname: string;
  fourthname: string;
  fifthname: string;
}

// const getJsonData = (): JsonData[] => [
//   { name: "name", surname: "surname", thirdname: "thirdname" },
//   { name: "name", surname: "surname", thirdname: "thirdname" },
//   { name: "name", surname: "surname", thirdname: "thirdname" },
// ];

const getColumns = (): Column[] => [
  { columnId: "emsQueNm", width: 180 },
  { columnId: "collectDate", width: 250 },
  { columnId: "srvrAlias", width: 150 },
  { columnId: "pendMsgCnt", width: 150 },
  { columnId: "fabCd", width: 150 },
];

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "emsQueNm" },
    { type: "header", text: "collectDate" },
    { type: "header", text: "srvrAlias" },
    { type: "header", text: "pendMsgCnt" },
    { type: "header", text: "fabCd" },
  ],
};

const getRows = (jsonData: JsonData[]): Row[] => [
  headerRow,
  ...jsonData.map<Row>((jsonData, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: jsonData.fifthname },
      { type: "text", text: jsonData.fourthname },
      { type: "text", text: jsonData.name },
      { type: "text", text: jsonData.surname },
      { type: "text", text: jsonData.thirdname },
    ],
  })),
];

interface Props {}

const ReactGridExample: React.FC<Props> = () => {
  const [jsonData, setJsonData] = useState<JsonData[]>([]);
  interface QueueData {
    collectDate: string;
    emsServer: {
      srvrAlias: string;
      fabCd: string;
    };
    queue: {
      pendMsgCnt: number;
      emsQueNm: string;
    };
  }
  useEffect(() => {
    axios({
      url: "/api/v1/tibco/ems/get/queue",
      method: "post",
      data: {
        data_name: "",
        ems_server_name: "",
        fab_cd: "D11",
        fab_loc_cd: "이천",
        st_dt: "2023-04-28T01:00:19.248Z",
        en_dt: "2023-05-03T17:32:20.000Z",
        scroll_size: 100,
      },
    })
      .then((response) => {
        console.log(response.data);
        const aData = response.data.data.map(
          (data: QueueData) => data.collectDate
        );
        console.log(aData);
        const bData = response.data.data.map(
          (data: QueueData) => data.queue?.emsQueNm
        );
        console.log(bData);
        const xData = response.data.data.map(
          (data: QueueData) => data.emsServer?.srvrAlias
        );
        console.log(xData);
        const yData = response.data.data.map((data: QueueData) =>
          JSON.stringify(data.queue?.pendMsgCnt)
        );
        const zData = response.data.data.map(
          (data: QueueData) => data.emsServer?.fabCd
        );
        console.log(zData);
        const jsonData = (): JsonData[] => {
          const numJsonData = Math.min(
            xData.length,
            yData.length,
            zData.length
          );
          const jsonDataArr = [];
          for (let i = 0; i < numJsonData; i++) {
            jsonDataArr.push({
              fifthname: bData[i],
              fourthname: aData[i],
              name: xData[i],
              surname: yData[i],
              thirdname: zData[i],
            });
          }
          return jsonDataArr;
        };
        setJsonData(jsonData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 열
  const rows = getRows(jsonData);
  // 행
  const columns = getColumns();

  return (
    <div>
      <div style={{ display: "flex" }}>
        <ReactGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
};

export default ReactGridExample;
