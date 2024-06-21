import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import NavigateContext from './NavigateContext'

const NavigationProvider = ({ children }) => {
  const navigate = useNavigate()

  return (
    <NavigateContext.Provider value={navigate}>
      {children}
    </NavigateContext.Provider>
  )
}

export default NavigationProvider

NavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
