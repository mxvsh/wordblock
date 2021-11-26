import { Spacer } from "@chakra-ui/react"
import { Box, Flex, Heading, Text } from "@chakra-ui/layout"

type Props = {
  icon: React.ReactElement
  title: string
  description: string
  extras?: React.ReactElement
}

const Card: React.FC<Props> = ({
  title,
  description,
  icon,
  extras,
  children,
}) => {
  return (
    <Box>
      <Flex alignItems="center">
        <Box
          p={3}
          fontSize="xl"
          bg="green.100"
          textColor="green.500"
          rounded="lg"
        >
          {icon}
        </Box>
        <Box ml={2}>
          <Heading size="sm" fontWeight="semibold">
            {title}
          </Heading>
          <Text color="gray.400">{description}</Text>
        </Box>
        <Spacer />
        {extras}
      </Flex>
      <Box mt={4}>{children}</Box>
    </Box>
  )
}

export default Card
