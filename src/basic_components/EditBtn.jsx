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

export default function EditBtn({
  editAction,
  modalTitle,
  formFields,
  initialData,
  refreshTable,
}) {
  const token = localStorage.getItem("token");
  const [openEdit, setOpenEdit] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFileURLs, setSelectedFileURLs] = useState([]);
  const [categories, setCategories] = useState([]);

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

    setFormData({
      ...formData,
      [name]:
        fieldType === "file"
          ? files
          : fieldType === "number"
          ? parseFloat(value)
          : value,
    });

    if (fieldType === "file") {
      const fileURLs = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setSelectedFiles(files);
      setSelectedFileURLs(fileURLs);
    }
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
        toast.error("Image upload failed. Please try again.");
        return null;
      }
    }

    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
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
      await editAction(dataToSubmit);
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

          <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
            <h1 className="text-lg font-bold ">Edit {modalTitle}</h1>
            <div
              className={
                formFields.length > 7
                  ? "grid grid-cols-4 gap-2"
                  : formFields.length > 2
                  ? "grid grid-cols-3 gap-2"
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
                      value={formData[field.name] || ""}
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

            <hr />
            {/* Image preview */}
            <p>Preview Images</p>
            {selectedFileURLs.length > 0 ? (
              <div className="flex gap-3">
                {selectedFileURLs.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Selected ${index}`}
                    className="object-cover w-20 h-20"
                  />
                ))}
              </div>
            ) : (
              formData.imageUrls && (
                <div className="flex gap-3">
                  {formData.imageUrls.map((url, index) => (
                    <img
                      key={index}
                      src={url}
                      alt={`Existing ${index}`}
                      className="object-cover w-20 h-20"
                    />
                  ))}
                </div>
              )
            )}

            <div className="flex justify-center gap-2 mt-2">
              <button
                className="px-2 py-1 text-white bg-blue-500 rounded-lg"
                type="submit"
              >
                Update
              </button>
              <button
                className="px-2 py-2 text-white bg-red-500 rounded-lg"
                onClick={() => setOpenEdit(false)}
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
