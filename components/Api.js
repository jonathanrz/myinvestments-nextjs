import axios from 'axios'
import Cookie from 'js-cookie'
import { parse } from 'cookie'
import moment from 'moment'

const server = axios.create({
  baseURL: 'https://jonathanzanella-myinvestments.herokuapp.com/api',
  timeout: 60000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export const setToken = token => {
  Cookie.set('token', token)
  window.localStorage.setItem('token', token)
}

export const getToken = req => {
  return req ? parse(req.headers.cookie).token : window.localStorage.getItem('token')
}

export const getInvestments = token => {
  server.defaults.headers.common['auth-token'] = token
  return server.get('/investments')
}

export const getInvestment = (token, id) => {
  server.defaults.headers.common['auth-token'] = token
  return server.get(`/investments/${id}`)
}

const isToday = date => moment().isSame(date, 'd')

const buildInvestmentBody = investment => {
  var body = {
    name: investment.name,
    type: investment.type,
    holder: investment.holder
  }

  const date = moment(investment.date)
  if (!isToday(date)) {
    body['due_date'] = date.format('DD/MM/YYYY')
  }

  return body
}

export const newInvestment = (token, investment) => {
  server.defaults.headers.common['auth-token'] = token
  return server.post('/investments', buildInvestmentBody(investment))
}

export const saveInvestment = (token, investmentId, investment) => {
  server.defaults.headers.common['auth-token'] = token
  return server.put(`/investments/${investmentId}`, buildInvestmentBody(investment))
}

export const getIncomes = (token, investmentId) => {
  server.defaults.headers.common['auth-token'] = token
  return server.get(`/investments/${investmentId}/income/`)
}

export const getIncome = (token, investmentId, incomeId) => {
  server.defaults.headers.common['auth-token'] = token
  return server.get(`/investments/${investmentId}/income/${incomeId}`)
}

const buildIncomeBody = income => {
  return {
    date: moment(income.date).format('MM/YYYY'),
    quantity: income.quantity,
    value: income.value,
    bought: income.bought
  }
}

export const newIncome = (token, investmentId, income) => {
  server.defaults.headers.common['auth-token'] = token
  return server.post(`/investments/${investmentId}/income/`, buildIncomeBody(income))
}

export const saveIncome = (token, investmentId, incomeId, income) => {
  server.defaults.headers.common['auth-token'] = token
  return server.put(`/investments/${investmentId}/income/${incomeId}`, buildIncomeBody(income))
}
