import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

export default function DeleteBtn({
  deleteAction,
  item,
  itemNameKey,
  refreshTable,
}) {
  const token = localStorage.getItem("token");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const deleteBtnOpen = () => {
    setDeleteDialogOpen(true);
  };

  const handleCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    try {
      await deleteAction(item, token);
      toast.success(`${item[itemNameKey]} deleted successfully`);
      setDeleteDialogOpen(false);
      refreshTable(); // Refresh the table after deletion
    } catch (error) {
      toast.error(`Failed to delete ${item[itemNameKey]}. Please try again.`);
    }
  };

  return (
    <div>
      <button
        onClick={deleteBtnOpen}
        className="flex items-center h-8 p-2 border-2 border-red-400 rounded"
      >
        Delete
      </button>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {item[itemNameKey]}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="warning">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
