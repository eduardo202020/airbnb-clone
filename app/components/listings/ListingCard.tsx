"use client";

import { useRouter } from "next/navigation";
import useCountries from "@/app/hooks/useCountries";

import { Listing, Reservation, User } from "@prisma/client";
import React, { useCallback, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";

import { FaMapMarkerAlt } from "react-icons/fa";

type Props = {
  data: Listing;
  currentUser?: User | null;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
};

const ListingCard = ({
  data,
  currentUser,
  reservation,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
}: Props) => {
  const router = useRouter();

  // ya que el objeto data solo contiene la lacation info,
  //  se debe acceder a la lista de paises para obtener la info del pais completo
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }
      onAction?.(actionId);
    },
    [onAction, disabled, actionId]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }
    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="
    col-span-1 cursor-pointer group
  "
    >
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
        aspect-square w-full relative overflow-hidden rounded-xl 
    "
        >
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="flex flex-row  font-semibold text-lg text-neutral-500">
          <FaMapMarkerAlt size={22} color="#5271FF" />
          <p className="ml-2"> {location?.label}</p>
        </div>
        <div className=" text-lg ">
          <p className="font-bold hover:text-[#5271FF] transition-all duration-100 ease-in-out">
            {data.title}
          </p>
        </div>
        <div className="flex flex-row items-center gap-1">
          {/* <div className="font-semibold">$ {price}</div> */}
          {/* {!reservation && <div className="font-light">night</div>} */}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
