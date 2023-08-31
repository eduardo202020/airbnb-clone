"use client";

import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Avatar from "../Avatar";

import { AiOutlineMenu } from "react-icons/ai";
import MenuItem from "./MenuItem";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";

type Props = {
  currentUser?: User | null;
};

const UserMenu = ({ currentUser }: Props) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const handleToggle = () => {
    setIsOpen((value) => !value);
  };

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 cursor-pointer"
        >
          Publica tu anuncio
        </div>
        <div
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={handleToggle}
        >
          <AiOutlineMenu />
          <div
            className="
            hidden md:block
        "
          >
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <div
                  className="flex flex-row  hover:bg-neutral-100 transition font-semibold py-2"
                  onClick={() => {
                    router.push("/");
                    setIsOpen((value) => !value);
                  }}
                >
                  <div className="pl-4 flex flex-row gap-2 items-center sm:justify-between  w-full">
                    <div className="md:hidden">
                      <Avatar src={currentUser.image} />
                    </div>
                    <p>{currentUser.name?.split(" ").shift()}</p>
                  </div>
                </div>
                <hr />
                {/* <MenuItem
                  onClick={() => {
                    router.push("/trips");
                    setIsOpen((value) => !value);
                  }}
                  label="My trips"
                /> */}
                <MenuItem
                  onClick={() => {
                    router.push("/favorites");
                    setIsOpen((value) => !value);
                  }}
                  label="Mis Favoritos"
                />
                {/* <MenuItem
                  onClick={() => {
                    router.push("/reservations");
                    setIsOpen((value) => !value);
                  }}
                  label="My reservations"
                /> */}
                <MenuItem
                  onClick={() => {
                    router.push("/properties");
                    setIsOpen((value) => !value);
                  }}
                  label="Mis Publicaciones"
                />
                <MenuItem
                  onClick={rentModal.onOpen}
                  label="Publica tu anuncio"
                />
                <hr />
                <MenuItem
                  onClick={() => {
                    signOut();
                    setIsOpen((value) => !value);
                  }}
                  label="Salir"
                />
              </>
            ) : (
              <>
                <MenuItem
                  onClick={() => {
                    loginModal.onOpen();
                    setIsOpen(false);
                  }}
                  label="Login"
                />
                <MenuItem
                  onClick={() => {
                    registerModal.onOpen();
                    setIsOpen(false);
                  }}
                  label="Sign up"
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
