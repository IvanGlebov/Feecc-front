import React, { useContext, useEffect, useState } from "react";
import ModalActionsContext from "@reducers/context/modal-context";
import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import styles from "./AdditionalInfo.module.css";

const AdditionalInfo = (props) => {
  const { onClose } = useContext(ModalActionsContext);

  const [inputFields, setInputFields] = useState([]);

  useEffect(() => {
    let inputs = [...inputFields];

    const data = props.data;

    data.forEach(item => {

      if(item['status_code'] === 504) {
               
        const keys = Object.keys(item);
        const keysArr = keys.filter(key => key !== 'status_code');

        keysArr.forEach(k => {
          if(item[k]) inputs.push({detail: k, value: ''})
        })
      }

    })

    setInputFields([
      inputs
    ])
    
  }, []);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[0][index].value = event.target.value;
    setInputFields(data);
 }

 const submitForm = (e) => {
  e.preventDefault();
  const arr = [...inputFields[0]];
  const newObj = {};
  
  arr.forEach((i => {
    let key = i.detail
    newObj[key] = i.value;

  }))
  onClose();
  props.onSubmit(newObj)
}

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.contentHeader}>Внесите недостающие данные</div>
      <div className={styles.contentText}>

      </div>
      <form className={styles.form} onSubmit={submitForm}>
      {inputFields.length && inputFields[0].map((input,index) => {
          return (
            <div key={index}>
              <label className={styles.label}>{input.detail}:</label>
              <input
                className={styles.input}
                name={input.detail}
                placeholder={`введите ${input.detail}, пожалуйста`}
                value={input.value}
                onChange={event => handleFormChange(index, event)}
              />
            </div>
          )
        })}
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
          Отправить данные
        </LoadingButton>
        <LoadingButton
          size="large"
          loadingIndicator={<CircularProgress color="inherit" size={28} />}
          loading={false}
          color="primary"
          variant="contained"
          onClick={onClose}
        >
          Закрыть
        </LoadingButton>
      </div>
    </div>
  );
};

export default AdditionalInfo;
