import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { auth } from './firebase-config';
  import { signInWithEmailAndPassword } from 'firebase/auth';
  import { useRouter } from 'next/router'
  import { useToast } from '@chakra-ui/react'


  export default function SimpleCard() {


    const [ loginEmail , setLoginEmail ] = useState ( " " ) ;
    const [ loginPassword , setLoginPassword ] = useState ( " " ) ;
    const router = useRouter()
    const toast = useToast()


    const login = async ( ) => {
     try{
      const user= await   signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      router.push('/myhome')
     }catch(error){
      console.log(error.message)
      toast({
        title: 'Error',
        description: "Incorrect email or Password.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
     }
    
    } ;



    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input onChange = { ( event ) => {
                setLoginEmail ( event.target.value ) ;
                } } type="email" />
              </FormControl>
              <FormControl type='submit' id="password">
                <FormLabel>Password</FormLabel>
                <Input onChange = { ( event ) => {
                setLoginPassword ( event.target.value ) ;
              } } type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={login}>

                  Sign in
                </Button>

              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }