import React from 'react'

import TotalByType from './TotalByType'
import IncomesByMonth from './IncomesByMonth'
import TotalBought from './TotalBought'

class Index extends React.Component {
  render () {
    return (
      <div>
        <TotalByType style={{ marginBottom: 40 }} />
        <IncomesByMonth style={{ marginBottom: 40 }} />
        <TotalBought style={{ marginBottom: 40 }} />
      </div>
    )
  }
}

export default Index
