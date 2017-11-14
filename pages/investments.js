import React from 'react'
import Date from '../components/Date'
import PropTypes from 'prop-types'
import { Card, CardActions, CardMedia } from 'material-ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/FlatButton'
import Layout from '../components/MyLayout.js'
import { routeToInvestment, routeToNewInvestment } from '../components/Router.js'
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
    this.onNewInvestment = this.onNewInvestment.bind(this)
    this.onFilter = this.onFilter.bind(this)
    this.filterInvestment = this.filterInvestment.bind(this)

    this.state = { filter: '' }
  }

  onInvestmentCell (index) {
    const investment = this.props.investments[index]
    routeToInvestment(investment._id)
  }

  onNewInvestment () {
    routeToNewInvestment()
  }

  onFilter (e) {
    this.setState({ filter: e.target.value })
  }

  filterInvestment (investment, filter) {
    if (filter.length === 0) return true

    filter = filter.toLowerCase()

    return investment.name.toLowerCase().includes(filter) || investment.holder.toLowerCase().includes(filter) || investment.type.toLowerCase().includes(filter)
  }

  render () {
    const { investments } = this.props
    const { filter } = this.state

    return (
      <Layout title="Investimentos">
        <Card>
          <CardMedia>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                marginRight: 30,
                marginBottom: 10
              }}
            >
              <input type="text" value={filter} onChange={this.onFilter} />
              Filtro:
            </div>
            <Table fixedHeader selectable={false} onCellClick={this.onInvestmentCell}>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                <TableRow>
                  <TableHeaderColumn>Nome</TableHeaderColumn>
                  <TableHeaderColumn>Tipo</TableHeaderColumn>
                  <TableHeaderColumn>Titular</TableHeaderColumn>
                  <TableHeaderColumn>Vencimento</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover stripedRows>
                {investments.filter(investment => this.filterInvestment(investment, filter)).map(item => (
                  <TableRow key={item._id}>
                    <TableRowColumn>{item.name}</TableRowColumn>
                    <TableRowColumn>{item.type}</TableRowColumn>
                    <TableRowColumn>{item.holder}</TableRowColumn>
                    <TableRowColumn>{item.due_date && <Date date={item.due_date} />}</TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardMedia>
          <Divider style={{ marginTop: 20 }} />
          <CardActions>
            <RaisedButton
              label="Novo Investimento"
              secondary={true}
              onClick={this.onNewInvestment}
              style={{
                margin: 12
              }}
            />
          </CardActions>
        </Card>
      </Layout>
    )
  }
}

Index.propTypes = {
  investments: PropTypes.element.isRequired
}

export default Index
