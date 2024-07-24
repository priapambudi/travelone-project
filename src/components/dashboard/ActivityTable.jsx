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
import { getActivity } from "../../redux/features/activitySlice";
import { getCategory } from "../../redux/features/categorySlice";
import formatToRupiah from "../../format_rupiah/rupiah";

export default function ActivityTable() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { activity } = useSelector((state) => state?.activityReducer);
  const { category } = useSelector((state) => state?.categoryReducer);

  const columns = () => [
    { field: "title", headerName: "Title", width: 140 },
    { field: "description", headerName: "Description", width: 140 },
    {
      field: "imageUrls",
      headerName: "Image",
      sortable: false,
      width: 60,
      renderCell: (params) => (
        <div className="flex items-center h-full">
          <img src={params.value} alt="image" className="w-8 h-8 " />
        </div>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: 100,
      renderCell: (params) => (
        <div className="flex items-center h-full">
          {formatToRupiah(params.value)}
        </div>
      ),
    },

    {
      field: "city",
      headerName: "City",
      width: 100,
    },
    {
      field: "view",
      headerName: "View",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <div className="flex items-center h-full">
          <ViewBtn id={params.row.id} type="activity" />
        </div>
      ),
    },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center h-full gap-5">
          <EditBtn
            editAction={editActivity}
            modalTitle="Activity"
            formFields={[
              { name: "categoryId", label: "Category Name", type: "select" },
              { name: "title", label: "Title", type: "text" },
              { name: "description", label: "Description", type: "text" },
              { name: "imageUrls", label: "Image", type: "file" },
              { name: "price", label: "Price", type: "number" },
              {
                name: "price_discount",
                label: "Price Discount",
                type: "number",
              },
              { name: "rating", label: "Rating", type: "number" },
              { name: "total_reviews", label: "Total Reviews", type: "number" },
              { name: "facilities", label: "Facilities", type: "text" },
              { name: "address", label: "Address", type: "text" },
              { name: "province", label: "Province", type: "text" },
              { name: "city", label: "City", type: "text" },
              { name: "location_maps", label: "Location Maps", type: "text" },
            ]}
            initialData={params.row}
            refreshTable={() => dispatch(getActivity())}
            categories={category}
          />
          <DeleteBtn
            deleteAction={deleteActivity}
            item={params.row}
            itemNameKey="title"
            refreshTable={() => dispatch(getActivity())}
          />
        </div>
      ),
    },
  ];

  const createActivity = async (payload) => {
    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-activity",
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

  const editActivity = async (updateData) => {
    return await axios.post(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-activity/${updateData.id}`,
      updateData,
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const deleteActivity = async (data) => {
    await axios.delete(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-activity/${data.id}`,
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategory());
  }, []);

  return (
    <div className="w-full p-5 h-5/6">
      <div className="flex items-center justify-between">
        <h1 className="mb-2 text-2xl font-bold">Activity</h1>

        <CreateBtn
          createAction={createActivity}
          refreshTable={() => dispatch(getActivity())}
          modalTitle="Activity"
          formFields={[
            { name: "categoryId", label: "Category Name", type: "select" },
            { name: "title", label: "Title", type: "text" },
            { name: "description", label: "Description", type: "text" },
            { name: "imageUrls", label: "Image", type: "file", multiple: true },
            { name: "price", label: "Price", type: "number" },
            { name: "price_discount", label: "Price Discount", type: "number" },
            { name: "rating", label: "Rating", type: "number" },
            { name: "total_reviews", label: "Total Reviews", type: "number" },
            { name: "facilities", label: "Facilities", type: "text" },
            { name: "address", label: "Address", type: "text" },
            { name: "province", label: "Province", type: "text" },
            { name: "city", label: "City", type: "text" },
            {
              name: "location_maps",
              label: "Location Maps (iframe)",
              type: "text",
            },
          ]}
          categories={category}
        />
      </div>
      <TableSection rows={activity} columns={columns()} />

      <ToastContainer />
    </div>
  );
}
