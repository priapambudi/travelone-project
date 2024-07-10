import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import SwitchToggle from "../../basic_components/SwitchToggle";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const columns = (handleSwitchChange) => [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "email", headerName: "Email", width: 180 },
  {
    field: "phoneNumber",
    headerName: "Phone",
    width: 130,
  },
  {
    field: "profilePictureUrl",
    headerName: "Avatar",
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <div className="flex items-center h-full">
        <img
          src={params.value}
          alt="avatar"
          className="w-8 h-8 rounded-full "
        />
      </div>
    ),
  },
  {
    field: "role",
    headerName: "Role",
    width: 160,
    renderCell: (params) => (
      <div className="flex items-center h-full">
        {params.value === "admin" ? (
          <p className="flex items-center h-8 p-1 text-red-500 bg-red-100 rounded ">
            Admin
          </p>
        ) : (
          <p className="flex items-center h-8 p-1 text-yellow-500 bg-yellow-100 rounded p-1flex">
            User
          </p>
        )}
      </div>
    ),
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <div className="flex items-center h-full">
        <SwitchToggle handleSwitchChange={handleSwitchChange} params={params} />
      </div>
    ),
  },
];

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  const getUser = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
          },
        }
      );
      // console.log(res);
      return setUsers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSwitchChange = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const updateRole = async () => {
    const newRole = selectedUser.role === "admin" ? "user" : "admin";
    try {
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${selectedUser.id}`,
        { role: newRole },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
          },
        }
      );
      // console.log(res);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...user, role: newRole } : user
        )
      );
    } catch (error) {
      console.log(error);
    }
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full p-5 h-5/6">
      <DataGrid
        rows={users}
        columns={columns(handleSwitchChange)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        // checkboxSelection
      />
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>Confirm Role Change</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the role of {selectedUser?.name}{" "}
            from {selectedUser?.role}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={updateRole} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
