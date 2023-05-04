import * as React from "react";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import axios from "axios";
import { useState, useEffect } from "react";
import "@silevis/reactgrid/styles.css";

interface Person {
  name: string;
  surname: string;
}

const getPeople = (): Person[] => [
  { name: "Thomas", surname: "Goldman" },
  { name: "Susie", surname: "Quattro" },
  { name: "", surname: "" },
];

const getColumns = (): Column[] => [
  { columnId: "name", width: 150 },
  { columnId: "surname", width: 150 },
];

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "Name" },
    { type: "header", text: "Surname" },
  ],
};

const getRows = (people: Person[]): Row[] => [
  headerRow,
  ...people.map<Row>((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.name },
      { type: "text", text: person.surname },
    ],
  })),
];

interface Props {}

const ReactGridExample: React.FC<Props> = () => {
  // const [people] = React.useState<Person[]>(getPeople());
  const [people, setPeople] = useState<Person[]>([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.post("/api/v1/tibco/ems/get/queue", {
  //         // request data
  //       });
  //       setPeople(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  interface QueueData {
    emsServer: {
      srvrAlias: string;
      fabCd: "string";
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
        const xDataJSON = JSON.stringify(xData);
        console.log(xDataJSON);
        const yData = response.data.data.map(
          (data: QueueData) => data.queue?.pendMsgCnt
        );
        const yDataJSON = JSON.stringify(yData);
        console.log(yDataJSON);
        const ZData = response.data.data.map(
          (data: QueueData) => data.emsServer?.fabCd
        );
        const ZDataJSON = JSON.stringify(ZData);
        console.log(ZDataJSON);
        const people = (): Person[] => [
          { name: xDataJSON[2], surname: yDataJSON[1] },
          { name: xDataJSON[4], surname: yDataJSON[2] },
          { name: xDataJSON[3], surname: yDataJSON[3] },
        ];
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
