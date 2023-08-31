"use client";

import { formatISO } from "date-fns";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";

import Modal from "./Modal";
import Heading from "../Heading";

import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

import useSearchModal from "@/app/hooks/useSearchModal";

type Props = {};

enum STEPS {
  LOCATION = 0,
  // DATE = 1,
  // INFO = 1,
}

const SearchModal = (props: Props) => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    // if (step === STEPS.LOCATION) {
    //   return onNext();
    // }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",

        query: updatedQuery,
      },
      {
        skipNull: true,
      }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    params,
    roomCount,
    router,
    searchModal,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyConteny = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find your perfect location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  // if (step === STEPS.DATE) {
  //   bodyConteny = (
  //     <div className="flex flex-col gap-8 ">
  //       <Heading
  //         title="When do you plan to go"
  //         subtitle="Make sure everyone is free!"
  //       />

  //       <Calendar
  //         onChange={(value) => setDateRange(value.selection)}
  //         value={dateRange}
  //       />
  //     </div>
  //   );
  // }

  // if (step === STEPS.INFO) {
  //   bodyConteny = (
  //     <div className="flex flex-col gap-8">
  //       <Heading title="More information" subtitle="Find your perfect place!" />
  //       <Counter
  //         title="Guests"
  //         subtitle="How many guests are coming?"
  //         value={guestCount}
  //         onChange={(value) => setGuestCount(value)}
  //       />
  //       <Counter
  //         title="Room"
  //         subtitle="How many rooms do you need?"
  //         value={roomCount}
  //         onChange={(value) => setRoomCount(value)}
  //       />
  //       <Counter
  //         title="Bathroom"
  //         subtitle="How many bathrooms do you need?"
  //         value={bathroomCount}
  //         onChange={(value) => setBathroomCount(value)}
  //       />
  //     </div>
  //   );
  // }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyConteny}
    />
  );
};

export default SearchModal;
