import type { InferGetServerSidePropsType } from "next"
import { Button, Heading, Stack, Text } from "@chakra-ui/react"
import { FiBell } from "react-icons/fi"
import Card from "../components/card"
import NewChannel, { ChannalProps } from "../components/settings/new-channel"
import { Key, ReactChild, ReactFragment, ReactPortal } from "react"

function Settngs({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Heading>Settings</Heading>
      <Stack mt={8}>
        <Card
          icon={<FiBell />}
          title="Channels"
          description="Add or remove channels"
        >
          {data.map(channel => (
            <Text textAlign="center" key={channel.id}>
              {channel.channelId}
            </Text>
          ))}

          <NewChannel />
        </Card>
      </Stack>
    </div>
  )
}

export default Settngs

export const getServerSideProps = async () => {
  const res = await fetch("http://localhost:3000/api/channels")
  const data: ChannalProps[] = await res.json()
  return {
    props: {
      data,
    },
  }
}
