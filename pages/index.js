import React from "react";
import Layout from "../components/MyLayout.js";
import Link from "next/link";
import Cookie from "js-cookie";
import fetch from "isomorphic-unfetch";
import { getInvestments } from "../components/Api";

class Index extends React.Component {
  render() {
    const { investments } = this.props;

    return (
      <Layout>
        <div className="page">
          <div className="table">
            {investments.map(item => (
              <div key={item._id} className="table-row">
                <span style={{ width: "40%" }}>{item.name}</span>
                <span style={{ width: "20%" }}>{item.type}</span>
                <span style={{ width: "20%" }}>{item.holder}</span>
                <span style={{ width: "20%" }}>{item.due_date}</span>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    );
  }
}

Index.getInitialProps = async function({ req }) {
  const res = await getInvestments(req.cookies["token"]);
  const data = res.data;

  return {
    investments: data
  };
};

export default Index;
