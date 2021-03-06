import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Flex,
  HStack,
  Input,
  useToast,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Box,
} from "@chakra-ui/react";

import useLocation from "app/useLocation";
import { LocationType } from "app/types";
import { validateSearchInput } from "app/validation";

import Location from "components/Location";
import SearchHistory from "components/SearchHistory";

export const App = () => {
  const toast = useToast();
  const [searchHistory, setSearchHistory] = useState<LocationType[]>([]);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<{ searchInput: string }>({
    reValidateMode: "onSubmit",
  });
  const onSubmit = handleSubmit(() => refetch());

  const { data: clientLocationData, isLoading: isClientLocationLoading } =
    useLocation("");
  const {
    data: locationData,
    refetch,
    isLoading: isLocationLoading,
  } = useLocation(getValues("searchInput"), false);

  useEffect(() => {
    // toast notification with server error
    if (!locationData?.status && locationData?.message) {
      toast({ description: locationData.message, status: "error" });
    } else if (locationData) {
      // adding new results to history and removing old one if it duplicates
      setSearchHistory((prev) => [
        locationData,
        ...prev.filter(({ querySend }) => querySend !== locationData.querySend),
      ]);
    }
  }, [locationData, toast]);

  return (
    <Flex h="100vh">
      {!!searchHistory.length && <SearchHistory historyList={searchHistory} />}
      <Flex
        mt={{ base: 50, xl: 0 }}
        marginX="auto"
        direction="column"
        alignItems="center"
        justifyContent={{ base: "flex-start", xl: "center" }}
      >
        {(clientLocationData?.status || isClientLocationLoading) && (
          <Location
            isLoading={isClientLocationLoading}
            header="Your location"
            location={clientLocationData}
          />
        )}
        <Box w="100%">
          <form onSubmit={onSubmit}>
            <FormControl isInvalid={!!errors.searchInput}>
              <FormLabel>Search for location of any IP address:</FormLabel>
              <HStack>
                <Input
                  id="searchInput"
                  isInvalid={!!errors.searchInput?.type}
                  {...register("searchInput", {
                    required: true,
                    validate: validateSearchInput,
                  })}
                  placeholder="IP Address or domain name"
                  mr={3}
                  maxW={800}
                />
                <Button px={5} isLoading={isSubmitting} type="submit">
                  Search
                </Button>
              </HStack>
              <FormErrorMessage>
                {errors.searchInput && errors.searchInput.message}
              </FormErrorMessage>
            </FormControl>
          </form>
          {(locationData?.status || isLocationLoading) && (
            <Location
              header="Search result"
              location={locationData}
              isLoading={isLocationLoading}
            />
          )}
        </Box>
      </Flex>
    </Flex>
  );
};
