import {
    FETCH_PAYMENT, HIDE_PAYMENT_SPINNER, HIDE_USER_SPINNER, SET_PAYMENT, SHOW_PAYMENT_SPINNER, SHOW_TASKS_SPINNER,
    SHOW_USER_SPINNER, HIDE_TASKS_SPINNER, SHOW_TASKS_DIALOG, HIDE_TASKS_DIALOG, DISABLE_CREATE_BUTTON,
    ENABLE_CREATE_BUTTON, SHOW_TASK_INFO_DIALOG, HIDE_TASK_INFO_DIALOG
} from "./types";

export const showUserSpinner = () => ({
    type: SHOW_USER_SPINNER
});
export const hideUserSpinner = () => ({
    type: HIDE_USER_SPINNER
});
export const fetchPayment = () => ({
    type: FETCH_PAYMENT
});
export const setPayment = (payment) => ({
    type: SET_PAYMENT,
    payload: payment
});
export const showPaymentSpinner = () => ({
    type: SHOW_PAYMENT_SPINNER
});
export const hidePaymentSpinner = () => ({
    type: HIDE_PAYMENT_SPINNER
});
export const showTasksSpinner = () => ({
    type: SHOW_TASKS_SPINNER
});
export const hideTasksSpinner = () => ({
    type: HIDE_TASKS_SPINNER
});
export const showTasksDialog = () => ({
    type: SHOW_TASKS_DIALOG
});
export const hideTasksDialog = () => ({
    type: HIDE_TASKS_DIALOG
});
export const enableCreateButton = () => ({
    type: ENABLE_CREATE_BUTTON
});
export const disableCreateButton = () => ({
    type: DISABLE_CREATE_BUTTON
});
export const showTaskInfoDialog = () => ({
    type: SHOW_TASK_INFO_DIALOG
});
export const hideTaskInfoDialog = () => ({
    type: HIDE_TASK_INFO_DIALOG
});