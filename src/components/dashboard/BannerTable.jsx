import axios from "axios";
import { useEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TableSection from "../../basic_components/TableSection";
import CreateBtn from "../../basic_components/CreateBtn";
import DeleteBtn from "../../basic_components/DeleteBtn";
import EditBtn from "../../basic_components/EditBtn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function BannerTable() {
  const token = localStorage.getItem("token");
  const [banner, setBanner] = useState([]);

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
          <EditBtn
            editAction={editBanner}
            modalTitle="Banner"
            formFields={bannerFormFields}
            initialData={params.row}
            refreshTable={getBanner}
          />
          <DeleteBtn
            deleteAction={deleteBanner}
            item={params.row}
            itemNameKey="name"
            refreshTable={getBanner}
          />
        </div>
      ),
    },
  ];

  const getBanner = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setBanner(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createBanner = async (payload, token) => {
    return await axios.post(
      "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner",
      payload,
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const editBanner = async (updatedData) => {
    return await axios.post(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-banner/${updatedData.id}`,
      updatedData,
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const deleteBanner = async (item, token) => {
    await axios.delete(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-banner/${item.id}`,
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const bannerFormFields = [
    { name: "name", label: "Name", type: "text" },
    { name: "image", label: "Image", type: "file" },
  ];

  useEffect(() => {
    getBanner();
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
        <CreateBtn
          createAction={createBanner}
          getItems={getBanner}
          modalTitle="Banner"
          formFields={bannerFormFields}
        />
      </div>
      <TableSection rows={banner} columns={columns()} />

      <ToastContainer />
    </div>
  );
}
