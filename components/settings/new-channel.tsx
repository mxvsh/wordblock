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
} from '@chakra-ui/react';

type Props = {};

const NewChannel: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>New Channel</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Input placeholder='Enter Channel ID' />
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Close
						</Button>
						<Button variant='ghost'>Secondary Action</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
};

export default NewChannel;
