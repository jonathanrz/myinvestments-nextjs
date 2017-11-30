import React from 'react'
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import withRedux from 'next-redux-wrapper'
import moment from 'moment'

import initStore from '../state'
import { setInvestments, setFilteredInvestments } from '../state/data/actions'
import Filter from '../components/Filter'
import Dashboard from '../components/dashboard'
import Layout from '../components/MyLayout'
import Investments from '../components/Investments'
import MonthIncomes from '../components/MonthIncomes'

import { getInvestmentsWithIncomes, getToken } from '../components/Api'

import { incomeGain } from '../lib/income'

const filterInvestment = (investment, type, holder) => {
  if (!type) return true

  if (type === 'all' || investment.type === type) {
    if (!holder || holder === 'all') return true
    return investment.holder === holder
  }

  return false
}

const compareHolder = (left, right) => left.holder.localeCompare(right.holder)

class Index extends React.Component {
  static propTypes = {
    investments: PropTypes.array.isRequired,
    type: PropTypes.object.isRequired,
    holder: PropTypes.object.isRequired,
    year: PropTypes.number.isRequired,
    setInvestments: PropTypes.func.isRequired,
    setFilteredInvestments: PropTypes.func.isRequired
  }

  constructor (ctx, props) {
    super(ctx, props)

    this.state = { currentItem: 'Dashboard' }
  }

  componentWillMount () {
    getInvestmentsWithIncomes(getToken()).then(response => {
      const investments = response.data
      investments.sort(compareHolder)
      this.props.setInvestments(investments)
    })
  }

  componentWillReceiveProps (nextProps) {
    this.prepareData(nextProps)
  }

  prepareData = props => {
    const { investments, type, holder, year } = props

    const filteredInvestments = investments
      .filter(investment => filterInvestment(investment, type, holder))
      .map(investment => ({ ...investment, incomes: investment.incomes.filter(income => moment.utc(income.date).year() === year) }))

    var investmentsByType = {}

    for (let i = 0; i < filteredInvestments.length; i++) {
      const investment = filteredInvestments[i]
      if (investment.incomes.length > 0) {
        investment.currentValue = investment.incomes[0].value
      } else {
        investment.currentValue = 0
      }

      var investmentType = investment.type
      if (!investmentsByType[investmentType]) {
        investmentsByType[investmentType] = {}
        investmentsByType[investmentType].investments = []
        investmentsByType[investmentType].value = 0
      }
      investmentsByType[investmentType].investments.push(investment)
      investmentsByType[investmentType].value += investment.currentValue

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

    const totalValue = filteredInvestments.reduce((acum, investment) => acum + investment.currentValue, 0)

    investmentsByType['Total'] = {}
    investmentsByType['Total'].investments = investments
    investmentsByType['Total'].value = totalValue

    this.props.setFilteredInvestments({ investments: filteredInvestments, byType: investmentsByType })
  }

  onDrawerItemClicked = item => {
    this.setState({ currentItem: item })
  }

  render () {
    const { currentItem } = this.state

    return (
      <Layout title={currentItem} onDrawerItemClicked={this.onDrawerItemClicked}>
        <Filter style={{ marginBottom: 40 }} />
        {currentItem === 'Dashboard' && <Dashboard />}
        {currentItem === 'Investimentos' && <Investments />}
        {currentItem === 'Rendimentos do Mês' && <MonthIncomes />}
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  type: state.filter.type,
  holder: state.filter.holder,
  year: state.filter.year,
  investments: state.data.investments
})

const mapDispatchToProps = dispatch => ({
  setInvestments: bindActionCreators(setInvestments, dispatch),
  setFilteredInvestments: bindActionCreators(setFilteredInvestments, dispatch)
})

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(Index)
