import * as React from "react";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import axios from "axios";
import { useState, useEffect } from "react";
import "@silevis/reactgrid/styles.css";

interface Person {
  name: string;
  surname: string;
  thirdname: string;
}

// const getPeople = (): Person[] => [
//   { name: "Thomas", surname: "Goldman" },
//   { name: "Susie", surname: "Quattro" },
//   { name: "", surname: "" },
// ];

const getColumns = (): Column[] => [
  { columnId: "name", width: 150 },
  { columnId: "surname", width: 150 },
  { columnId: "thirdname", width: 150 },
];

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "srvrAlias" },
    { type: "header", text: "pendMsgCnt" },
    { type: "header", text: "fabCd" },
  ],
};

const getRows = (people: Person[]): Row[] => [
  headerRow,
  ...people.map<Row>((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.name },
      { type: "text", text: person.surname },
      { type: "text", text: person.thirdname },
    ],
  })),
];

interface Props {}

const ReactGridExample: React.FC<Props> = () => {
  const [people, setPeople] = useState<Person[]>([]);
  interface QueueData {
    emsServer: {
      srvrAlias: string;
      fabCd: string;
    };
    queue: {
      pendMsgCnt: number;
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
        const people = (): Person[] => {
          const numPeople = Math.min(xData.length, yData.length, zData.length);
          const peopleArr = [];
          for (let i = 0; i < numPeople; i++) {
            peopleArr.push({
              name: xData[i],
              surname: yData[i],
              thirdname: zData[i],
            });
          }
          return peopleArr;
        };
        setPeople(people);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 열
  const rows = getRows(people);
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
