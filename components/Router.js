import Router from 'next/router'

export const routeToRoot = () => {
  Router.push('/')
}

export const routeToInvestment = investmentId => {
  Router.push(`/investment?id=${investmentId}`, `/investments/${investmentId}`)
}

export const routeToNewIncome = investmentId => {
  Router.push(
    `/edit_income?investment_id=${investmentId}`,
    `/investments/${investmentId}/incomes`
  )
}

export const routeToEditIncome = (investmentId, incomeId) => {
  Router.push(
    `/edit_income?investment_id=${investmentId}&income_id=${incomeId}`,
    `/investments/${investmentId}/incomes/${incomeId}`
  )
}
