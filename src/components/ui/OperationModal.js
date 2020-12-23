import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import {
  operationClearActiveOperation,
  operationStartNew,
  operationStartUpdate,
} from "../../actions/operation";
import { uiCloseModal } from "../../actions/ui";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
  },
};
Modal.setAppElement("#root");
const initOperation = {
  concept: "",
  amount: "",
  type: 1,
};
export const OperationModal = () => {
  const dispatch = useDispatch();
  const { activeOperation } = useSelector((state) => state.operation);
  const [formValues, setFormValues] = useState(initOperation);
  const { concept, amount } = formValues;
  const { modalOpen } = useSelector((state) => state.ui);
  let option_id = [0, 1];
  let options = [{ name: "expense" }, { name: "income" }];
  let selectedOptionId = 1;

  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  useEffect(() => {
    if (activeOperation) {
      setFormValues(activeOperation);
    } else {
      setFormValues(initOperation);
    }
  }, [activeOperation, setFormValues]);

  const closeModal = () => {
    dispatch(uiCloseModal());
    dispatch(operationClearActiveOperation());
  };
  const handleSubmitForm = (e) => {
    e.preventDefault();
    if (concept.trim().length < 2) {
      return Swal.fire("Error", "Concept is required", "error");
    }
    if (amount.trim().length < 1) {
      return Swal.fire("Error", "Amount is required", "error");
    }

    if (activeOperation) {
      dispatch(operationStartUpdate(formValues));
      Swal.fire("Good job!", "Great", "success");
    } else {
      dispatch(operationStartNew(formValues));
      Swal.fire("Good job!", "Created", "success");
    }
    closeModal();
  };
  return (
    <>
      <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        closeTimeoutMS={200}
        className="modal"
        overlayClassName="modal-fondo"
      >
        <form className="modal__container" onSubmit={handleSubmitForm}>
          <div className="modal__box">
            <h2 className="modal__title">Operation</h2>
          </div>
          <div className="modal__box">
            <p className="modal__p">Concept</p>
            <input
              className="modal__input"
              type="text"
              name="concept"
              value={concept}
              onChange={handleInputChange}
            />
          </div>
          <div className="modal__box">
            <p className="modal__p">Amount</p>
            <input
              className="modal__input"
              type="number"
              name="amount"
              value={amount}
              onChange={handleInputChange}
            />
          </div>
          <div className={activeOperation ? `d-none` : `modal_box`}>
            <p className="modal__p">Type</p>
            <select
              className="modal__select"
              name="type"
              defaultValue={selectedOptionId}
              onChange={handleInputChange}
            >
              {option_id.map((id) => (
                <option key={id} value={id}>
                  {options[id].name}
                </option>
              ))}
            </select>
          </div>
          <div className="modal__box">
            <button className="modal__btn">Agree</button>
          </div>
        </form>
      </Modal>
    </>
  );
};
