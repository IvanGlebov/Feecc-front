import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import React from 'react'
import styles from './Login.module.css'
import PropTypes from "prop-types";
import LoginForm from "./LoginForm/LoginForm";

import { withSnackbar } from "notistack";
import { withContext } from "@reducers/context/withContext";

import { withTheme } from "@mui/styles";

import robonomicsLogo from '../../static/imageCenter.png'
import multiAgentLogo from '../../static/imageLeft_black.png'
import endoStarsLogo from '../../static/imageRight.png'

import { doLogin, authorize } from "@reducers/stagesActions";

export default withSnackbar(
  withContext(
  withTheme( 
  withTranslation()(connect(
  (store) => ({
    employee_logged_in: store.stages.get("employee_logged_in"),
  }),
  (dispatch) => ({
    login: (
      username,
      password,
      successChecker,
      errorChecker
    ) =>
    doLogin (
        dispatch,
        username,
        password,
        successChecker,
        errorChecker
      ),
    authorizeEmployee: () => authorize(dispatch)
  })
)(class Login extends React.Component {


  static propTypes = {
    login: PropTypes.func.isRequired,
    authorizeEmployee: PropTypes.func.isRequired,

    state: PropTypes.string
  };

  constructor() {
    super();
  }


  closeButtonAction = (key) => (
    <div>
      <button
        onClick={() => this.props.closeSnackbar(key)}
      >
        Закрыть
      </button>
    </div>
  )

  onUnsuccessfulLogin() {
    this.props.enqueueSnackbar(
      `Не удалось войти. Проверьте введенные данные`,
      { variant: "error", action: this.CloseActionButton,}
    );
  }

  onSuccessfulLogin() {
    this.props.authorizeEmployee();
    this.props.enqueueSnackbar(
      `Вы авторизованы!`,
      { variant: "success", action: this.CloseActionButton, }
    );
    window.sessionStorage.setItem("isAuthorized", true);
  }

  async commitLogin(data) {
    await this.props.login(data, this.onSuccessfulLogin.bind(this), this.onUnsuccessfulLogin.bind(this), (res) => {
    });
  }
  

  render () {
    const {t} = this.props
    return (
      <div className={styles.fullWrapper}>
        <div className={styles.wrapper}>
          <div className={styles.header}>{t('QualityMonitoringSystem')}</div>
          <div className={styles.icons}>
            <div className={styles.icon}><img className={styles.leftLogo} src={multiAgentLogo} alt="MVAS-logo(img1)"/></div>
            <div className={styles.icon}><img className={styles.centerLogo} src={robonomicsLogo} alt="robonomics-logo(img2)"/></div>
            <div className={styles.icon}><img className={styles.rightLogo} src={endoStarsLogo} alt="geoscan-logo(img3)"/>
            </div>
          </div>
          <div>
            <div className={styles.message}>{t('AuthorizeToProceed')} </div>
            <LoginForm onSubmit={(data) => {
              this.commitLogin(data)}}
           />
          </div>
        </div>
      </div>
    )
  }
})))))
