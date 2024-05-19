import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const RowModal = ({ modalIsOpen, closeModal, formData, handleInputChange, handleSubmit, formErrors, editIndex }) => {
    return (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="modal-content" overlayClassName="ReactModal__Overlay">
            <div className="modal-header">
                <h2>{editIndex !== null ? 'Edit Row' : 'Add Row'}</h2>
                <button className="close" onClick={closeModal}>×</button>
            </div>
            <div className="modal-body">
                <form>
                    <div>
                        <label>Name:</label>
                        <input type="text" name="name" value={formData.name} onChange={handleInputChange} maxLength="30" />
                        {formErrors.name && <span className="error">{formErrors.name}</span>}
                    </div>
                    <div>
                        <label>Distinction:</label>
                        <select name="distinction" value={formData.distinction} onChange={handleInputChange}>
                            <option value="Pass">Pass</option>
                            <option value="Fail">Fail</option>
                        </select>
                        {formErrors.distinction && <span className="error">{formErrors.distinction}</span>}
                    </div>
                    <div>
                        <label>Marks:</label>
                        <input type="number" name="marks" value={formData.marks} onChange={handleInputChange} min="0" max="100" />
                        {formErrors.marks && <span className="error">{formErrors.marks}</span>}
                    </div>
                    <div>
                        <label>Remarks:</label>
                        <textarea name="remarks" value={formData.remarks} onChange={handleInputChange} maxLength="300"></textarea>
                    </div>
                </form>
            </div>
            <div className="modal-footer">
                <button type="button" onClick={handleSubmit}>Submit</button>
            </div>
        </Modal>
    );
};

export default RowModal;
