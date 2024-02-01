import React from "react";
import styles from "./RepeatCloseActionButton.module.css";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

function RepeatCloseActionButton(key) {
  const { closeSnackbar } = useSnackbar();
  const { t } = useTranslation();

  return (
    <div className={styles.notificationButtons}>
      <button
        className={styles.notificationButton}
        onClick={this.action}
      >
        {this.actionName}
      </button>
      <button
        className={styles.notificationButton}
        onClick={() => {
          closeSnackbar(key);
        }}
      >
        {t("СloseButton")}
      </button>
    </div>
  );
}

export default RepeatCloseActionButton;
