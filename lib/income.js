export const incomeGain = income => {
  return income.value - (income.bought || 0) - (income.fee || 0) - (income.ir || 0) + (income.gross || 0)
}

export const hasGrossIROrFee = income => {
  return income.fee || income.ir || income.gross
}