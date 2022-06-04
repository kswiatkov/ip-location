import React from "react";
import { Box, Flex, theme, Heading, Stack } from "@chakra-ui/react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LocationType } from "app/types";
import LocationDetails from "components/LocationDetails";

interface LocationProps {
  location: LocationType;
  header: string;
}

const Location: React.FC<LocationProps> = ({ header, location }) => (
  <Stack
    spacing={5}
    direction={["column-reverse", "column-reverse", "row"]}
    my={5}
  >
    <MapContainer
      center={[location.lat, location.lon]}
      zoom={13}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[location.lat, location.lon]}></Marker>
    </MapContainer>
    <Box minW={250} rounded={"md"} bg={theme.colors.gray[100]}>
      <Flex minW={100} direction="column" fontSize="lg" m={3}>
        <Heading mb={2} size="lg">
          {header}
        </Heading>
        <LocationDetails {...location} />
      </Flex>
    </Box>
  </Stack>
);

export default Location;
