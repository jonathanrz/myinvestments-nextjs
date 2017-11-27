import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import moment from 'moment'

import { setInvestments, setFilteredInvestments } from '../../state/data/actions'
import Filter from '../Filter'
import Layout from '../MyLayout'
import TotalByType from './TotalByType'
import IncomesByMonth from './IncomesByMonth'
import TotalBought from './TotalBought'
import { getInvestmentsWithIncomes, getToken } from '../../components/Api'

import { incomeGain } from '../../lib/income'

const compareHolder = (left, right) => left.holder.localeCompare(right.holder)

const filterInvestment = (investment, type, holder) => {
  if (!type) return true

  if (type === 'all' || investment.type === type) {
    if (!holder || holder === 'all') return true
    return investment.holder === holder
  }

  return false
}

class Index extends React.Component {
  static propTypes = {
    investments: PropTypes.array.isRequired,
    investmentsByType: PropTypes.object.isRequired,
    investmentType: PropTypes.object.isRequired,
    investmentHolder: PropTypes.object.isRequired,
    year: PropTypes.number.isRequired,
    setInvestments: PropTypes.func.isRequired,
    setFilteredInvestments: PropTypes.func.isRequired
  }

  constructor (ctx, props) {
    super(ctx, props)

    this.state = { investmentTypes: null, investmentHolders: null }
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
    const { investments, investmentType, investmentHolder, year } = props

    var investmentTypes = {}
    var investmentHolders = {}

    investments.forEach(investment => {
      investmentTypes[investment.type] = null
      investmentHolders[investment.holder] = null
    })

    const filteredInvestments = investments
      .filter(investment => filterInvestment(investment, investmentType, investmentHolder))
      .map(investment => ({ ...investment, incomes: investment.incomes.filter(income => moment.utc(income.date).year() === year) }))

    var investmentsByType = {}

    for (let i = 0; i < filteredInvestments.length; i++) {
      const investment = filteredInvestments[i]
      if (investment.incomes.length > 0) {
        investment.currentValue = investment.incomes[0].value
      } else {
        investment.currentValue = 0
      }

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

    const totalValue = filteredInvestments.reduce((acum, investment) => acum + investment.currentValue, 0)

    investmentsByType['Total'] = {}
    investmentsByType['Total'].investments = investments
    investmentsByType['Total'].value = totalValue

    this.setState({ investmentTypes, investmentHolders })
    this.props.setFilteredInvestments({ investments: filteredInvestments, byType: investmentsByType })
  }

  render () {
    const { investmentTypes, investmentHolders } = this.state

    return (
      <Layout title="Dashboard">
        {investmentTypes && investmentHolders && <Filter style={{ marginBottom: 40 }} investmentTypes={investmentTypes} investmentHolders={investmentHolders} />}
        <TotalByType style={{ marginBottom: 40 }} />
        <IncomesByMonth style={{ marginBottom: 40 }} />
        <TotalBought style={{ marginBottom: 40 }} />
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
  setInvestments: bindActionCreators(setInvestments, dispatch),
  setFilteredInvestments: bindActionCreators(setFilteredInvestments, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
