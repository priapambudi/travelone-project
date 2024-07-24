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
import { getPromo } from "../../redux/features/promoSlice";
import formatToRupiah from "../../format_rupiah/rupiah";

export default function PromoTable() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const { promo } = useSelector((state) => state?.promoReducer);

  const columns = () => [
    // { field: "id", headerName: "ID", width: 70 },
    { field: "title", headerName: "Title", width: 130 },
    { field: "description", headerName: "Description", width: 130 },
    {
      field: "imageUrl",
      headerName: "Image",
      sortable: false,
      width: 80,
      renderCell: (params) => (
        <div className="flex items-center h-full">
          <img src={params.value} alt="image" className="w-8 h-8 " />
        </div>
      ),
    },
    {
      field: "promo_discount_price",
      headerName: "Discount Price",
      width: 110,
      renderCell: (params) => formatToRupiah(params.value),
    },
    {
      field: "minimum_claim_price",
      headerName: "Min. Claim Price",
      width: 120,
      renderCell: (params) => formatToRupiah(params.value),
    },
    {
      field: "view",
      headerName: "View",
      sortable: false,
      width: 100,
      renderCell: (params) => (
        <div className="flex items-center h-full">
          <ViewBtn id={params.row.id} type="promo" />
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
            editAction={editPromo}
            modalTitle="Promo"
            formFields={[
              { name: "title", label: "Title", type: "text" },
              { name: "description", label: "Description", type: "text" },
              { name: "imageUrl", label: "Image", type: "file" },
              { name: "terms_condition", label: "T&C", type: "text" },
              { name: "promo_code", label: "Code", type: "text" },
              {
                name: "promo_discount_price",
                label: "Discount Price",
                type: "number",
              },
              {
                name: "minimum_claim_price",
                label: "Min. Claim Price",
                type: "number",
              },
            ]}
            initialData={params.row}
            refreshTable={() => dispatch(getPromo())}
          />
          <DeleteBtn
            deleteAction={deletePromo}
            item={params.row}
            itemNameKey="title"
            refreshTable={() => dispatch(getPromo())}
          />
        </div>
      ),
    },
  ];

  const createPromo = async (payload) => {
    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-promo",
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

  const editPromo = async (updatedData) => {
    return await axios.post(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-promo/${updatedData.id}`,
      updatedData,
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const deletePromo = async (item) => {
    return await axios.delete(
      `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-promo/${item.id}`,
      {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  useEffect(() => {
    dispatch(getPromo());
  }, [dispatch]);

  return (
    <div className="w-full p-5 h-5/6">
      <div className="flex items-center justify-between">
        <h1 className="mb-2 text-2xl font-bold">Promo</h1>

        <CreateBtn
          createAction={createPromo}
          refreshTable={() => dispatch(getPromo())}
          modalTitle="Promo"
          formFields={[
            { name: "title", label: "Title", type: "text" },
            { name: "description", label: "Description", type: "text" },
            { name: "imageUrl", label: "Image", type: "file" },
            { name: "terms_condition", label: "T&C", type: "text" },
            { name: "promo_code", label: "Code", type: "text" },
            {
              name: "promo_discount_price",
              label: "Discount Price",
              type: "number",
            },
            {
              name: "minimum_claim_price",
              label: "Min. Claim Price",
              type: "number",
            },
          ]}
        />
      </div>
      <TableSection rows={promo} columns={columns()} />

      <ToastContainer />
    </div>
  );
}
