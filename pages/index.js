import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Router from 'next/router'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHeaderColumn,
  TableRowColumn
} from 'material-ui/Table'
import Layout from '../components/MyLayout.js'
import { getInvestments, getToken } from '../components/Api'

class Index extends React.Component {
  static async getInitialProps ({ req }) {
    const res = await getInvestments(getToken(req))
    const data = res.data

    return {
      investments: data
    }
  }

  constructor (props) {
    super(props)

    this.onInvestment = this.onInvestment.bind(this)
  }

  onInvestment (e) {
    e.preventDefault()
    Router.push(e.href)
  }

  render () {
    const { investments } = this.props

    return (
      <Layout title="Investimentos">
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
                <TableRowColumn>
                  <Link
                    onClick={this.onInvestment}
                    href={`/investment?id=${item._id}`}
                  >
                    <a>{item.name}</a>
                  </Link>
                </TableRowColumn>
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
