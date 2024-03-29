"use client";

import { differenceInDays } from "date-fns";
import { useMemo } from "react";

import { BiSearch } from "react-icons/bi";

import useSearchModal from "@/app/hooks/useSearchModal";
import { useSearchParams } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";

type Props = {};

const Search = (props: Props) => {
  const searchModal = useSearchModal();

  const params = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return "Elija un lugar";
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start) + 1;
      if (diff === 0) {
        diff = 1;
      }
      return `${diff} Days`;
    }
    return "Cualquier Fecha";
  }, [endDate, startDate]);

  const guestsLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }
    return "Add Guests";
  }, [guestCount]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="
    border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer
  "
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        {/* <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {durationLabel}
        </div> */}
        <div className="p-2 mr-4 bg-[#5271FF]  rounded-full text-white ">
          <BiSearch size={18} />
        </div>
      </div>
    </div>
  );
};

export default Search;
