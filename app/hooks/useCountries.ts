import { distritos } from "@/distritos";
// import countries from "world-countries";

// const formattedCountries = distritos.map((country) => ({
//   value: country.cca2,
//   label: country.name.common,
//   flag: country.flag,
//   latlng: country.latlng,
//   region: country.region,
// }));

const useCountries = () => {
  // const getAll = () => formattedCountries;

  const getByValue = (label: string) => {
    return distritos.find((item) => item.value === label);
  };

  return {
    // getAll,
    getByValue,
  };
};

export default useCountries;
