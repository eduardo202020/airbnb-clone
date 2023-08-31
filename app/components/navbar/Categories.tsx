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
    description: "Venta de todo tipo de ropa",
  },
  {
    label: "Pesca",
    icon: FaFish,
    description: "Trabajo de pesca artesanal e industrial",
  },
  {
    label: "Mecanica",
    icon: FaTools,
    description: "Mecánica de todo tipo de vehículos",
  },
  {
    label: "Salud",
    icon: GiHealthNormal,
    description: "Todo lo relacionado con la salud de las personas y animales",
  },
  {
    label: "Cocina",
    icon: GiCook,
    description: "Gastronomía y todos sus relacionados",
  },
  {
    label: "Limipieza",
    icon: MdCleaningServices,
    description: "Servicio de limpieza y todo lo relacionado",
  },
  {
    label: "Tienda",
    icon: BiStore,
    description: "Atención en tiendas para ventas",
  },
  {
    label: "Conducción",
    icon: AiFillCar,
    description:
      "Servicion de transporte para todo tipo de productos y/o servicios",
  },
  {
    label: "Social",
    icon: SiTiktok,
    description: "Publicidad y Marketing",
  },
  {
    label: "Enseñanza",
    icon: SlGraduation,
    description: "Servicio de docencia en todos sus niveles",
  },
  {
    label: "Seguridad",
    icon: SiCounterstrike,
    description: "Servicio de seguridad en todo momento",
  },
  {
    label: "Ventas",
    icon: TiShoppingCart,
    description: "Especialidad en todo tipo de ventas",
  },
  {
    label: "Filmacion",
    icon: TiCamera,
    description: "Producción y edición de grabaciones de todo tipo de eventos",
  },
  {
    label: "Arte",
    icon: VscSymbolColor,
    description: "Todo tipo de forma de arte",
  },
  {
    label: "Oficina",
    icon: CgToolbox,
    description: "Servicio en oficina ",
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
