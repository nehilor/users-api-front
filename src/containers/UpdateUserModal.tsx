import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from '@mui/material';
import { User } from '../interfaces/interfaces';

interface UpdateUserModalProps {
    open: boolean;
    handleClose: () => void;
    handleUpdateUser: (id: string, updatedUser: Partial<User>) => void;
    selectedUser: User | null;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({open, handleClose, handleUpdateUser, selectedUser}) => {
    const [updatedUser, setUpdatedUser] = useState<Partial<User>>({});
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUpdatedUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleUpdate = () => {
        if (selectedUser) {
            handleUpdateUser(selectedUser._id, updatedUser);
            setUpdatedUser({});
            handleClose();
        }
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update User</DialogTitle>
            <DialogContent>
                <TextField
                    name="username"
                    label="Username"
                    value={updatedUser.username || (selectedUser?.username || '')}
                    onChange={handleChange}
                    fullWidth
                    sx={{
                        margin: 1
                    }}
                />
                <TextField
                    name="email"
                    label="Email"
                    value={updatedUser.email || (selectedUser?.email || '')}
                    onChange={handleChange}
                    fullWidth
                    sx={{
                        margin: 1
                    }}
                />
                {/* Add more form fields as needed */}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button color="primary" onClick={handleUpdate}>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateUserModal;
