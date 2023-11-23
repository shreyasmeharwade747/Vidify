import React, { useCallback, useEffect, useRef, useState } from 'react'
import { auth } from './firebase-config'
import { signOut} from'firebase/auth'
import { Button, Flex, Text,Heading, Input,Image } from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { onAuthStateChanged } from 'firebase/auth'
import { CopyIcon } from '@chakra-ui/icons'
import { IconButton } from '@chakra-ui/react'




function myhome() {

      const [user, setuser] =useState()
      const [roomname, setroomname] = useState('')
      const [meetingid, setmeetingid] = useState('')
      const [authtoken, setauthtoken] = useState('')
      const [ready ,setready] = useState(0)
      const router = useRouter()


     useEffect(()=>{
      onAuthStateChanged(auth,(currentuser)=>{
        setuser(currentuser)
        if(currentuser){
        }
        else{
          router.push('/signin')
        }
      })
      console.log(roomname)
      console.log(authtoken)
      console.log(meetingid)
      if(ready==1){
        router.push({
          pathname:'/meetings',
          query:{roomname,authtoken,meetingid}
        })
      }
        
  
     },[roomname,authtoken,meetingid])

     const joinmeeting =()=>{
      console.log(meetingid)
      axios.post('http://127.0.0.1:8000/join',{
        id:meetingid,
      }).then((res)=>{
        console.log(res.data)
        setroomname(res.data[0])
        setauthtoken(res.data[1])
        setready(1)
      })
     }
 
     const createMeeting = ()=>{

      axios.get('http://127.0.0.1:8000/create').then( (res)=>{
        console.log(res.data)
        setroomname(res.data[0][0])
        setauthtoken(res.data[1])
        setmeetingid(res.data[0][1])
        setready(1)


      })
    
    }
    const handlechange = (e)=>{
      setmeetingid()

    }
       
    const pass = ()=>{

      router.push({
        pathname:'/empty',
        query:{roomname,authtoken}
      })
    }


    const logout = async ()=>{
      await signOut(auth)
    }


  return (
    <Flex flexDirection={'column'}>
        <Flex flexGrow={'1'} justify={'space-between'} mt='3'mr={''}  align='center'borderBottom={'1px'} borderColor='gray.300'pb={'10px'} >
        <Flex alignItems='center'>
                  <Image px='2' src='https://img.icons8.com/bubbles/50/000000/camcorder-pro.png' alt='Dan Abramov' />
                  <NextLink href={'/'}>
                      <Text _hover={{cursor:'pointer'}} fontFamily={'arial'} as='b'color='blue.500' fontSize='2xl'>VIDIFY</Text>
                  </NextLink>              
              </Flex>
           
           <Flex align={'center'}>
            <Text>{user?.email}</Text>
           <NextLink href={'/'}>
           <Button onClick={logout} mx="7" variant={'outline'}colorScheme='blue' borderRadius={'50'}>
            Signout
           </Button>
           </NextLink>
           </Flex>

        </Flex >
        <Flex  >
        <Flex flexDirection={'column'}  >
            <Flex  flexDirection='column' ml={'7rem'} mt='125 ' width={'500px'} border='1px' p='20px' borderRadius={'20'} borderColor='gray.400' >
              <Heading size={'lg'}>
                Create Meeting.
              </Heading>
                 {/* <NextLink href={'/myhome'}> */}
                  <a target="_blank">
                 <Button  bg='blue.500'color={'white'} mt='5'width={'200px'}_hover={{
                    bg: 'blue.400',
                  }} onClick={createMeeting} >
                  New Meeting
                </Button>
                </a>
                {/* </NextLink> */}
                
            </Flex>
              
            <Flex flexDirection='column' ml={'7rem'} mt='70' width={'500px'} border='1px' p='20px' borderRadius={'20'} borderColor='gray.400'>
              <Heading size={'lg'}>
                Join Meeting
              </Heading>
              <Heading mt='5' size={'sm'}>Meeting Id</Heading>
              <Input  mt={'3'}  type='text' onChange={(e)=>{setmeetingid(e.target.value)}}/>
              <Button bg='blue.500'color={'white'} mt='5'width={'200px'}_hover={{
                    bg: 'blue.400',
                  }} onClick={joinmeeting} >
                  Join Meeting
                </Button>
            </Flex>
                

            </Flex>
            <Image ml={'5rem'} width={'50rem'} src='https://img.freepik.com/free-vector/online-world-concept-illustration_114360-1007.jpg?w=1060&t=st=1662537614~exp=1662538214~hmac=26569e049b5ac434ba396b4c3a11d8f471d7ec9bd9b1ef0382c7363e008e6d1b' />  
        </Flex>




    </Flex>
  )
}

export default myhome