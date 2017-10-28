import React from 'react'
import PropTypes from 'prop-types'
import Formsy from 'formsy-react'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { FormsyDate, FormsyText } from 'formsy-material-ui/lib'
import Layout from '../components/MyLayout.js'
import { routeToRoot, routeToInvestment } from '../components/Router.js'
import { getInvestment, getToken, newInvestment, saveInvestment } from '../components/Api'

class Index extends React.Component {
  static propTypes = {
    investment: PropTypes.object
  }

  static async getInitialProps ({ query, req }) {
    if (query.id) {
      const investment = await getInvestment(getToken(req), query.id)

      return {
        investment: investment.data
      }
    } else {
      return {}
    }
  }

  constructor (props) {
    super(props)
    const { investment } = props
    this.state = {
      canSubmit: false,
      date: investment && investment.date ? new Date(new Date(investment.date).getTime() + 3 * 60 * 60 * 1000) : new Date(),
      name: investment ? investment.name : '',
      type: investment ? investment.type : '',
      holder: investment ? investment.holder : ''
    }

    this.title = investment ? `Alterar ${investment.name}` : 'Novo Investimento'

    this.enableSubmit = this.enableSubmit.bind(this)
    this.disableSubmit = this.disableSubmit.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleHolderChange = this.handleHolderChange.bind(this)
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
    const { investment } = this.props
    if (investment) {
      saveInvestment(getToken(), investment._id, data).then(response => {
        routeToInvestment(investment._id)
      })
    } else {
      newInvestment(getToken(), data).then(response => {
        routeToRoot()
      })
    }
  }

  handleDateChange (date) {
    this.setState({ date: date })
  }

  handleNameChange (event) {
    this.setState({ name: event.target.value })
  }

  handleTypeChange (event) {
    this.setState({ type: event.target.value })
  }

  handleHolderChange (event) {
    this.setState({ holder: event.target.value })
  }

  render () {
    const { investment } = this.props
    const { date, name, type, holder } = this.state

    return (
      <Layout
        title={this.title}
        detail={true}
        onNavigationClose={() => {
          if (investment) routeToInvestment(investment._id)
          else routeToRoot()
        }}
      >
        <Paper
          style={{
            width: 420,
            padding: '20px 60px'
          }}
        >
          <Formsy.Form onValid={this.enableSubmit} onInvalid={this.disableSubmit} onValidSubmit={this.submitForm}>
            <FormsyDate name="date" floatingLabelText="Data de Vencimento" onChange={this.handleDateChange} value={date} />
            <FormsyText name="name" required floatingLabelText="Nome" onChange={this.handleNameChange} value={name} style={{ display: 'block' }} />
            <FormsyText name="type" required floatingLabelText="Tipo" onChange={this.handleTypeChange} value={type} style={{ display: 'block' }} />
            <FormsyText name="holder" required floatingLabelText="Detentor" onChange={this.handleHolderChange} value={holder} style={{ display: 'block' }} />
            <RaisedButton type="submit" label="Enviar" secondary={true} disabled={!this.state.canSubmit} style={{ display: 'block', margin: '32px 0', width: 256 }} />
          </Formsy.Form>
        </Paper>
      </Layout>
    )
  }
}

export default Index
