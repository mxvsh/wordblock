import type { NextPage } from "next"
import { useEffect, useRef, useState } from "react"
import {
  Heading,
  Textarea,
  Checkbox,
  Stack,
  Button,
  useToast,
} from "@chakra-ui/react"
import { getChannels } from "../helpers/channels"
import { bot } from "../lib/bot"

const Posts: NextPage = () => {
  const toast = useToast()
  const [channels, setChannels] = useState([])
  const [loading, setLoading] = useState(false)
  const messageRef = useRef<HTMLTextAreaElement>(null)
  const [selectedChannels, setSelectedChannels] = useState([])

  useEffect(() => {
    setChannels(getChannels())
  }, [])

  const Publish = async () => {
    let failed = 0
    setLoading(true)
    for (let id of selectedChannels) {
      try {
        await bot.telegram.sendMessage(id, messageRef.current?.value)
      } catch (e) {
        failed++
      }
    }

    setLoading(false)
    if (failed > 0) {
      toast({
        title: `Failed to send in ${failed} channel`,
        status: "error",
        duration: 4000,
        isClosable: true,
      })
    } else
      toast({
        description: `Successfully sent to ${
          selectedChannels.length - failed
        }/${selectedChannels.length} channels`,
        status: "success",
        duration: 4000,
        isClosable: true,
      })
  }

  return (
    <div>
      <Heading>Posts</Heading>
      <Stack mt={4} spacing={4}>
        {Object.keys(channels).map(key => (
          <Checkbox
            key={key}
            colorScheme="orange"
            onChange={e => {
              if (e.target.checked) {
                setSelectedChannels([...selectedChannels, key])
              } else {
                setSelectedChannels(
                  selectedChannels.filter(channel => channel !== key)
                )
              }
            }}
          >
            {channels[key].title}
          </Checkbox>
        ))}
        <Textarea ref={messageRef} placeholder="Enter message" />
        <Button isLoading={loading} onClick={Publish}>
          Publish
        </Button>
      </Stack>
    </div>
  )
}

export default Posts
