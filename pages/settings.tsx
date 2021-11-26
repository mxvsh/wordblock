import { useEffect, useMemo, useState } from "react"
import {
  Heading,
  Stack,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"
import { FiBell } from "react-icons/fi"

import { getChannels } from "../helpers/channels"

import Card from "../components/card"
import NewChannel, { ChannalProps } from "../components/settings/new-channel"

type Props = {
  channels: ChannalProps[]
}

const Settngs: React.FC<Props> = () => {
  const [channels, setChannels] = useState({})
  const channelKeys = useMemo(() => Object.keys(channels), [channels])

  useEffect(() => {
    setChannels(getChannels())
  }, [])

  return (
    <div>
      <Heading>Settings</Heading>
      <Stack mt={8}>
        <Card
          icon={<FiBell />}
          title="Channels"
          description="Add or remove channels"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>#</Th>
                <Th>Title</Th>
                <Th>ID</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {channelKeys.map((id, idx) => {
                const channel: any = channels[id]
                return (
                  <Tr>
                    <Td>{idx + 1}</Td>
                    <Td>{channel.title}</Td>
                    <Td>{id}</Td>
                    <Td>
                      <Button size="xs" colorScheme="red">
                        delete
                      </Button>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Card>
        <NewChannel />
      </Stack>
    </div>
  )
}

export default Settngs
