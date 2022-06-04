import { useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  useBreakpointValue,
  theme,
  IconButton,
  Heading,
} from "@chakra-ui/react";
import { LocationType } from "app/types";
import LocationDetails from "components/LocationDetails";

interface SearchHistoryProps {
  historyList: LocationType[];
}

const SearchHistory = ({ historyList }: SearchHistoryProps) => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const isLargeScreen = useBreakpointValue({ base: false, xl: true });

  return isLargeScreen ? (
    <Box overflowY="auto" p={5} w={300} h="100%" bg={theme.colors.gray[100]}>
      <Heading size="lg" mb={5}>
        History
      </Heading>
      {historyList.map((e) => (
        <Box
          key={e.query}
          boxShadow="lg"
          p={[5, 2]}
          mb={4}
          rounded={"md"}
          bg={theme.colors.white}
        >
          <LocationDetails {...e} />
        </Box>
      ))}
    </Box>
  ) : (
    <>
      {!isDrawerOpen && (
        <IconButton
          zIndex={theme.zIndices.sticky}
          bg="white"
          position="fixed"
          left={0}
          top={0}
          m={[4, 5]}
          alignSelf="flex-start"
          aria-label="Open sidebar"
          icon={<HamburgerIcon w={8} h={8} />}
          colorScheme="blackAlpha"
          variant="ghost"
          onClick={() => setDrawerOpen(true)}
        />
      )}
      <Drawer
        isOpen={isDrawerOpen}
        placement="left"
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerOverlay>
          <DrawerContent bg={theme.colors.gray[100]}>
            <DrawerHeader>History</DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody>
              {historyList.map((e) => (
                <Box
                  key={e.query}
                  boxShadow="lg"
                  p={[5, 2]}
                  mb={4}
                  rounded={"md"}
                  bg={theme.colors.white}
                >
                  <LocationDetails {...e} />
                </Box>
              ))}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default SearchHistory;
