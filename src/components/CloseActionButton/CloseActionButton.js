import React from "react";
import styles from "./CloseActionButton.module.css";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

const CloseActionButton = (key) => {
  const { closeSnackbar } = useSnackbar();
  const { t } = useTranslation();
  return (
    <button
      className={styles.notificationButton}
      onClick={() => closeSnackbar(key)}
    >
      {t('CloseButton')}
    </button>
  );
};

export default CloseActionButton;
