import React, { useEffect } from "react";
import { Navbar } from "../ui/Navbar";
import { useDispatch, useSelector } from "react-redux";

import billsImg from "../../img/billsImg.png";
import incomeImg from "../../img/incomeImg.png";
import expenseImg from "../../img/expenseImg.png";
import totalImg from "../../img/totalImg.png";

import { OperationModal } from "../ui/OperationModal";
import { uiOpenModal } from "../../actions/ui";
import {
  operationStartLoading,
  operationSetActive,
  operationStartDelete,
  operationClearActiveOperation,
} from "../../actions/operation";
import Swal from "sweetalert2";

export const AlkemyScreen = () => {
  const dispatch = useDispatch();
  const { operations, total, income, expense, activeOperation } = useSelector(
    (state) => state.operation
  );

  useEffect(() => {
    dispatch(operationStartLoading());
  }, [dispatch, activeOperation]);

  // const [selectId, setSelectId] = useState(false);

  const onSelect = (e, operation) => {
    e.preventDefault();
    dispatch(operationSetActive(operation));
    dispatch(uiOpenModal());
  };
  const handleDelete = (operation) => {
    dispatch(operationSetActive(operation));
    dispatch(operationStartDelete());
    Swal.fire("Good job!", "Deleted", "success");
  };

  const onCreate = (e) => {
    e.preventDefault();
    dispatch(operationClearActiveOperation());
    dispatch(uiOpenModal());
  };

  return (
    <>
      <Navbar />
      <OperationModal />

      <div className="operation__container-total">
        <div className="operation__box">
          <img src={billsImg} alt={billsImg} className="operation__box-img" />
          <div className="operation__box-p">
            <p className="operation__box-ps">{operations.length}</p>
            <p className="operation__box-ps">Operations</p>
          </div>
        </div>
        <div className="operation__box">
          <img src={incomeImg} alt={incomeImg} className="operation__box-img" />
          <div className="operation__box-p">
            <p className="operation__box-ps">{income}</p>
            <p className="operation__box-ps">Incomes</p>
          </div>
        </div>
        <div className="operation__box">
          <img
            src={expenseImg}
            alt={expenseImg}
            className="operation__box-img"
          />
          <div className="operation__box-p">
            <p className="operation__box-ps">{expense}</p>
            <p className="operation__box-ps">Expenses</p>
          </div>
        </div>
        <div className="operation__box">
          <img src={totalImg} alt={totalImg} className="operation__box-img" />
          <div className="operation__box-p">
            <p className="operation__box-ps">{total}</p>
            <p className="operation__box-ps">Total</p>
          </div>
        </div>
      </div>

      <i onClick={onCreate} className="fas fa-plus-circle operation__new"></i>
      <div className="operation">
        {operations.map((operation) => (
          <div key={operation.id} className="operation__container">
            <div className="operation__type-container">
              <p className="operation__id">{operation.id}</p>
              {operation.type == 1 ? (
                <p className="operation__type">Income</p>
              ) : (
                <p className="operation__type">Expense</p>
              )}

              <i
                className="far fa-edit operation__edit"
                onClick={(e) => {
                  onSelect(e, operation);
                }}
              ></i>
              <i
                className="fas fa-times operation__delete"
                onClick={(e) => {
                  handleDelete(operation);
                }}
              ></i>
            </div>
            <div className="operation__container-info">
              <p className="operation__concept">Concept: {operation.concept}</p>
              <p className="operation__amount">amount: {operation.amount}</p>
              <p className="operation__date">Created: {operation.createdAt}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
