import { useState } from "react"
import Link from "next/link"
import Head from "next/head"
import { Box, HStack, Spacer, Text, Tag } from "@chakra-ui/react"
import { FiBell, FiGrid, FiRefreshCw, FiSettings } from "react-icons/fi"
import { useRouter } from "next/router"

const Options = [
  ["Home", <FiGrid key="grid" />, "/"],
  ["Posts", <FiBell key="bell" />, "/posts"],
  ["Schedule", <FiRefreshCw key="refresh" />, "/schedule"],
  ["Settings", <FiSettings key="settings" />, "/settings"],
]

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(0)
  const { pathname } = useRouter()

  return (
    <Box>
      <Head>
        <title>{Options[activeTab][0]}</title>
      </Head>
      <Text fontSize="sm" color="gray.400" fontWeight="semibold" pb={2}>
        GENERAL
      </Text>

      {Options.map(([label, icon, path, extra], idx) => {
        const active = pathname === path

        return (
          <Link key={idx} href={`${path}`}>
            <HStack
              p={2}
              cursor="pointer"
              userSelect="none"
              transition="all 0.25s"
              onClick={() => setActiveTab(idx)}
              rounded="lg"
              fontWeight="semibold"
              color={active ? "orange.600" : "gray.400"}
              bg={active ? "orange.100" : "transparent"}
            >
              <Box>{icon}</Box>
              <Text>{label}</Text>
              <Spacer />
              {extra && <Tag colorScheme={"orange"}>{extra}</Tag>}
            </HStack>
          </Link>
        )
      })}
    </Box>
  )
}

export default Sidebar
