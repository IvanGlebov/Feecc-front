import React, { useContext } from "react";
import ModalActionsContext from "@reducers/context/modal-context";
import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import styles from "./ReloadWarning.module.css";
import { useTranslation } from "react-i18next";

const ReloadWarning = (props) => {
  const { onClose } = useContext(ModalActionsContext);
  const { t } = useTranslation();

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentHeader}>{t("ImportantMessage")}</div>
      <div className={styles.contentText}>
        {t('YouAreAboutToReloadThePage')}. <br/>{t('This')} <strong>{t('May')}, </strong>{t('But')} <strong>{t("shouldn't")} </strong>{t('LeadToErrorsAtThisStage')}. {t('IfItIsPossibleNotToReloadThePage')}, {t('ThenYouShouldUseIt')}.
      </div>
      <div className={styles.buttonsWrapper}>
        <LoadingButton
          size="large"
          loadingIndicator={<CircularProgress color="inherit" size={28} />}
          loading={false}
          color="secondary"
          variant="outlined"
          onClick={props.reloadAction}
        >
          {t('Reboot')}
        </LoadingButton>
        <LoadingButton
          size="large"
          loadingIndicator={<CircularProgress color="inherit" size={28} />}
          loading={false}
          color="primary"
          variant="contained"
          onClick={onClose}
        >
          {t("СloseButton")}
        </LoadingButton>
      </div>
    </div>
  );
};

export default ReloadWarning;
