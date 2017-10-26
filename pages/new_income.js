import React from 'react'
import PropTypes from 'prop-types'
import Formsy from 'formsy-react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { FormsyDate, FormsyText } from 'formsy-material-ui/lib'
import Layout from '../components/MyLayout.js'
import { routeToInvestment } from '../components/Router.js'
import { getInvestment, getIncomes, getToken } from '../components/Api'

class Index extends React.Component {
  static async getInitialProps ({ query, req }) {
    const investment = await getInvestment(getToken(req), query.investment_id)
    const incomes = await getIncomes(getToken(req), query.investment_id)

    return {
      investment: investment.data,
      lastIncome: incomes.data[0]
    }
  }

  constructor (props) {
    super(props)
    const { lastIncome } = props
    this.state = {
      canSubmit: false,
      quantity: lastIncome.quantity,
      value: lastIncome.value
    }

    this.enableSubmit = this.enableSubmit.bind(this)
    this.disableSubmit = this.disableSubmit.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleQuantityChange = this.handleQuantityChange.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
  }

  enableSubmit () {
    this.setState({
      canSubmit: true
    })
  }

  disableSubmit () {
    this.setState({
      canSubmit: false
    })
  }

  submitForm (data) {
    alert(JSON.stringify(data, null, 4))
  }

  handleQuantityChange (event) {
    this.setState({ quantity: event.target.value })
  }

  handleValueChange (event) {
    this.setState({ value: event.target.value })
  }

  render () {
    const { investment } = this.props
    const { quantity, value } = this.state

    return (
      <Layout
        title={`Novo Recebimento de ${investment.name}`}
        detail={true}
        onNavigationClose={() => {
          routeToInvestment(investment._id)
        }}
      >
        <Paper
          style={{
            width: 420,
            padding: '20px 60px'
          }}
        >
          <Formsy.Form
            onValid={this.enableSubmit}
            onInvalid={this.disableSubmit}
            onValidSubmit={this.submitForm}
          >
            <FormsyDate name="date" required floatingLabelText="Data" />
            <FormsyText
              name="quantity"
              required
              validations="isNumeric"
              floatingLabelText="Quantidade"
              onChange={this.handleQuantityChange}
              value={quantity}
              style={{ display: 'block' }}
            />
            <FormsyText
              name="value"
              required
              validations="isNumeric"
              floatingLabelText="Valor"
              onChange={this.handleValueChange}
              value={value}
              style={{ display: 'block' }}
            />
            <FormsyText
              name="bought"
              required
              validations="isNumeric"
              floatingLabelText="Comprado"
              style={{ display: 'block' }}
            />
            <RaisedButton
              type="submit"
              label="Enviar"
              disabled={!this.state.canSubmit}
              style={{ display: 'block', margin: '32px 0', width: 256 }}
            />
          </Formsy.Form>
        </Paper>
      </Layout>
    )
  }
}

Index.propTypes = {
  investment: PropTypes.object.isRequired,
  lastIncome: PropTypes.object.isRequired
}

export default Index
