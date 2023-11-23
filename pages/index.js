import { Flex,Box,Text } from '@chakra-ui/react'
import { Image,Button } from '@chakra-ui/react'
import Link from 'next/link'
import {onAuthStateChanged, signOut} from'firebase/auth'
import { auth } from './firebase-config'
import { useEffect, useState } from 'react'


export default function Home() {

  const [user , setUser] = useState('')

  useEffect(()=>{
    onAuthStateChanged(auth, (currentUser) =>{
      setUser(currentUser)
  })
  })

  return (
    <div >
      <Flex className='homepage' direction='column' flexGrow='1'>
        {/* //homepage */}
          <Flex borderBottom={'1px'} pb='2' borderBottomColor='gray.300' mt='3' justify='space-between' flexGrow='1'align='center'>
            {/* //navbar */}

              <Flex alignItems='center'>
                  <Image px='2' src='https://img.icons8.com/bubbles/50/000000/camcorder-pro.png' alt='Dan Abramov' />
                  <Text fontFamily={'arial'} as='b'color='blue.500' fontSize='2xl'>VIDIFY</Text>
                {/* //logo */}
              </Flex>
              <Flex pr='5'>
              {/* //login */}
            
                  <Link href={'/signin'}>
                  <Button borderRadius={'50'} mr='6' colorScheme='blue' variant='outline'>
                       Sign in
                   </Button>
                   </Link>
                   <Link href={'/signup'}>
                   <Button borderRadius={'50'} mr='4' colorScheme='blue' variant='solid'>
                       SignUp
                   </Button>
                   </Link>

              </Flex>
          </Flex>
          <Flex flexGrow='1'align='center' mt='130' justify='space-evenly'>
          {/* //product details */}

          <Image w='600px' src='https://img.freepik.com/free-vector/remote-meeting-concept-illustration_114360-4704.jpg?w=1060&t=st=1662019143~exp=1662019743~hmac=7cd55d87d1ac26a58510719b8edc933b9769cd55e2d500d1b8f07c91883fc0b7'/>
          <Box mr='10' width='600px' >
            <Text fontFamily={'cursive'} fontSize='20' fontWeight='medium'>Vidify is a video conferencing platform that can be used through a computer desktop, and allows users to connect online for video conference meetings and live chat.</Text>
            <Text fontFamily={'cursive'} fontSize='20' fontWeight='medium'>Video conferencing is live, visual connection between two or more remote parties over the internet that simulates a face-to-face meeting. Video conferencing is important because it joins people who would not normally be able to form a face-to-face connection.</Text>
          </Box>
          </Flex>
              
            

      </Flex>
    </div>
  )
}
