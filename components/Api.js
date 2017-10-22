import axios from 'axios'
import Cookie from 'js-cookie'
import { parse } from 'cookie'

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
  const token = req
    ? parse(req.headers.cookie).token
    : window.localStorage.getItem('token')
  console.log(`req=${req} token=${token}`)
  return token
}

export const getInvestments = token => {
  server.defaults.headers.common['auth-token'] = token
  return server.get('/investments')
}

export const getInvestment = (token, id) => {
  server.defaults.headers.common['auth-token'] = token
  return server.get(`/investments/${id}`)
}
