import React from 'react'
import Date from '../components/Date'
import PropTypes from 'prop-types'
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

    this.onInvestmentCell = this.onInvestmentCell.bind(this)
  }

  onInvestmentCell (index) {
    const investment = this.props.investments[index]
    Router.push(`/investment?id=${investment._id}`)
  }

  render () {
    const { investments } = this.props

    return (
      <Layout title="Investimentos">
        <Table
          height={500}
          fixedHeader
          selectable={false}
          bodyStyle={{ 'overflow-y': 'hidden' }}
          onCellClick={this.onInvestmentCell}
        >
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
                <TableRowColumn>
                  <Date date={item.due_date} />
                </TableRowColumn>
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
