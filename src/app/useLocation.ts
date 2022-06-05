import { useQuery } from "react-query";
import axios from "axios";
import { LocationType } from "app/types";

const instance = axios.create({
  baseURL: "https://ip-location-proxy.herokuapp.com/",
  timeout: 3000,
});

const fields = [
  "status",
  "message",
  "continent",
  "country",
  "countryCode",
  "regionName",
  "city",
  "district",
  "zip",
  "lat",
  "lon",
  "org",
  "query",
  "as",
];

const getLocation = async (address: string) => {
  try {
    const { data } = await instance.get(address, { params: { fields } });
    return { ...data, status: data.status === "success" };
  } catch (error) {
    return { status: false, message: "Something went wrong" };
  }
};

const useLocation = (address: string, enabled = true) =>
  useQuery<LocationType>(
    ["location", address, enabled],
    () => getLocation(address),
    {
      enabled,
      retry: false,
    }
  );

export default useLocation;
