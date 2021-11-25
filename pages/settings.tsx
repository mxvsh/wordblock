import type { NextPage } from 'next';
import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { FiBell } from 'react-icons/fi';
import Card from '../components/card';

const Settngs: NextPage = () => {
	return (
		<div>
			<Heading>Settings</Heading>
			<Stack mt={8}>
				<Card
					icon={<FiBell />}
					title='Channels'
					description='Add or remove channels'
				>
					<Text textAlign='center'>No channels</Text>
					<Button size='sm'>Add Channel</Button>
				</Card>
			</Stack>
		</div>
	);
};

export default Settngs;
