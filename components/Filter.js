import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Card, CardMedia } from 'material-ui/Card'
import { Container, Row } from 'react-grid-system'

import { setInvestmentHolder, setInvestmentType, setYear, setShowValues } from '../state/filter/actions'

const selectStyle = { display: 'inline-block', marginLeft: 10 }

class Filter extends React.Component {
  static propTypes = {
    investmentHolder: PropTypes.string.isRequired,
    investmentType: PropTypes.string.isRequired,
    showValues: PropTypes.bool.isRequired,
    year: PropTypes.string.isRequired,
    investmentTypes: PropTypes.object.isRequired,
    investmentHolders: PropTypes.object.isRequired,
    setInvestmentHolder: PropTypes.func.isRequired,
    setInvestmentType: PropTypes.func.isRequired,
    setYear: PropTypes.func.isRequired,
    setShowValues: PropTypes.func.isRequired
  }

  constructor (ctx, props) {
    super(ctx, props)

    this.onHolderSelected = this.onHolderSelected.bind(this)
    this.onTypeSelected = this.onTypeSelected.bind(this)
    this.onYearSelected = this.onYearSelected.bind(this)
    this.onShowValuesToggle = this.onShowValuesToggle.bind(this)
  }

  onHolderSelected (event) {
    this.props.setInvestmentHolder(event.target.value)
  }

  onTypeSelected (event) {
    this.props.setInvestmentType(event.target.value)
  }

  onYearSelected (event) {
    this.props.setYear(Number(event.target.value))
  }

  onShowValuesToggle () {
    this.props.setShowValues(!this.props.showValues)
  }

  render () {
    const { investmentHolder, investmentType, year, showValues, investmentTypes, investmentHolders } = this.props

    return (
      <Card>
        <CardMedia>
          <Container>
            <Row
              style={{
                display: 'flex',
                flexDirection: 'row-reverse',
                marginRight: 30,
                marginBottom: 10
              }}
            >
              <button style={selectStyle} onClick={this.onShowValuesToggle}>
                {showValues ? '%' : 'R$'}{' '}
              </button>
              <select style={selectStyle} value={year} onChange={this.onYearSelected}>
                <option value="2016">{2016}</option>
                <option value="2017">{2017}</option>
                <option value="2018">{2018}</option>
                <option value="2019">{2019}</option>
              </select>
              <select style={selectStyle} value={investmentType} onChange={this.onTypeSelected}>
                <option value="all">Todos os tipos</option>
                {Object.keys(investmentTypes).map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select style={selectStyle} value={investmentHolder} onChange={this.onHolderSelected}>
                <option value="all">Todos os titulares</option>
                {Object.keys(investmentHolders).map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </Row>
          </Container>
        </CardMedia>
      </Card>
    )
  }
}

const mapStateToProps = state => ({
  investmentHolder: state.filter.investmentHolder,
  investmentType: state.filter.investmentType,
  year: state.filter.year,
  showValues: state.filter.showValues
})
const mapDispatchToProps = dispatch => ({
  setInvestmentHolder: bindActionCreators(setInvestmentHolder, dispatch),
  setInvestmentType: bindActionCreators(setInvestmentType, dispatch),
  setYear: bindActionCreators(setYear, dispatch),
  setShowValues: bindActionCreators(setShowValues, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter)
