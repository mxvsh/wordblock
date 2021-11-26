import { useRef, useState } from "react"
import {
  Box,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"
import { bot } from "../../lib/bot"

export type NewChannelProps = {
  onAdd: () => void
}

const NewChannel: React.FC<NewChannelProps> = ({ onAdd }) => {
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const channelInputRef = useRef<HTMLInputElement>(null)

  const AddChannel = async () => {
    setLoading(true)
    let channels: any = localStorage.getItem("channels")
    const id = channelInputRef.current?.value
    channels = JSON.parse(channels || "{}")

    try {
      const info = await bot.telegram.getChat(Number(id))
      const title = info["title"]

      toast({
        title: "Success",
        description: `${title} added`,
        status: "success",
        position: "bottom-right",
      })

      channels[id] = { ...info }
      localStorage.setItem("channels", JSON.stringify(channels))

      onAdd()
      onClose()
    } catch (e) {
      setLoading(false)
      toast({
        title: "Error",
        description: e.message,
        status: "error",
        position: "bottom-right",
      })
      return
    }
  }

  return (
    <>
      <Button size="sm" onClick={onOpen}>
        Add Channel
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>New Channel</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              autoFocus
              ref={channelInputRef}
              type="text"
              placeholder="Enter Channel ID"
            />
          </ModalBody>

          <ModalFooter>
            <Button isLoading={loading} onClick={AddChannel}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewChannel
