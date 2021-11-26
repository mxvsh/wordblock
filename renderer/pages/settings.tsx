import { NextPage } from "next"
import { useEffect, useMemo, useRef, useState } from "react"
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
  Input,
  Flex,
  useToast,
} from "@chakra-ui/react"
import { Telegraf } from "telegraf"
import { FiBell, FiBookOpen } from "react-icons/fi"
import { deleteChannel, getChannels } from "../helpers/channels"

import Card from "../components/card"
import NewChannel from "../components/settings/new-channel"

const Settngs: NextPage = () => {
  const toast = useToast()
  const [channels, setChannels] = useState({})
  const [loading, setLoading] = useState({ botToken: false })
  const botTokenRef = useRef<HTMLInputElement>(null)
  const channelKeys = useMemo(() => Object.keys(channels || {}), [channels])

  useEffect(() => {
    setChannels(getChannels())
    botTokenRef.current?.setAttribute(
      "value",
      localStorage.getItem("botToken") || ""
    )
  }, [])

  const UpdateBotToken = () => {
    const botToken = botTokenRef.current?.value
    setLoading({ ...loading, botToken: true })

    const bot = new Telegraf(botToken)
    bot.telegram
      .getMe()
      .then(info => {
        toast({ description: "Updated " + info.first_name, status: "success" })
        localStorage.setItem("botToken", botToken)
        setLoading({ ...loading, botToken: false })
      })
      .catch(err => {
        toast({
          description: err.message,
          status: "error",
        })

        setLoading({ ...loading, botToken: false })
      })
  }

  return (
    <div>
      <Heading>Settings</Heading>
      <Stack mt={8} spacing={4}>
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
        <Card
          color="red"
          icon={<FiBookOpen />}
          title="Bot Token"
          description="Set or update bot token"
        >
          <Flex>
            <Input
              ref={botTokenRef}
              roundedRight="none"
              placeholder="Enter bot token"
            />
            <Button
              isLoading={loading.botToken}
              roundedLeft="none"
              onClick={UpdateBotToken}
            >
              Update
            </Button>
          </Flex>
        </Card>
      </Stack>
    </div>
  )
}

export default Settngs
