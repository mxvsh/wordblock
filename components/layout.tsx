import { Box, Flex } from "@chakra-ui/layout"

import Header from "./header"
import Sidebar from "./sidebar"

const Layout: React.FC = ({ children }) => {
  return (
    <Box h="100vh" overflow="auto" bg="gray.100">
      <Header />

      <Box maxW="3xl" m="0 auto">
        <Flex px={2} alignItems="flex-start" my={2}>
          <Box w="64" bg="white" px={4} py={6} rounded="lg">
            <Sidebar />
          </Box>

          <Box ml={2} w="full" bg="white" px={4} py={6} rounded="lg">
            {children}
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}

export default Layout
