import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Connect } from 'uport-connect'
import QRCode from 'qrcode.react'

import { AppleAppStore, GooglePlayStore } from 'modules/common/components/icons/icons'

import uPortSigningNotifier from 'modules/auth/helpers/uport-signing-notifier'

import Styles from 'modules/auth/components/uport-connect/uport-connect.styles'

export default class UportConnect extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired
  }

  constructor() {
    super()

    this.uPort = new Connect(
      'AUGUR -- DEV',
      {
        clientId: '2ofGiHuZhhpDMAQeDxjoDhEsUQd1MayECgd'
      },
      uPortSigningNotifier
    )

    this.state = {
      uri: ''
    }

    this.uPortURIHandler = this.uPortURIHandler.bind(this)
  }

  componentWillMount() {
    this.uPort.requestCredentials({
      notifcations: true
    }, this.uPortURIHandler).then((account) => {
      const signingMethod = this.uPort.getWeb3().eth.sendTransaction
      this.props.login(account, signingMethod)
    })
  }

  componentDidMount() {
  }

  uPortURIHandler(uri) {
    this.setState({ uri })
  }

  render() {
    const s = this.state

    return (
      <section
        ref={(uPortCreate) => { this.uPortCreate = uPortCreate }}
        className={Styles.Uport__connect}
      >
        <div className={Styles['Uport__connect-wrapper']}>
          <h3>Connect a uPort Account</h3>
          <QRCode
            value={s.uri}
            size={s.qrSize}
          />
          <h4>Need a uPort Account?</h4>
          <div className={Styles.Uport__apps}>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://play.google.com/store/apps/details?id=com.uportMobile"
            >
              <GooglePlayStore />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://itunes.apple.com/us/app/uport-id/id1123434510"
            >
              <AppleAppStore />
            </a>
          </div>
        </div>
      </section>
    )
  }
}
