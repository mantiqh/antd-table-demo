import { Table } from "antd";
import { useState, useEffect } from "react";

const columns = [
  {
    key: "questions",
    title: "Questions",
    dataIndex: ["qData", "En", "text"],
    render: (value) => {
      return (
        <div
          key={value}
          dangerouslySetInnerHTML={{
            __html: value,
          }}
        ></div> // Another way of doing it: https://github.com/wrakky/react-html-parser
      );
    },
  },
];

function App() {
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  async function getQuestions() {
    try {
      const response = await fetch("<KEY_IN_YOUR_URL_HERE>");
      const data = await response.json();
      setState({ data: data.data, loading: false });
    } catch (error) {
      console.log("ERROR: ", error);
      setState((prevValue) => Object.assign({}, prevValue, { loading: false }));
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <Table
      rowKey={(value) => value._id}
      loading={state.loading}
      dataSource={state.data.data ?? []}
      columns={columns}
    />
  );
}

export default App;
