"use client";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { Range } from "react-date-range";
import Calendar from "../inputs/Calendar";
import Button from "../Button";
import { User } from "@prisma/client";

import { AiTwotonePhone } from "react-icons/ai";

type Props = {
  user: User;
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
};

const ListingReservation = ({
  user,
  dateRange,
  disabled,
  disabledDates,
  onChangeDate,
  onSubmit,
  price,
  totalPrice,
}: Props) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="flex flex-row text-2xl font-semibold">
          <AiTwotonePhone color="#5271FF" size={25} />
          <p className="mx-2"> {price} </p>
        </div>
        <div className="font-light text-neutral-600">contacto</div>
      </div>
      <hr />
      {/* <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      /> */}
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Escribir" onClick={onSubmit} />
        <FloatingWhatsApp
          phoneNumber={"+51" + price.toString()}
          accountName={user.name || ""}
          chatMessage="Hola, escribeme si tienes alguna duda"
          statusMessage="Normalmente responde en una hora"
          avatar={user.image || ""}
        />
      </div>
    </div>
  );
};

export default ListingReservation;
