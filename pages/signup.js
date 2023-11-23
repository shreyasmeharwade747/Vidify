import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link, 
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { createUserWithEmailAndPassword } from "firebase/auth" ;
  import { auth } from './firebase-config';
  import { useRouter } from 'next/router'
  import { useToast } from '@chakra-ui/react'
  import NextLink from 'next/link'
  
  export default function SignupCard() {
    const [showPassword, setShowPassword] = useState(false);
    const [ registerEmail , setRegisterEmail ] = useState ( " " ) ;
    const [ registerPassword , setRegisterPassword ] = useState ( " " ) ;
    const router = useRouter()
    const toast = useToast()

    

    const register = async ( ) => { 
      try{
      const user = await createUserWithEmailAndPassword(auth,registerEmail,registerPassword)
      console.log(user)
      router.push('/myhome')
      }
      catch(error){
          console.log(error.message)
          toast({
            title: 'Error',
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
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>

          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>First Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Last Name</FormLabel>
                    <Input type="text" />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input  type="email" onChange={(event)=>{
                  setRegisterEmail(event.target.value)
                }} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input onChange={(event)=>{
                  setRegisterPassword(event.target.value)
                }} type={showPassword ? 'text' : 'password'} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  
                  }}
                  onClick={register}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link href='/signin' color={'blue.400'}>Sign in</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }