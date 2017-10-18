import Header from "./Header";

const layoutStyle = {
  margin: 20,
  padding: 20,
  border: "1px solid #DDD"
};

const pageStyle = {
  margin: 20
};

const Layout = props => (
  <div style={layoutStyle}>
    <Header />
    <div style={pageStyle}>{props.children}</div>
  </div>
);

export default Layout;
