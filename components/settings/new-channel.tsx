import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
} from "@chakra-ui/react"
import { Router } from "next/router"
import { useState } from "react"

export type ChannalProps = {
  id: string | number
  channel_Id: string
}

const NewChannel: React.FC = () => {
  const [channel_Id, setchael_Id] = useState("")
  // modal
  const { isOpen, onOpen, onClose } = useDisclosure()
  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { channel_Id }
      await fetch(`http://localhost:3000/api/channels/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      if (!channel_Id) return
      setchael_Id("")
    } catch (error) {
      console.error(error)
    }
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
              <form onSubmit={submitData}>
                <Input
                  autoFocus
                  onChange={e => setchael_Id(e.target.value)}
                  type="text"
                  value={channel_Id}
                  placeholder="Enter Channel ID"
                />
              </form>
            </ModalBody>

            <ModalFooter>
              <Button onClick={submitData} variant="blue">
                Add
              </Button>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  )
}

export default NewChannel
