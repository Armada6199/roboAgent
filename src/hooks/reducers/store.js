import axios from "axios";
import i18n from "src/dictonaries/i18n";
import { reshapeUserData } from "src/utils/users/tableUtils";

export function generalSuccessReducer(result, utils) {
  const { body } = result?.data?.roboAgentRs;
  const { header } = result?.data?.roboAgentRs;
  console.log(utils);
  const { setAlertInfo } = utils;
  const currentLang = i18n.language;
  const currentMessageLang =
    currentLang === "ar"
      ? header.responseStatus.arabicMsg
      : header.responseStatus.englishMsg;
  switch (utils.requestAction) {
    case "GET_ALL_USERS": {
      const { setTableData } = utils;
      const newUsersDataReshaped = reshapeUserData(body.users);
      setTableData(newUsersDataReshaped);
      break;
    }
    case "SET_IS_LOGGED_IN": {
      const { loginDispatch } = utils;
      loginDispatch({
        type: "ON_LOGIN",
        payload: { user: body.user, token: result.headers["authorization"] },
      });
      axios.defaults.headers.common["authorization"] =
        result.headers["authorization"];
      break;
    }
    case "SET_SERVICE_LIST": {
      const { setServiceList } = utils;
      console.log(body);
      setServiceList(body.roboServices);
      break;
    }
    case "SET_USER_SERVICE_LIST": {
      const { setUserServiceList } = utils;
      setUserServiceList(result);
      break;
    }
    case "GET_ALL_AUTHORITIES": {
      const { setAuthorities } = utils;
      setAuthorities(body.roboAuthorities);
      break;
    }
    case "REGISTER_NEW_USER": {
      const { setAlertInfo } = utils;
      setAlertInfo({
        alertType: "success",
        alertMsg: currentMessageLang,
      });
      break;
    }
    case "UPDATE_USER_ROLE": {
      const {
        setTableData,
        userId,
        tableData,
        newRole,
        handleCloseRolePopper,
      } = utils;

      setTableData(updateTableData(tableData, 5, newRole, userId));
      handleCloseRolePopper();
      setAlertInfo({
        alertType: "success",
        alertMsg: currentMessageLang,
      });
      break;
    }
    case "UPDATE_USER_AUTHORITIES": {
      const { handleClose, setAlertInfo } = utils;
      console.log("updated");
      handleClose();
      setAlertInfo({
        alertType: "success",
        alertMsg: currentMessageLang,
      });
      break;
    }
    case "UPDATE_USER_TEAM": {
      break;
    }
    case "SET_SUBMIT_USER_SERVICE": {
      const {
        handleCloseServiceDialog,
        setTableData,
        userId,
        tableData,
        userNewService,
        setAlertInfo,
      } = utils;
      setTableData(updateTableData(tableData, 7, userNewService, userId));
      setAlertInfo({ alertType: "success", alertMsg: currentMessageLang });
      handleCloseServiceDialog();
      break;
    }
    case "SET_ANSWER": {
      const { setAnswer } = utils;
      setAnswer(body.getAnswer.getAnswerResp);
      break;
    }
  }
  return result;
}
function updateTableData(tableData, index, newValue, userId) {
  const newTableData = [];
  tableData.map((e) => {
    if (e[0] == userId) {
      e[index] = newValue;
      newTableData.push(e);
    } else {
      newTableData.push(e);
    }
  });
  return newTableData;
}
