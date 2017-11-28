import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { Card, CardActions, CardMedia } from 'material-ui/Card'
import { Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn } from 'material-ui/Table'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/FlatButton'

import Date from '../components/Date'
import { routeToInvestment, routeToNewInvestment } from '../components/Router.js'

class Investments extends React.Component {
  static propTypes = {
    investments: PropTypes.array.isRequired
  }

  onInvestmentCell = index => {
    const investment = this.props.investments[index]
    routeToInvestment(investment._id)
  }

  onNewInvestment = () => {
    routeToNewInvestment()
  }

  render () {
    const { investments } = this.props

    return (
      <Card>
        <CardMedia>
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
              {investments &&
                investments.map(item => (
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
    )
  }
}

const mapStateToProps = state => ({
  investments: state.data.filteredInvestments.investments
})

export default connect(mapStateToProps, null)(Investments)
