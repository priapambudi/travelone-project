import { useState } from "react";
import axios from "axios";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";

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

export default function EditBtn({
  editAction,
  modalTitle,
  formFields,
  initialData,
  refreshTable,
}) {
  const token = localStorage.getItem("token");
  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState(initialData || {});
  const [selectedFile, setSelectedFile] = useState(null);

  const editBtnOpen = () => {
    setFormData(initialData || {});
    setOpenEdit(true);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = { ...formData };

    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);

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

        updatedData.imageUrl = res.data.url;
      } catch (error) {
        toast.error("Image upload failed. Please try again.");
        return;
      }
    }

    try {
      await editAction(updatedData);
      toast.success(`${modalTitle} updated successfully`);
      setOpenEdit(false);
      refreshTable();
    } catch (error) {
      toast.error(`Failed to update ${modalTitle}. Please try again.`);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpenEdit(true)}
        className="flex items-center h-8 p-2 border-2 border-blue-400 rounded "
      >
        Edit
      </button>

      {/* Modal for update */}
      <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
        <Box sx={style}>
          <HighlightOffOutlinedIcon
            onClick={() => setOpenEdit(false)}
            className="absolute cursor-pointer top-2 right-2"
          />
          <div className="flex gap-3">
            <div>
              {selectedFile ? (
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected Filr"
                  className="object-cover w-full h-full"
                />
              ) : (
                formData.imageUrl && (
                  <img
                    src={formData.imageUrl}
                    alt="Existing"
                    className="object-cover w-full h-full"
                  />
                )
              )}
            </div>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
              <p className="text-lg font-bold ">Edit {modalTitle}</p>
              {formFields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.type === "file" ? (
                    <input
                      type="file"
                      name={field.name}
                      id={field.name}
                      onChange={handleFileChange}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleInputChange}
                      className="w-full p-1 border rounded-md border-slate-400"
                    />
                  )}
                </div>
              ))}

              <div className="flex justify-center gap-2 mt-2">
                <button
                  className="px-2 py-1 text-white bg-blue-500 rounded-lg"
                  type="submit"
                >
                  Update
                </button>
                <button
                  onClick={() => setOpenEdit(false)}
                  className="px-2 py-2 text-white bg-red-500 rounded-lg "
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
