import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import styles from "./LoginForm.module.css";


const LoginForm = (props) => {
  const { t } = useTranslation();

  const [Login, setLogin] = useState('');
  const [Password, setPassword] = useState('');

 const submitForm = (e) => {
  e.preventDefault();
  const data = {username: Login, password: Password}
  props.onSubmit(data)
  // console.log('Login: ', Login)
  // console.log('Password: ', Password)
}

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={submitForm}>
        <div className={styles.formWrapper}>
          <label className={styles.label}>{t('Login')}:</label>
          <input
            type="text"
            className={styles.input}
            name="login"
            placeholder={t('typeLogin')}
            value={Login}
            onChange={event => setLogin(event.target.value)}
          />
        </div>
        <div className={styles.formWrapper}>
          <label className={styles.label}>{t('Password')}:</label>
          <input
           type="password"
            className={styles.input}
            name="password"
            placeholder={t('typePassword')}
            value={Password}
            onChange={event => setPassword(event.target.value)}
          />
        </div>
      </form>
      <div className={styles.buttonsWrapper}>
        <LoadingButton
          size="large"
          loadingIndicator={<CircularProgress color="inherit" size={28} />}
          loading={false}
          color="secondary"
          variant="outlined"
          onClick={submitForm}
        >
          {t('SignIn')}
        </LoadingButton>
      </div>
    </div>
  );
};

export default LoginForm;
