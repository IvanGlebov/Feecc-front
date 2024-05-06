import fetch from 'cross-fetch'
import axios from "axios";

export const types = {
  STAGES__FETCH_COMPOSITION        : 'STAGES__FETCH_COMPOSITION',
  STAGES__REPORT_ERROR             : 'STAGES__REPORT_ERROR',
  STAGES__RESET_ERROR_NOTIFICATION : 'STAGES__RESET_ERROR_NOTIFICATION',
  STAGES__CREATE_NEW_UNIT          : 'STAGES__CREATE_NEW_UNIT',
  STAGES__REMOVE_NOTIFICATION      : 'STAGES__REMOVE_NOTIFICATION',
  STAGES__ADD_NOTIFICATION         : 'STAGES__ADD_NOTIFICATION',
  STAGES__RESET_UNIT               : 'STAGES__RESET_UNIT',
  STAGES__SET_STEPS                : 'STAGES__SET_STEPS',
  STAGES__SET_WORKBENCH_NO         : 'STAGES__SET_WORKBENCH_NO',
  STAGES__SET_BETWEEN_FLAG         : 'STAGES__SET_BETWEEN_FLAG',
  STAGES__SET_UNIT_ID              : 'STAGES__SET_UNIT_ID',
  STAGES__ADD_UNIT_TO_IGNORE       : 'STAGES__ADD_UNIT_TO_IGNORE',
  STAGES__ADD_TIMESTAMP_TO_IGNORE  : 'STAGES__ADD_TIMESTAMP_TO_IGNORE',
  STAGES__SET_PRODUCTION_SCHEMAS   : 'STAGES__SET_PRODUCTION_SCHEMAS',
  // STAGES__GET_UNIT_INFORMATION    : 'STAGES__GET_UNIT_INFORMATION',
  REVISIONS__FETCH_PASSPORTS       : 'REVISIONS__FETCH_PASSPORTS',
  STAGES__UPDATE_COMPOSITION_TIMER : 'STAGES__UPDATE_COMPOSITION_TIMER',
  STAGES__TRY_TO_AUTHORIZE_EMPLOYEE: 'STAGES__TRY_TO_AUTHORIZE_EMPLOYEE',
  STAGES__AUTHORIZE_EMPLOYEE       : 'STAGES__AUTHORIZE_EMPLOYEE',
  STAGES__UNAUTHORIZE_EMPLOYEE     : 'STAGES__UNAUTHORIZE_EMPLOYEE',
}

export const reportError = (error) => {
  let msg = error && error.message || error
  try {
    return { type: types.STAGES__REPORT_ERROR, error: JSON.parse.msg }
  } catch (e) {
    return { type: types.STAGES__REPORT_ERROR, error: msg }
  }
}

export const reportAxiosError = (error) => {
  if(error && error.response.status === 504) {
    return { type: types.STAGES__REPORT_ERROR, error: error.response }
  } else {
    return { type: types.STAGES__REPORT_ERROR, error: error }
  }
}



export const axiosWrapper = (dispatch, event, opts, successChecker) => {
  return axios(opts)
    // .then(res => {
    //   if (res.status >= 400)
    //     throw new Error(JSON.stringify(res))
    //   else {
    //     return res
    //   }
    // })
    .then(res => {
      if (!successChecker || successChecker(res.data)) {
        if (event !== undefined) {
          dispatch((typeof event === 'string') ? { type: event, ...res.data } : event(res.data))
        }
      } else {
        dispatch(reportAxiosError(res))
      }

      if (process.env.DEV_SHOW_REDUCERS) {
        console.log(res)
      }

      return res
    })
    .catch(error => {
      dispatch(reportAxiosError(error))
    })
}

export const promiseAxiosWrapper = (dispatch, event, opts) => {
  return new Promise((resolve, reject) => {
    axios(opts)
    .then((res) => {
      if (event !== undefined) {
        dispatch((typeof event === 'string') ? { type: event, ...res.data } : event(res.data))
      }
      resolve(res)
    })
    .catch(reject)
  })
}
