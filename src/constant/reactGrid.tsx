import * as React from "react";
import { ReactGrid, Column, Row } from "@silevis/reactgrid";
import axios from "axios";
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
  const [people] = React.useState<Person[]>(getPeople());

  const rows = getRows(people);
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
