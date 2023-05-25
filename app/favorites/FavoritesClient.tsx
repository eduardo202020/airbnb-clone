import { Listing, User } from "@prisma/client";
import Heading from "../components/Heading";
import Container from "../components/Container";
import ListingCard from "../components/listings/ListingCard";

type Props = {
  listings: Listing[];
  currentUser?: User | null;
};

const FavoritesClient = ({ listings, currentUser }: Props) => {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />
      <div className="mt-10 grid grid-col-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingCard
            data={listing}
            currentUser={currentUser}
            key={listing.id}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
