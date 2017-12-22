import { connect } from 'react-redux'
import UportConnect from 'modules/auth/components/uport-connect/uport-connect'

import loginWithUport from 'modules/auth/actions/login-with-uport'

const mapStateToProps = (state) => {
  let size = 450
  if (state.isMobile) {
    size = 250
  } else if (state.isMobileSmall) {
    size = 400
  }

  return {
    qrSize: size
  }
}

const mapDispatchToProps = dispatch => ({
  login: (account, signingFunction) => dispatch(loginWithUport(account, signingFunction))
})

export default connect(mapStateToProps, mapDispatchToProps)(UportConnect)
