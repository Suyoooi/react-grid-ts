export const API_URL = "http://192.168.10.9:38080";

export const DASHBOARD_API = "/api/v1/tibco/dash/get/top";

export const EMS_SERVER_API = "/api/v1/tibco/ems/get/queue";

// const ReactGridExample: React.FC<Props> = () => {
//   const [people, setPeople] = useState<Person[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.post("/api/v1/tibco/ems/get/queue", {
//           // request data
//         });
//         setPeople(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchData();
//   }, []);

//   const rows = [
//     headerRow,
//     ...people.map<Row>((person, idx) => ({
//       rowId: idx,
//       cells: [
//         { type: "text", text: person.name },
//         { type: "text", text: person.surname },
//       ],
//     })),
//   ];
