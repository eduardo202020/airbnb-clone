"use client";

import Container from "../Container";

import { GiCook } from "react-icons/gi";
import { FaFish, FaTools } from "react-icons/fa";
import { TiCamera, TiShoppingCart } from "react-icons/ti";
import { GiHealthNormal } from "react-icons/gi";

import { GiClothes } from "react-icons/gi";
import { AiFillCar } from "react-icons/ai";

import { BiStore } from "react-icons/bi";

import { SiCounterstrike, SiTiktok } from "react-icons/si";
import { CgToolbox } from "react-icons/cg";
import { SlGraduation } from "react-icons/sl";
import { VscJersey, VscSaveAs, VscSymbolColor } from "react-icons/vsc";

import { MdCleaningServices } from "react-icons/md";

import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

type Props = {};

export const categories = [
  {
    label: "Ropa",
    icon: GiClothes,
    description: "This property is close to the beach!",
  },
  {
    label: "Pesca",
    icon: FaFish,
    description: "This property is has windmills!",
  },
  {
    label: "Mecanica",
    icon: FaTools,
    description: "This property is modern!",
  },
  {
    label: "Salud",
    icon: GiHealthNormal,
    description: "This property is in the countryside!",
  },
  {
    label: "Cocina",
    icon: GiCook,
    description: "This is property has a beautiful pool!",
  },
  {
    label: "Limipieza",
    icon: MdCleaningServices,
    description: "This property is on an island!",
  },
  {
    label: "Tienda",
    icon: BiStore,
    description: "This property is near a lake!",
  },
  {
    label: "Conducción",
    icon: AiFillCar,
    description: "This property has skiing activies!",
  },
  {
    label: "Social",
    icon: SiTiktok,
    description: "This property is an ancient castle!",
  },
  {
    label: "Enseñanza",
    icon: SlGraduation,
    description: "This property is in a spooky cave!",
  },
  {
    label: "Seguridad",
    icon: SiCounterstrike,
    description: "This property offers camping activities!",
  },
  {
    label: "Ventas",
    icon: TiShoppingCart,
    description: "This property is in arctic environment!",
  },
  {
    label: "Filmacion",
    icon: TiCamera,
    description: "This property is in the desert!",
  },
  {
    label: "Arte",
    icon: VscSymbolColor,
    description: "This property is in a barn!",
  },
  {
    label: "Oficina",
    icon: CgToolbox,
    description: "This property is brand new and luxurious!",
  },
];

const Categories = (props: Props) => {
  const params = useSearchParams();
  const pathname = usePathname();

  const category = params?.get("category");
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
        pt-4 flex items-center justify-between overflow-x-auto no-scrollbar pb-2
      "
      >
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
