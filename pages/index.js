import React from "react";
import Layout from "../components/MyLayout.js";
import Link from "next/link";
import Cookie from "js-cookie";
import fetch from "isomorphic-unfetch";
import { getInvestments } from "../components/Api";

const tableStyle = {
  margin: "20 0"
};

const tableRowStyle = {
  display: "flex",
  "line-height": 24,
  "white-space": "nowrap",
  margin: "10 0",
  padding: 10,
  background: "#ffffff",
  border: "1 solid #e3e3e3"
};

class Index extends React.Component {
  render() {
    const { investments } = this.props;

    return (
      <Layout>
        <div style={tableStyle}>
          {investments.map(item => (
            <div key={item._id} style={tableRowStyle}>
              <span style={{ width: "40%" }}>{item.name}</span>
              <span style={{ width: "20%" }}>{item.type}</span>
              <span style={{ width: "20%" }}>{item.holder}</span>
              <span style={{ width: "20%" }}>{item.due_date}</span>
            </div>
          ))}
        </div>
      </Layout>
    );
  }
}

Index.getInitialProps = async function({ isServer, req }) {
  console.log("running on=" + isServer);
  console.log("cookies=" + req.cookies);
  console.log("cookies2=" + req.headers.cookies);
  const token = isServer ? req.cookies["token"] : Cookie.get("token");
  console.log("token=" + token);
  const res = await getInvestments(token);
  const data = res.data;

  return {
    investments: data
  };
};

export default Index;
