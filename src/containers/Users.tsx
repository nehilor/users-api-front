import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectToken, selectUsers, setUsers, setToken } from "../store/userSlice";
import {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
} from "../services/userService";
import { UUID } from "crypto";
import { User } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import {
    Button,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import UpdateUserModal from './UpdateUserModal';
const Users = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector(selectToken);
    const users = useSelector(selectUsers);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const [openUpdateModal, setOpenUpdateModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [openCreateModal, setOpenCreateModal] = useState(false);
    let newUser: User, setNewUser: (value: { password: string; _id: string; email: string; username: string }) => void;
    // @ts-ignore
    [newUser, setNewUser] = useState<User>({
        username: '',
        email: '',
        password: ''
    });
    const handleCloseUpdateModal = () => {
        setSelectedUser(null);
        setOpenUpdateModal(false);
    };

    useEffect(() => {
        fetchUsers();
    }, [dispatch])

    useEffect(() => {
        // Check if the user is logged in
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const fetchUsers = async () => {
        try {
            const usersData = await getUsers();
            dispatch(setUsers(usersData));
        } catch (error) {
            console.error(error);
        }
    };

    const handleOpenCreateModal = () => {
        setOpenCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setOpenCreateModal(false);
    };

    const handleCreateUser = async () => {
        try {
            await createUser(newUser);
            // Refresh users list after successful creation
            fetchUsers();
            // Reset the new user form fields
            setNewUser({ _id: '', username: '', email: '', password: '' });
            // Close the create modal
            handleCloseCreateModal();
        } catch (error) {
            console.error(error);
            // Handle create user error
        }
    };

    const handleUpdateUser = async (id: string, updatedUser: Partial<User>) => {
        try {
            updateUser(id, updatedUser);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };


    const handleDeleteUser = async () => {
        try {
            const userId: string = selectedUser?._id || '';
            if(userId) {
                await deleteUser(userId);
                setSelectedUser(null);
                setOpenDeleteModal(false);
                await fetchUsers();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        dispatch(setToken('')); // Clear token in Redux store
    };
    const handleOpenUpdateModal = (user: User) => {
        setSelectedUser(user);
        setOpenUpdateModal(true);
    };
    const handleOpenDeleteModal = (user: User) => {
        setSelectedUser(user);
        setOpenDeleteModal(true);
    };
    const handleCloseDeleteModal = () => {
        setSelectedUser(null);
        setOpenDeleteModal(false);
    };

    return (
        <Container component="main" maxWidth="md">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            ></Box>
            <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
                Users List
            </Typography>
            <Box
                sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                }}
            >
                <Button variant="outlined" sx={{ padding: 1 }} onClick={handleOpenCreateModal}>
                    Create User
                </Button>
                <Button variant="outlined" sx={{ padding: 1 }} onClick={handleLogout}>
                    Logout
                </Button>
            </Box>
            <Box>
                <List>
                    {users.map((user: User) => (
                        <ListItem key={user._id}>
                            <ListItemText primary={`${user.username} - ${user.email}`} />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => handleOpenUpdateModal(user)}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={() => handleOpenDeleteModal(user)}>
                                    <Delete />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>

                {/* Update User Modal */}
                <UpdateUserModal
                    open={openUpdateModal}
                    handleClose={handleCloseUpdateModal}
                    handleUpdateUser={handleUpdateUser}
                    selectedUser={selectedUser}
                />

                {/* Create User Modal */}
                <Dialog open={openCreateModal} onClose={handleCloseCreateModal}>
                    <DialogTitle>Create User</DialogTitle>
                    <DialogContent>
                        <TextField
                            name="username"
                            label="Username"
                            value={newUser.username}
                            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            name="email"
                            label="Email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            fullWidth
                        />
                        <TextField
                            name="password"
                            label="Password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseCreateModal}>Cancel</Button>
                        <Button color="primary" onClick={handleCreateUser}>
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>

                {/* Delete User Modal */}
                <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
                    <DialogTitle>Delete User</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to delete this user?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteModal}>Cancel</Button>
                        <Button onClick={handleDeleteUser} color="primary">Delete</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default Users;
