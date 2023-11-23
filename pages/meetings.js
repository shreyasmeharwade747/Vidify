import { useEffect } from "react";
import { useDyteClient } from "@dytesdk/react-web-core";
import { DyteMeeting } from "@dytesdk/react-ui-kit";
import { useRouter } from "next/router";
import { Input, useToast } from '@chakra-ui/react'
import { Box,Text } from "@chakra-ui/react";
import { IconButton } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'


export default function meetings() {
  const [client, initMeeting] = useDyteClient();
  const router = useRouter()  
  const toast = useToast()


  
  
  
  useEffect(() => {
    const{
      query:{roomname,authtoken,meetingid}
  } = router
  const props ={roomname,authtoken,meetingid}
    console.log(props.roomname,props.authtoken,props.meetingid)
    initMeeting({
      roomName: props.roomname,
      authToken: props.authtoken,
      defaults: {
        audio: false,
        video: false,
      },
    });
    toast({
      title: 'Meeting created.',
      position: 'bottom-left',
      isClosable :'true',
      duration:15000,
      render: () => (
        <Box color={'white'}  p={3} ml={'1rem'} display='flex' alignItems={'center'} bg='blue.600' borderRadius={'7'} width='29rem'  >
             <Text>Meeting ID: </Text>
             <Text>{props.meetingid}</Text>
             <IconButton variant={'outline'} icon={<CopyIcon />} ml='3' onClick={()=>{navigator.clipboard.writeText(props.meetingid)}} />
        </Box>
      ),
    })
  }, []);



  return (<DyteMeeting meeting={client} />
  )
}
