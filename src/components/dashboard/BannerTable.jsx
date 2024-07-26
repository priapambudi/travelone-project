import axios from "axios";
import { useEffect, useState } from "react";
import TableSection from "../../basic_components/TableSection";
import CreateBtn from "../../basic_components/CreateBtn";
import DeleteBtn from "../../basic_components/DeleteBtn";
import EditBtn from "../../basic_components/EditBtn";
import ViewBtn from "../../basic_components/ViewBtn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getBanner } from "../../redux/features/bannerSlice";

export default function BannerTable() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { banner } = useSelector((state) => state?.bannerReducer);

  const columns = () => [
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
          <ViewBtn id={params.row.id} type="banner" />
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
            editAction={editBanner}
            modalTitle="Banner"
            formFields={[
              { name: "name", label: "Name", type: "text" },
              { name: "imageUrl", label: "Image", type: "file" },
            ]}
            initialData={{ ...params.row, imageUrl: [params.row.imageUrl] }}
            refreshTable={() => dispatch(getBanner())}
          />
          <DeleteBtn
            deleteAction={deleteBanner}
            item={params.row}
            itemNameKey="name"
            refreshTable={() => dispatch(getBanner())}
          />
        </div>
      ),
    },
  ];

  const createBanner = async (payload) => {
    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner",
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

  const deleteBanner = async (item) => {
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

  useEffect(() => {
    dispatch(getBanner());
  }, [dispatch]);

  return (
    <div className="w-full p-5 h-5/6">
      <div className="flex items-center justify-between">
        <h1 className="mb-2 text-2xl font-bold">Banner</h1>
        <CreateBtn
          createAction={createBanner}
          refreshTable={() => dispatch(getBanner())}
          modalTitle="Banner"
          formFields={[
            { name: "name", label: "Name", type: "text" },
            { name: "imageUrl", label: "Image", type: "file" },
          ]}
        />
      </div>
      <TableSection rows={banner} columns={columns()} />

      <ToastContainer />
    </div>
  );
}
