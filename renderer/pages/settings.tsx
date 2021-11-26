import { NextPage } from "next"
import { useEffect, useMemo, useState } from "react"
import {
  Heading,
  Stack,
  Button,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react"

import { FiBell } from "react-icons/fi"
import { deleteChannel, getChannels } from "../helpers/channels"

import Card from "../components/card"
import NewChannel from "../components/settings/new-channel"

const Settngs: NextPage = () => {
  const [channels, setChannels] = useState({})
  const channelKeys = useMemo(() => Object.keys(channels || {}), [channels])

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
          extras={<NewChannel onAdd={() => setChannels(getChannels())} />}
        >
          <Table variant="simple">
            {channelKeys.length === 0 && (
              <TableCaption>No channels found</TableCaption>
            )}
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
                  <Tr key={idx}>
                    <Td>{idx + 1}</Td>
                    <Td>{channel.title}</Td>
                    <Td>{id}</Td>
                    <Td>
                      <Button
                        size="xs"
                        colorScheme="red"
                        onClick={() => {
                          deleteChannel(id)
                          setChannels(getChannels())
                        }}
                      >
                        delete
                      </Button>
                    </Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Card>
      </Stack>
    </div>
  )
}

export default Settngs
