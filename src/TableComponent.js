import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRow, updateRow, deleteRow } from './redux/rowsSlice';
import RowModal from './RowModal';
import './App.css';

const TableComponent = () => {
    const rows = useSelector((state) => state.rows);
    const dispatch = useDispatch();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', distinction: 'Pass', marks: '', remarks: '' });
    const [editIndex, setEditIndex] = useState(null);
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const openModal = (index = null) => {
        if (index !== null) {
            setFormData(rows[index]);
            setEditIndex(index);
        } else {
            setFormData({ name: '', distinction: 'Pass', marks: '', remarks: '' });
            setEditIndex(null);
        }
        setFormErrors({});
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.name) errors.name = "Name is required";
        if (!formData.distinction) errors.distinction = "Distinction is required";
        if (formData.marks === '' || formData.marks < 0 || formData.marks > 100) errors.marks = "Marks must be between 0 and 100";

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        if (editIndex !== null) {
            dispatch(updateRow({ index: editIndex, row: formData }));
        } else {
            dispatch(addRow(formData));
        }
        closeModal();
    };

    const handleDelete = (index) => {
        dispatch(deleteRow(index));
    };

    return (
        <div>
            <div className="add-row-button">
                <button className="add-row" onClick={() => openModal()}>Add Row</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Name</th>
                        <th>Distinction</th>
                        <th>Marks</th>
                        <th>Remarks</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{row.name}</td>
                            <td>{row.distinction}</td>
                            <td>{row.marks}</td>
                            <td>{row.remarks}</td>
                            <td className="actions">
                                <button onClick={() => openModal(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <RowModal 
                modalIsOpen={modalIsOpen} 
                closeModal={closeModal} 
                formData={formData} 
                handleInputChange={handleInputChange} 
                handleSubmit={handleSubmit} 
                formErrors={formErrors} 
                editIndex={editIndex} 
            />
        </div>
    );
};

export default TableComponent;
