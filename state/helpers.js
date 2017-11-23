const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)

const decapitalize = str => str.charAt(0).toLowerCase() + str.slice(1)

const upperUnderscoreToCamel = str =>
  decapitalize(
    str
      .toLowerCase()
      .split('_')
      .reduce((acc, part) => acc + capitalize(part), '')
  )

export const createActionsAndCreators = (actionArray, namespace) => {
  const result = {}

  actionArray.forEach(action => {
    const type = `${namespace}_${action}`
    result[action] = type
    result[upperUnderscoreToCamel(action)] = data => ({ type, data })
  })

  return result
}
