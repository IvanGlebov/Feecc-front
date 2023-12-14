import React, { useContext, useEffect, useState } from "react";
import ModalActionsContext from "@reducers/context/modal-context";
import { LoadingButton } from "@mui/lab";
import { CircularProgress } from "@mui/material";
import styles from "./AdditionalInfo.module.css";

const AdditionalInfo = (props) => {
  const { onClose } = useContext(ModalActionsContext);

  const [inputFields, setInputFields] = useState([]);

  useEffect(() => {
    // const data = 'license_plate, weight, length'
    let inputs = [...inputFields];
    if(props.data.detail.includes(',')) {
      const array = props.data.detail.split(', ');
      array.forEach(item => {
        inputs.push({detail: item, value: ''})
      })
      setInputFields([
       inputs
      ])
    } else {
      inputs.push({detail: props.data.detail, value: ''});
      setInputFields([
        inputs
      ])
    }
  }, []);

  const handleFormChange = (index, event) => {
    let data = [...inputFields];
    data[0][index].value = event.target.value;
    setInputFields(data);
 }

 const submitForm = (e) => {
  e.preventDefault();
  let licensePlate = '0000000';
  const arr = [...inputFields[0]];
  arr.forEach(item => {
    if(item.detail === 'licence_plate') {
      licensePlate = item.value
    }
  })
  props.onSubmit(arr, licensePlate)
  onClose();
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
                placeholder={`type in ${input.detail}, please`}
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
