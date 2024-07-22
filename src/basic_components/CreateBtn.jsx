import { useEffect, useState } from "react";
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
  refreshTable,
  modalTitle,
  formFields,
}) {
  const token = localStorage.getItem("token");
  const [openCreate, setOpenCreate] = useState(false);
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]); // new state for categories

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setCategories(res.data.data);
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const fieldType = formFields.find((field) => field.name === name).type;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]:
        fieldType === "file"
          ? files
          : fieldType === "number"
          ? parseFloat(value)
          : value,
    }));
  };

  const handleUploadFiles = async (files) => {
    const uploadedUrls = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append("image", file);

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
        uploadedUrls.push(res.data.url);
      } catch (error) {
        // console.log(error);
        toast.error("Image upload failed. Please try again.");
        return null;
      }
    }
    return uploadedUrls;
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData };

    if (formFields.some((field) => field.type === "file")) {
      const files = formData.imageUrls || formData.imageUrl;
      if (files && files.length) {
        const uploadedImageUrls = await handleUploadFiles(files);
        if (!uploadedImageUrls) return;

        if (formData.imageUrls) {
          dataToSubmit.imageUrls = uploadedImageUrls;
        } else {
          dataToSubmit.imageUrl = uploadedImageUrls[0]; // Assume only one image for category
        }
      }
    }

    try {
      const res = await createAction(dataToSubmit);

      if (res.status === 200 || res.status === 201) {
        toast.success(`${modalTitle} created successfully`);
        setOpenCreate(false); // Close the modal
        refreshTable(); // Refresh the table
      } else {
        toast.error(`${modalTitle} creation failed. Please try again.`);
      }
    } catch (error) {
      // console.log(error);
      toast.error(`${modalTitle} creation failed. Please try again.`);
    }
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
            <div
              className={
                formFields.length > 2
                  ? "grid grid-cols-2 gap-2"
                  : "flex flex-col gap-2"
              }
            >
              {formFields.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.type === "file" ? (
                    <input
                      type="file"
                      name={field.name}
                      id={field.name}
                      multiple={field.multiple || false}
                      onChange={handleChange}
                    />
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      id={field.name}
                      onChange={handleChange}
                      className="w-full p-1 border rounded-md border-slate-400"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
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
    </div>
  );
}
