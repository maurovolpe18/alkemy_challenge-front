import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";

import { types } from "../types/types";

export const operationStartNew = (operation) => {
  return async (dispatch, getState) => {
    const { id, user } = getState().auth;
    try {
      const resp = await fetchConToken("operation/new", operation, "POST");
      const body = await resp.json();
      console.log(body);

      if (body.ok) {
        operation.id = body.operation.id;
        operation.user = {
          id,
          user,
        };
        console.log(operation);
        dispatch(operationAddNew(operation));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const operationAddNew = (operation) => ({
  type: types.operationAddNew,
  payload: operation,
});

export const operationStartLoading = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken("operation");
      const body = await resp.json();
      const operations = body.operation;
      const total = body.amountTotal;
      const income = body.suma;
      const expense = body.resta;
      console.log(body.operation, "aca");
      dispatch(
        operationLoaded({
          operations,
          total,
          income,
          expense,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

const operationLoaded = (operations) => ({
  type: types.operationLoaded,
  payload: operations,
});

export const operationStartUpdate = (operation) => {
  return async (dispatch) => {
    try {
      const resp = await fetchConToken(
        `operation/${operation.id}`,
        operation,
        "PUT"
      );
      const body = await resp.json();
      console.log(body);
      if (body.ok) {
        dispatch(operationUpdated(operation));
      } else {
        Swal.fire("Error", body.err.message, "error");
      }
      console.log(body);
    } catch (error) {
      console.log(error);
    }
  };
};

const operationUpdated = (operation) => ({
  type: types.operationUpdated,
  payload: operation,
});

export const operationSetActive = (operation) => ({
  type: types.operationSetActive,
  payload: operation,
});

export const operationClearActiveOperation = () => ({
  type: types.operationClearActiveOperation,
});

export const operationStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().operation.activeOperation;
    try {
      const resp = await fetchConToken(`operation/${id}`, {}, "DELETE");
      const body = await resp.json();

      if (body.ok) {
        dispatch(operationDeleted());
      } else {
        Swal.fire("Error", body.error.message, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const operationDeleted = () => ({ type: types.operationDeleted });
