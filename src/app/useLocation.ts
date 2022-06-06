import { useQuery } from "react-query";
import axios from "axios";
import { LocationType } from "app/types";

const instance = axios.create({
  baseURL: "https://ip-location-proxy.herokuapp.com/",
  // timeout: 3000 - disabled due to heroku dyno going idle on free plan
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
    return { ...data, status: data.status === "success", querySend: address };
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
    }
  );

export default useLocation;
