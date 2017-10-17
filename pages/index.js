import React from "react";
import Layout from "../components/MyLayout.js";
import Link from "next/link";
import Cookie from "js-cookie";
import fetch from "isomorphic-unfetch";

class Index extends React.Component {
  render() {
    const { shows } = this.props;

    return (
      <Layout>
        <h1>Batman TV Shows</h1>
        <h2>Token: {Cookie.get("token", { secure: false })} </h2>
        <ul>
          {shows.map(({ show }) => (
            <li key={show.id}>
              <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
                <a>{show.name}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Layout>
    );
  }
}

Index.getInitialProps = async function() {
  const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
  const data = await res.json();

  console.log(`Show data fetched. Count: ${data.length}`);

  return {
    shows: data
  };
};

export default Index;
