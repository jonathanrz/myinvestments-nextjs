import React from 'react'
import PropTypes from 'prop-types'
import withRedux from 'next-redux-wrapper'
import { bindActionCreators } from 'redux'

import initStore from '../state'
import { setInvestments } from '../state/data/actions'
import Filter from '../components/Filter'
import Layout from '../components/MyLayout'
import TotalByType from '../components/dashboard/TotalByType'
import IncomesByMonth from '../components/dashboard/IncomesByMonth'
import TotalBought from '../components/dashboard/TotalBought'
import { getInvestmentsWithIncomes, getToken } from '../components/Api'

import { incomeGain } from '../lib/income'

const compareHolder = (left, right) => left.holder.localeCompare(right.holder)

class Index extends React.Component {
  static propTypes = {
    investments: PropTypes.array.isRequired,
    investmentsByType: PropTypes.object.isRequired,
    investmentTypes: PropTypes.object.isRequired,
    investmentHolders: PropTypes.object.isRequired,
    setInvestments: PropTypes.func.isRequired
  }

  constructor (ctx, props) {
    super(ctx, props)

    this.state = { investmentsByType: null, investmentTypes: null, investmentHolders: null }
  }

  componentWillMount () {
    getInvestmentsWithIncomes(getToken()).then(response => this.props.setInvestments(response.data.sort(compareHolder)))
  }

  componentWillReceiveProps (nextProps) {
    this.prepareData(nextProps)
  }

  prepareData = props => {
    const { investments } = props

    var investmentsByType = {}
    var investmentTypes = {}
    var investmentHolders = {}

    for (let i = 0; i < investments.length; i++) {
      const investment = investments[i]
      if (investment.incomes.length > 0) {
        investment.currentValue = investment.incomes[0].value
      } else {
        investment.currentValue = 0
      }

      investmentTypes[investment.type] = null
      investmentHolders[investment.holder] = null

      var type = investment.type
      if (!investmentsByType[type]) {
        investmentsByType[type] = {}
        investmentsByType[type].investments = []
        investmentsByType[type].value = 0
      }
      investmentsByType[type].investments.push(investment)
      investmentsByType[type].value += investment.currentValue

      var lastIncomeValue = 0
      investment.incomes = investment.incomes
        .reverse()
        .map(item => {
          if (lastIncomeValue === 0) {
            item.gain = incomeGain(item)
            item.gainInPerc = item.gain / item.value
          } else {
            item.gain = incomeGain(item) - lastIncomeValue
            item.gainInPerc = item.gain / lastIncomeValue
          }
          lastIncomeValue = item.value
          return item
        })
        .reverse()
    }

    const totalValue = investments.reduce((acum, investment) => acum + investment.currentValue, 0)

    investmentsByType['Total'] = {}
    investmentsByType['Total'].investments = investments
    investmentsByType['Total'].value = totalValue

    this.setState({ investmentsByType, investmentTypes, investmentHolders })
  }

  render () {
    const { investments } = this.props
    const { investmentsByType, investmentTypes, investmentHolders } = this.state

    return (
      <Layout title="Dashboard">
        {investmentTypes &&
          investmentHolders && (
            <div>
              <Filter investmentTypes={investmentTypes} investmentHolders={investmentHolders} />
              <div style={{ marginTop: 40 }} />
            </div>
          )}
        {investmentsByType && (
          <div>
            <TotalByType investmentsByType={investmentsByType} />
            <div style={{ marginTop: 40 }} />
          </div>
        )}
        {investmentsByType && (
          <div>
            <IncomesByMonth investments={investments} />
            <div style={{ marginTop: 40 }} />
            <TotalBought investments={investments} />
          </div>
        )}
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  investmentHolder: state.filter.investmentHolder,
  investmentType: state.filter.investmentType,
  year: state.filter.year,
  showValues: state.filter.showValues,
  investments: state.data.investments
})

const mapDispatchToProps = dispatch => ({
  setInvestments: bindActionCreators(setInvestments, dispatch)
})

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
