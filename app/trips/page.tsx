import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

type Props = {};

const page = async (props: Props) => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }

  const reservations = await getReservations({
    userId: currentUser?.id,
  });

  if (reservations.length === 0) {
    <EmptyState
      title="No trips found"
      subtitle="Looks like you havent reserved any trips."
    />;
  }

  return <TripsClient reservations={reservations} currentUser={currentUser} />;
};

export default page;
