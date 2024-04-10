import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import SoftButton from 'components/SoftButton';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';
import SoftBox from 'components/SoftBox';

const UpdateModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    // Initialize your form fields here
    // For example: name: '', refNum: '', grade: '', section: '', email: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Implement your save logic here
    // For example, you can make an API call to update data
    // After saving, close the modal
    onClose();
  };

  return (
    <Dialog 
      open={isOpen}
      onClose={onClose}
    //   fullScreen
      maxWidth
      aria-labelledby="update-modal-title"
      aria-describedby="update-modal-description"
    >
        <DialogContent>
        <SoftTypography variant="caption" color="text" fontWeight="bold">
          Update
        </SoftTypography>
        <SoftBox>
            <SoftTypography fontSize={10} variant="caption" color="text" fontWeight="bold">
            Name
            </SoftTypography>
            {/* Render your form fields here */}
            <SoftInput
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleInputChange}
            />
        </SoftBox>
        <SoftBox>
            <SoftTypography fontSize={10} variant="caption" color="text" fontWeight="bold">
            refNum
            </SoftTypography>
            {/* Render your form fields here */}
            <SoftInput
            type="text"
            name="refNum"
            value={formData.refNum || ''}
            onChange={handleInputChange}
            />
        </SoftBox>
        <SoftBox>
            <SoftTypography fontSize={10} variant="caption" color="text" fontWeight="bold">
            Grade
            </SoftTypography>
            {/* Render your form fields here */}
            <SoftInput
            type="text"
            name="grade"
            value={formData.grade || ''}
            onChange={handleInputChange}
            />
        </SoftBox>
        <SoftBox>
            <SoftTypography fontSize={10} variant="caption" color="text" fontWeight="bold">
            Section
            </SoftTypography>
            {/* Render your form fields here */}
            <SoftInput
            type="text"
            name="section"
            value={formData.section || ''}
            onChange={handleInputChange}
            />
        </SoftBox>
        <SoftBox>
            <SoftTypography fontSize={10} variant="caption" color="text" fontWeight="bold">
            Email
            </SoftTypography>
            {/* Render your form fields here */}
            <SoftInput
            type="text"
            name="email"
            value={formData.email || ''}
            onChange={handleInputChange}
            />
        </SoftBox>
        {/* Add more form fields for refNum, grade, section, email, etc. */}
        <SoftBox mt={2} display="flex" justifyContent="flex-end">
            <SoftButton variant="gradient" color="info" onClick={handleSave}>
                Save
            </SoftButton>
            <SoftBox ml={2}>
                <SoftButton variant="contained" color="error" onClick={onClose}>
                Close
                </SoftButton>
            </SoftBox>
        </SoftBox>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateModal;
