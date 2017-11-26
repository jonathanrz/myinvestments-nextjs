import React from 'react'
import PropTypes from 'prop-types'
import withRedux from 'next-redux-wrapper'

import initStore from '../state'
import Filter from '../components/Filter'
import Layout from '../components/MyLayout'
import TotalByType from '../components/dashboard/TotalByType'
import IncomesByMonth from '../components/dashboard/IncomesByMonth'
import TotalBought from '../components/dashboard/TotalBought'
import { getInvestmentsWithIncomes, getToken } from '../components/Api'

import { incomeGain } from '../lib/income'

class Index extends React.Component {
  static async getInitialProps ({ req }) {
    const res = await getInvestmentsWithIncomes(getToken(req))
    const investments = res.data.sort((left, right) => left.holder.localeCompare(right.holder))
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

    return {
      investments: investments,
      investmentsByType: investmentsByType,
      investmentTypes: investmentTypes,
      investmentHolders: investmentHolders
    }
  }

  static propTypes = {
    investments: PropTypes.array.isRequired,
    investmentsByType: PropTypes.object.isRequired,
    investmentTypes: PropTypes.object.isRequired,
    investmentHolders: PropTypes.object.isRequired
  }

  componentWillReceiveProps (nextProps) {}

  render () {
    const { investmentsByType, investments, investmentTypes, investmentHolders } = this.props

    return (
      <Layout title="Dashboard">
        <Filter investmentTypes={investmentTypes} investmentHolders={investmentHolders} />
        <TotalByType investmentsByType={investmentsByType} />
        <div style={{ marginTop: 40 }} />
        <IncomesByMonth investments={investments} />
        <div style={{ marginTop: 40 }} />
        <TotalBought investments={investments} />
      </Layout>
    )
  }
}

const mapStateToProps = state => ({
  investmentHolder: state.filter.investmentHolder,
  investmentType: state.filter.investmentType,
  year: state.filter.year,
  showValues: state.filter.showValues
})

export default withRedux(initStore, mapStateToProps, null)(Index)
