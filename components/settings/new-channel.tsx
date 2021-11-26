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

export type ChannalProps = {
  id: string | number
  channelId: string
  title: string
  members: number
}

const NewChannel: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const channelInputRef = useRef<HTMLInputElement>(null)

  const AddChannel = async () => {
    let channels: any = localStorage.getItem("channels")

    channels = JSON.parse(channels || "{}")

    const id = channelInputRef.current?.value
    setLoading(true)
    fetch(`/api/channel/info?id=${id}`)
      .then(res => res.json())
      .then(data => {
        setLoading(false)
        if (data.error) {
          toast({
            title: "Error",
            description: data.error,
            status: "error",
            position: "bottom-right",
          })
          return
        }

        const { id, title } = data
        toast({
          title: "Success",
          description: `${title} added`,
          status: "success",
          position: "bottom-right",
        })
        channels[id] = { ...data }
        localStorage.setItem("channels", JSON.stringify(channels))
        onClose()
      })
  }

  return (
    <>
      <Button size="sm" onClick={onOpen}>
        Add Channel
      </Button>
      <Box>
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
      </Box>
    </>
  )
}

export default NewChannel
