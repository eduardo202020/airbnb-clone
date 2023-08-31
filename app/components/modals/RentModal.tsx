"use client";

import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";

import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect from "../inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { CulqiProvider, useCheckout, UseCulqiPropsV4 } from "react-culqi-next";

type Props = {};

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  // INFO = 2,
  IMAGES = 2,
  DESCRIPTION = 3,
  PRICE = 4,
  FIN = 5,
}
const RentModal = (props: Props) => {
  const rentModal = useRentModal();
  const router = useRouter();

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 9,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  // funcion submit

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.FIN) {
      return onNext();
    }

    setIsLoading(true);

    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.FIN) {
      return "Crear";
    }

    return "Siguiente";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Atrás";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-6">
      <Heading
        title="Cuál de estos describe mejor tu anuncio?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map(({ label, icon }) => (
          <div key={label} className="col-span-1">
            <CategoryInput
              onClick={(category) => {
                setCustomValue("category", category);
              }}
              selected={category === label}
              label={label}
              icon={icon}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Dónde está tu anuncio?"
          subtitle="Ayudanos a encontrarte"
        />
        <CountrySelect
          value={location}
          onChange={(value) => setCustomValue("location", value)}
        />

        <Map center={location?.latlng} />
      </div>
    );
  }

  // if (step === STEPS.INFO) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Comparte un número de contacto"
  //         subtitle="A dónde deben comunicarse?"
  //       />

  //       <Input
  //         id="guestCount"
  //         label="Contacto"
  //         disabled={isLoading}
  //         register={register}
  //         errors={errors}
  //         required
  //       />

  //       {/* <hr />
  //       <Counter
  //         title="Rooms"
  //         subtitle="How many rooms do you have?
  //       "
  //         value={roomCount}
  //         onChange={(value) => setCustomValue("roomCount", value)}
  //       />
  //       <hr />
  //       <Counter
  //         title="Bathrooms"
  //         subtitle="How many bathrooms do you have?
  //       "
  //         value={bathroomCount}
  //         onChange={(value) => setCustomValue("bathroomCount", value)}
  //       /> */}
  //     </div>
  //   );
  // }

  const MyButton = () => {
    const [amount, setAmount] = useState(10000);
    const [title, setTitle] = useState("White T-shirt");

    const { openCulqi, token, error } = useCheckout({
      settings: {
        title: title,
        currency: "PEN",
        amount: amount,
        //optional
        options: {
          lang: "auto",
          installments: false,
          paymentMethods: {
            tarjeta: false,
            yape: true,
          },
          style: {
            logo: "",
            bannerColor: "",
            buttonBackground: "",
            buttonText: "",
            buttonTextColor: "",
            linksColor: "",
            menuColor: "",
            priceColor: "",
          },
        },
      },
      onClose: () => {
        console.log("Handle the closing of the modal");
        console.log({ globalThis });
        // globalThis.Culqi.onclose();
      },
      onToken: (token) => {
        console.log("Send your token to the backend", token);
        // handleSubmit(onSubmit);
        // router.push("/");

        // globalThis.Culqi.

        // Culqi.close();
      },
      onError: (error) => {
        console.log("handle the errors", error);
      },
    });

    return (
      <>
        {/* <button onClick={openCulqi}>Pay now</button> */}
        {openCulqi()}
      </>
    );
  };

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="Agrega una foto de tu anuncio"
          subtitle="Muestra una imagen del lugar"
        />
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Como describirías tu anuncio?"
          subtitle="Un título y una descripción"
        />
        <Input
          id="title"
          label="Titulo"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Descripción"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Ahora, Un número de contacto"
          subtitle="Por dónde quieres que te contacten?"
        />
        <Input
          id="price"
          label="Número"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.FIN) {
    bodyContent = (
      <>
        <CulqiProvider publicKey="pk_test_6fHVu257xmONLDas">
          <MyButton />
        </CulqiProvider>
      </>
    );
  }

  return (
    <Modal
      title="Publica tu anuncio!"
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default RentModal;
