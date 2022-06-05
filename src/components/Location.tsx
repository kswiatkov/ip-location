import React from "react";
import { Flex, theme, Heading, Stack, Skeleton } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { LocationType } from "app/types";
import LocationDetails from "components/LocationDetails";

interface LocationProps {
  location?: LocationType;
  header: string;
  isLoading: boolean;
}

const Location: React.FC<LocationProps> = ({ header, location, isLoading }) => {
  const position: LatLngExpression = [location?.lat ?? 0, location?.lon ?? 0];

  return (
    <Stack
      spacing={5}
      direction={["column-reverse", "column-reverse", "row"]}
      my={5}
    >
      <Skeleton isLoaded={!isLoading}>
        <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}></Marker>
        </MapContainer>
      </Skeleton>
      <Skeleton isLoaded={!isLoading}>
        <Flex
          height="100%"
          minW={250}
          rounded={"md"}
          bg={theme.colors.gray[100]}
          direction="column"
          fontSize="lg"
          p={3}
        >
          {!!location && (
            <>
              <Heading mb={2} size="lg">
                {header}
              </Heading>
              <LocationDetails {...location} />
            </>
          )}
        </Flex>
      </Skeleton>
    </Stack>
  );
};

export default Location;
