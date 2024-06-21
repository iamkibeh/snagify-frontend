import NoDataSvg from '../reusables/NoDataSvg'
import PropTypes from 'prop-types'

const NoDataComponent = ({ header = '', subHeader = '' }) => (
  <div className='text-center p-5'>
    <h3 className='text-lg font-semibold'>{header}</h3>
    <p className='mb-4'>{subHeader}</p>
    <NoDataSvg />
  </div>
)

export default NoDataComponent

NoDataComponent.propTypes = {
  header: PropTypes.string,
  subHeader: PropTypes.string,
}
