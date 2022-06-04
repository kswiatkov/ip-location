import { HStack, Image, Text } from "@chakra-ui/react";
import { LocationType } from "app/types";

const LocationDetails: React.FC<LocationType> = ({
  city,
  query,
  regionName,
  country,
  continent,
  lat,
  lon,
  countryCode,
  isp,
}) => (
  <>
    <Text>{query}</Text>
    <Text>{isp}</Text>
    <Text>{city}</Text>
    <Text>{regionName}</Text>
    <HStack>
      <Image
        w={4}
        src={`https://assets.ipstack.com/flags/${countryCode.toLowerCase()}.svg`}
      />
      <Text>{country}</Text>
    </HStack>
    <Text>{continent}</Text>
    <Text>lat: {lat.toFixed(4)}</Text>
    <Text>lon: {lon.toFixed(4)}</Text>
  </>
);

export default LocationDetails;
