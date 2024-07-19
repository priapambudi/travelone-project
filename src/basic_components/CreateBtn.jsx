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

export default function CreateBtn({
  createAction,
  getItems,
  modalTitle,
  formFields,
}) {
  const token = localStorage.getItem("token");
  const [openCreate, setOpenCreate] = useState(false);
  const [formData, setFormData] = useState({});

  const handleUploadCreate = async () => {
    if (!formData.image) return null;

    const formDataObj = new FormData();
    formDataObj.append("image", formData.image);

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
        formDataObj,
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
      // return null;
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const uploadedImageUrl = formData.image ? await handleUploadCreate() : null;

    const payload = {
      ...formData,
      imageUrl: uploadedImageUrl,
    };

    try {
      const res = await createAction(payload, token);

      toast.success(res.data.message || `${modalTitle} created successfully`);
      setOpenCreate(false); // Close the modal
      getItems(); // Refresh the table
    } catch (error) {
      // console.log(error);
      toast.error(`${modalTitle} creation failed. Please try again.`);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const fieldType = formFields.find((field) => field.name === name).type;

    setFormData({
      ...formData,
      [name]:
        fieldType === "file"
          ? files[0]
          : fieldType === "number"
          ? parseFloat(value)
          : value,
    });
  };

  return (
    <div>
      <button
        onClick={() => setOpenCreate(true)}
        className="px-2 mb-2 border-2 border-orange-400 rounded-full hover:bg-orange-400 hover:text-white"
      >
        Create
      </button>

      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <Box sx={style}>
          <HighlightOffOutlinedIcon
            className="absolute cursor-pointer top-2 right-2"
            onClick={() => setOpenCreate(false)}
          />
          <form className="flex flex-col gap-2" onSubmit={handleCreate}>
            <h1 className="text-xl font-bold">Create {modalTitle}</h1>
            {formFields.map((field) => (
              <div key={field.name} className="flex flex-col gap-1">
                <label htmlFor={field.name}>{field.label}</label>
                {field.type === "file" ? (
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    onChange={handleChange}
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="w-full p-1 border rounded-md border-slate-400"
                  />
                )}
              </div>
            ))}

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
    </div>
  );
}
