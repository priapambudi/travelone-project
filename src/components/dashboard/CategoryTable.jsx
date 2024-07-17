import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "10px",
  p: 4,
};

const columns = (handleClickOpen, handleDeleteOpen) => [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  {
    field: "imageUrl",
    headerName: "Image",
    sortable: false,
    width: 100,
    renderCell: (params) => (
      <div className="flex items-center h-full">
        <img src={params.value} alt="image" className="w-8 h-8 " />
      </div>
    ),
  },
  {
    field: "createdAt",
    headerName: "Created",
    width: 180,
  },
  {
    field: "updatedAt",
    headerName: "Updated",
    width: 180,
  },
  {
    field: "action",
    headerName: "Action",
    sortable: false,
    width: 200,
    renderCell: (params) => (
      <div className="flex items-center h-full gap-5">
        <button
          onClick={() => handleClickOpen(params.row)}
          className="flex items-center h-8 p-2 border-2 border-blue-400 rounded "
        >
          Edit
        </button>
        <button
          onClick={() => handleDeleteOpen(params.row)}
          className="flex items-center h-8 p-2 border-2 border-red-400 rounded"
        >
          Delete
        </button>
      </div>
    ),
  },
];

export default function CategoryTable() {
  const [categories, setCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryImage, setSelectedCategoryImage] = useState(null);
  const [categoryToDelete, setCategoryToDelete] = useState(null);
  const [openCreate, setOpenCreate] = useState(false);

  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const getCategory = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      //   console.log(res.data.data);
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOpen = (category) => {
    setSelectedCategoryId(category.id);
    setName(category.name);
    setSelectedCategoryImage(category.imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setImageUrl(null);
    setSelectedCategoryId(null);
    setSelectedCategoryImage(null);
  };

  const handleDeleteOpen = (category) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleCancel = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  const handleUpload = async () => {
    if (!imageUrl) return selectedCategoryImage; // Return the same image URL if it hasn't changed

    const formData = new FormData();
    formData.append("image", imageUrl);

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(res);
      return res.data.url;
    } catch (error) {
      // console.log(error);
      toast.error("Image upload failed. Please try again.");
      return null;
    }
  };

  const updateCategory = async (e) => {
    e.preventDefault();

    if (!selectedCategoryId) {
      toast.error("No category selected for update.");
      return;
    }

    const uploadedImageUrl = await handleUpload();

    if (!uploadedImageUrl) return;

    const payload = {
      name: name,
      imageUrl: uploadedImageUrl,
    };

    try {
      const res = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${selectedCategoryId}`,
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(res.data.data);
      toast.success(res.data.message || "Category updated successfully");
      handleClose();
      getCategory(); // Refresh the table
      navigate("/dashboard/category");
    } catch (error) {
      // console.log(error);
      toast.error("Category update failed. Please try again.");
    }
  };

  const deleteCategory = async () => {
    try {
      const res = await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${categoryToDelete.id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(res.data.data);
      toast.success(res.data.message || "Category deleted successfully");
      setDeleteDialogOpen(false); // Close the dialog
      getCategory(); // Refresh the category list
      navigate("/dashboard/category");
    } catch (error) {
      // console.log(error);
      toast.error("Category deletion failed. Please try again.");
    }
  };

  const handleUploadCreate = async () => {
    if (!imageUrl) return null;

    const formData = new FormData();
    formData.append("image", imageUrl);

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formData,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return res.data.url;
    } catch (error) {
      // console.log(error);
      toast.error("Image upload failed. Please try again.");
      return null;
    }
  };

  const createCategory = async (e) => {
    e.preventDefault();

    const uploadedImageUrl = await handleUploadCreate();

    if (!uploadedImageUrl) return;

    const payload = {
      name: name,
      imageUrl: uploadedImageUrl,
    };

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-category",
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message || "Category created successfully");
      setOpenCreate(false); // Close the modal
      getCategory(); // Refresh the table
      navigate("/dashboard/category");
    } catch (error) {
      // console.log(error);
      toast.error("Category creation failed. Please try again.");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="w-full p-5 h-5/6">
      <div className="flex items-center justify-between">
        <div>
          <input
            className="pl-2 border rounded-md border-slate-400"
            type="text"
            placeholder="Search..."
          />
          <SearchOutlinedIcon />
        </div>
        <button
          onClick={() => setOpenCreate(true)}
          className="px-2 mb-2 border-2 border-orange-400 rounded-full hover:bg-orange-400 hover:text-white"
        >
          Create
        </button>
      </div>
      <DataGrid
        rows={categories}
        columns={columns(handleClickOpen, handleDeleteOpen)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
      />

      {/* Modal for update */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <HighlightOffOutlinedIcon
            className="absolute cursor-pointer top-2 right-2"
            onClick={handleClose}
          />
          <div className="flex gap-3">
            <div>
              {selectedCategoryImage && (
                <img
                  src={selectedCategoryImage}
                  alt="Selected Category"
                  className="object-cover w-full h-full"
                />
              )}
            </div>
            <form className="flex flex-col gap-2" onSubmit={updateCategory}>
              <p className="text-lg font-bold ">Update Category</p>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-1 border rounded-md border-slate-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="image">Upload Image</label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => setImageUrl(e.target.files[0])}
                />
              </div>
              <div className="flex justify-center gap-2 mt-2">
                <button
                  className="px-2 py-1 text-white bg-blue-500 rounded-lg"
                  type="submit"
                >
                  Update
                </button>
                <button
                  className="px-2 py-2 text-white bg-red-500 rounded-lg "
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>

      {/* Modal for create */}
      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <Box sx={style}>
          <HighlightOffOutlinedIcon
            className="absolute cursor-pointer top-2 right-2"
            onClick={() => setOpenCreate(false)}
          />
          <form className="flex flex-col gap-2" onSubmit={createCategory}>
            <h1 className="text-xl font-bold">Create Category</h1>
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-1 border rounded-md border-slate-400"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="image">Image</label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={(e) => setImageUrl(e.target.files[0])}
              />
            </div>
            <div className="flex justify-center gap-2 mt-2">
              <button
                className="px-2 py-1 text-white bg-blue-500 rounded-lg "
                type="submit"
              >
                Create
              </button>
              <button
                className="px-2 py-1 text-white bg-red-500 rounded-lg"
                onClick={() => setOpenCreate(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </Box>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCancel}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {categoryToDelete?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteCategory} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
