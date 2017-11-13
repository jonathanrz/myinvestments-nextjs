export const formatMoney = (number, cents) => {
  var decimalSeparator = ','
  var thousandSeparator = '.'
  var currency = 'R$ '
  var signal = number < 0 ? '-' : ''
  var i = String(
    parseInt((number = Math.abs(Number(number) || 0).toFixed(cents)))
  )
  var j = i.length > 3 ? i.length % 3 : 0

  return (
    currency +
    signal +
    (j ? i.substr(0, j) + thousandSeparator : '') +
    i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousandSeparator) +
    (cents
      ? decimalSeparator +
        Math.abs(number - i)
          .toFixed(cents)
          .slice(2)
      : '')
  )
}

export const formatPercent = number => {
  return (number * 100).toFixed(4) + '%'
}
