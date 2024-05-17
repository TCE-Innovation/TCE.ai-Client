import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const AddUserDialog = ({ open, handleClose, handleConfirm, title, description }) => {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="dialog-title" aria-describedby="dialog-description">
            <DialogTitle id="dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="dialog-description">{description}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} style={{ color: "#1b365f" }}>Cancel</Button>
                <Button onClick={handleConfirm} style={{ color: "#1b365f" }}>Confirm</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddUserDialog;
