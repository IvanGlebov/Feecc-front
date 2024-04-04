import React, { useContext } from "react";
import ModalActionsContext from "@reducers/context/modal-context";
import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import styles from "./ProceedNotSaved.module.css";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import CloseActionButton from "../../CloseActionButton/CloseActionButton";

const ProceedNotSaved = (props) => {
  const { onClose } = useContext(ModalActionsContext);
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentHeader}>{t("ImportantMessage")}</div>
      <div className={styles.contentText}>
        {t('IfYouContinue')} <strong>{t('Without')}</strong> {t('SavingYouWillNeed')}. <br />
        {t('ProductWillNotWillBeConsideredCompleted')}. {t('ProductInformation')} <strong>{t('Not')}</strong> {t('ButTheyAre')}, {t('UploadedToTheIPFSNetwork')}
        <strong> {t('SavedLocally')}</strong> {t('ComeBackLater')}.
        <br />
        <br />
        {t('WhenTheOpportunityArises')}:
        <br />
        - {t('ScanTheProductBarcode')}.
        <br />
        - {t('SaveYourPassport')}.
        <br />
        <br />
        {t('IfSavedSuccessfully')}. <br />
        {t('IfTheCurrentErrorOccurs')}, {t('TryAgainLater')}.
      </div>
      <div className={styles.buttonsWrapper}>
        <LoadingButton
          size="large"
          loadingIndicator={<CircularProgress color="inherit" size={28} />}
          loading={false}
          color="secondary"
          variant="outlined"
          onClick={() => {
            props.onNoSave && props.onNoSave();
            enqueueSnackbar(
              `${t('Passport')} ${props.unitID} ${t('WasNotSavedInIPFS')}. ${t('YouShouldComeBackToItLater')}`,
              { variant: "warning", action: CloseActionButton }
            );
            onClose();
          }}
        >
          {t('ContinueWithoutSaving')}
        </LoadingButton>
        <LoadingButton
          size="large"
          loadingIndicator={<CircularProgress color="inherit" size={28} />}
          loading={false}
          color="primary"
          variant="contained"
          onClick={onClose}
        >
          {t('Return')}
        </LoadingButton>
      </div>
    </div>
  );
};

export default ProceedNotSaved;
