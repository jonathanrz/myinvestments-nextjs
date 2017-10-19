import React from "react";
import Layout from "../components/MyLayout.js";
import Link from "next/link";
import { Cookie as ClientCookie } from "js-cookie";
import { parse as CookieParser } from "cookie";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderColumn,
  TableRowColumn
} from "material-ui/Table";
import { getInvestments } from "../components/Api";

class Index extends React.Component {
  render() {
    const { investments } = this.props;

    return (
      <Layout>
        <Table height={500} fixedHeader={true} selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Nome</TableHeaderColumn>
              <TableHeaderColumn>Tipo</TableHeaderColumn>
              <TableHeaderColumn>Titular</TableHeaderColumn>
              <TableHeaderColumn>Vencimento</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            showRowHover={true}
            stripedRows={true}
          >
            {investments.map(item => (
              <TableRow key={item._id}>
                <TableRowColumn>{item.name}</TableRowColumn>
                <TableRowColumn>{item.type}</TableRowColumn>
                <TableRowColumn>{item.holder}</TableRowColumn>
                <TableRowColumn>{item.due_date}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Layout>
    );
  }
}

Index.getInitialProps = async function({ req }) {
  const token = req
    ? CookieParser(req.headers.cookie).token
    : ClientCookie.get("token");
  const res = await getInvestments(token);
  const data = res.data;

  return {
    investments: data
  };
};

export default Index;
