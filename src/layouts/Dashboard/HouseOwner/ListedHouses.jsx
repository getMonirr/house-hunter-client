import { Button } from "@mui/material";
import ListedHouseTable from "../../../components/ListedHouseTable/ListedHouseTable";
import SectionHeading from "../../../components/shared/SectionHeading";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Link } from "react-router-dom";
import useSecureAxios from "../../../hooks/useSecureAxios";
import useAuth from "../../../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Swal from "sweetalert2";

const ListedHouses = () => {
  const { secureAxios } = useSecureAxios();
  const { user } = useAuth();

  // query client
  const queryClient = useQueryClient();

  // load house information
  const { data: listedHouses, refetch } = useQuery({
    queryKey: ["listedHouses", user?.email],
    queryFn: () =>
      secureAxios.get(`/houses/${user?.email}`).then((res) => res.data),
  });

  // delete a house
  const deleteHouseMutation = useMutation({
    mutationFn: (id) => secureAxios.delete(`/houses/${id}`),
    onSuccess: (data) => {
      console.log(data?.data?.deletedCount);
      if (data?.data?.deletedCount > 0) {
        Swal.fire("Deleted!", "Your house has been deleted.", "success");
        queryClient.invalidateQueries(["listedHouses", user?.email]);
      }
    },
  });


  // handle delete a house
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteHouseMutation.mutate(id);
      }
    });
  };

  return (
    <div>
      <SectionHeading>All Listed Houses</SectionHeading>
      <div className="text-center lg:text-end mb-4">
        <Link to="/dashboard/add-new-house">
          <Button variant="contained" startIcon={<AddCircleIcon />}>
            Add New House
          </Button>
        </Link>
      </div>
      <ListedHouseTable
        handleDelete={handleDelete}
        listedHouses={listedHouses}
        refetch={refetch}
      />
    </div>
  );
};

export default ListedHouses;
