import React from 'react'
import Layout from '../components/MyLayout.js'
import PropTypes from 'prop-types'
import { Cookie as ClientCookie } from 'js-cookie'
import { parse as CookieParser } from 'cookie'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderColumn,
  TableRowColumn
} from 'material-ui/Table'
import { getInvestments } from '../components/Api'

class Index extends React.Component {
  static async getInitialProps ({ req }) {
    const token = req
      ? CookieParser(req.headers.cookie).token
      : ClientCookie.get('token')
    const res = await getInvestments(token)
    const data = res.data

    return {
      investments: data
    }
  }

  render () {
    const { investments } = this.props

    return (
      <Layout>
        <Table height={500} fixedHeader selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Nome</TableHeaderColumn>
              <TableHeaderColumn>Tipo</TableHeaderColumn>
              <TableHeaderColumn>Titular</TableHeaderColumn>
              <TableHeaderColumn>Vencimento</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
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
    )
  }
}

Index.propTypes = {
  investments: PropTypes.element.isRequired
}

export default Index
