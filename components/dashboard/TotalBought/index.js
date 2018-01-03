import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Card, CardMedia, CardHeader } from 'material-ui/Card'
import { Container, Row, Col } from 'react-grid-system'
import InvestmentsTable from './investmentsTable'
import { getTotalBought } from '../../../state/data/selector'

class TotalBought extends React.Component {
  render () {
    const { style, totalBoughtData } = this.props
    const { data, totalBought, totalGain, maxMonths } = totalBoughtData

    return (
      <Card containerStyle={style}>
        <CardHeader title="Total geral" />
        <CardMedia>
          <Container>
            <Row style={{ marginBottom: 30 }}>
              <Col>
                <InvestmentsTable data={data} totalBought={totalBought} totalGain={totalGain} maxMonths={maxMonths} />
              </Col>
            </Row>
          </Container>
        </CardMedia>
      </Card>
    )
  }
}

TotalBought.defaultProps = {
  style: {}
}

TotalBought.propTypes = {
  totalBoughtData: PropTypes.object.isRequired,
  style: PropTypes.object
}

const mapStateToProps = state => ({
  totalBoughtData: getTotalBought(state)
})

export default connect(mapStateToProps, null)(TotalBought)
export { TotalBought }
