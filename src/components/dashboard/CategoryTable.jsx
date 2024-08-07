import axios from "axios";
import { useEffect } from "react";
import TableSection from "../../basic_components/TableSection";
import CreateBtn from "../../basic_components/CreateBtn";
import DeleteBtn from "../../basic_components/DeleteBtn";
import EditBtn from "../../basic_components/EditBtn";
import ViewBtn from "../../basic_components/ViewBtn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../redux/features/categorySlice";

export default function CategoryTable() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { category } = useSelector((state) => state?.categoryReducer);

  const columns = () => [
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
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "updatedAt",
      headerName: "Updated",
      width: 180,
      renderCell: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: "view",
      headerName: "View",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <div className="flex items-center h-full">
          <ViewBtn id={params.row.id} type="category" />
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 200,
      renderCell: (params) => (
        <div className="flex items-center h-full gap-5">
          <EditBtn
            editAction={editCategory}
            modalTitle="Category"
            formFields={[
              { name: "name", label: "Name", type: "text" },
              {
                name: "imageUrl",
                label: "Image",
                type: "file",
              },
            ]}
            initialData={params.row}
            refreshTable={() => dispatch(getCategory())}
          />
          <DeleteBtn
            deleteAction={deleteCategory}
            item={params.row}
            itemNameKey="name"
            refreshTable={() => dispatch(getCategory())}
          />
        </div>
      ),
    },
  ];

  const createCategory = async (payload) => {
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
      return res;
    } catch (error) {
      return error.response;
    }
  };

  const editCategory = async (updateData) => {
    return await axios.post(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-category/${updateData.id}`,
      updateData,
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const deleteCategory = async (item) => {
    await axios.delete(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-category/${item.id}`,
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  return (
    <div className="w-full p-5 h-5/6">
      <div className="flex items-center justify-between">
        <h1 className="mb-2 text-2xl font-bold">Category</h1>

        <CreateBtn
          createAction={createCategory}
          refreshTable={() => dispatch(getCategory())}
          modalTitle="Category"
          formFields={[
            { name: "name", label: "Name", type: "text" },
            { name: "imageUrl", label: "Image", type: "file" },
          ]}
        />
      </div>
      <TableSection rows={category} columns={columns()} />

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
