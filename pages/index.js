import React from 'react'
import PropTypes from 'prop-types'
import Layout from '../components/MyLayout'
import TotalByType from '../components/dashboard/TotalByType'
import IncomesByMonth from '../components/dashboard/IncomesByMonth'
import { getInvestments, getIncomes, getToken } from '../components/Api'
import { incomeGain } from '../lib/income'

class Index extends React.Component {
  static async getInitialProps ({ req }) {
    const res = await getInvestments(getToken(req))
    const investments = res.data
    var investmentsByType = {}

    for (let i = 0; i < investments.length; i++) {
      const investment = investments[i]
      const res = await getIncomes(getToken(req), investment._id)
      investment.incomes = res.data
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

    const totalValue = investments.reduce((acum, investment) => acum + investment.currentValue, 0)

    investmentsByType['Total'] = {}
    investmentsByType['Total'].investments = investments
    investmentsByType['Total'].value = totalValue

    return {
      investments: investments,
      investmentsByType: investmentsByType
    }
  }

  static propTypes = {
    investments: PropTypes.array.isRequired,
    investmentsByType: PropTypes.object.isRequired
  }

  render () {
    const { investmentsByType, investments } = this.props

    return (
      <Layout title="Dashboard">
        <TotalByType investmentsByType={investmentsByType} />
        <div style={{ marginTop: 40 }} />
        <IncomesByMonth investments={investments} />
      </Layout>
    )
  }
}

export default Index
