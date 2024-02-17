import React, { useState } from 'react'
import axios from 'axios';
import {
    Flex,
    Text,
    useColorModeValue,
    Button,
    Container,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    Center,
    Image
} from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import source from "../../../assets/img/success.png";
import LoadingComp from '../../../components/Loading/loading.js';

function AddCustomer() {
    const textColor = useColorModeValue("gray.700", "white");
    const navigate = useHistory();
    const [customer, setCustomer] = useState('');
    const [phone, setPhone] = useState('');
    const [isValName, setIsValName] = useState(false);
    const [isValPhone, setIsValPhone] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure()

    const onSubmit = () => {
        setLoading(true)
        let data = {
            'name': customer,
            'no_hp': phone
        }
        console.log('data post', data);
        // axios post
        axios.post(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/customer`, data, {
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log('result post', res.data);
            setLoading(false)
            onOpen()
            setTimeout(() => {
                onClose()
                navigate.push('/admin/customer')
            }, 800);
        }).catch((err) => {
            setLoading(false)
            console.log('err post', err.response)
        })
    }

    const validate = () => {
        if (customer == '') {
            setIsValName(true)
        } else {
            setIsValName(false)
        }
        if (phone == '') {
            setIsValPhone(true)
        } else {
            setIsValPhone(false)
        }

        if (customer !== '' && phone !== '') {
            onSubmit()
        }
    }

    return (
        <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <CardHeader p='6px 0px 22px 0px'>
                    <Text fontSize='xl' color={textColor} fontWeight='bold'>
                        Tambah Customer
                    </Text>
                </CardHeader>
                <Container maxW='container.lg'>
                    <FormControl isInvalid={isValName}>
                        <FormLabel>Nama Customer</FormLabel>
                        <Input type='text' value={customer} placeholder='Input nama customer' onChange={(e) => setCustomer(e.target.value)} />
                        {!isValName ? null : (
                            <FormErrorMessage>Nama customer wajib diisi.</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={isValPhone} style={{ marginTop: '25px' }}>
                        <FormLabel>No Telepon</FormLabel>
                        <Input type='number' value={phone} placeholder='Input no telepon' onChange={(e) => setPhone(e.target.value)} />
                        {!isValPhone ? null : (
                            <FormErrorMessage>No telepon wajib diisi.</FormErrorMessage>
                        )}
                    </FormControl>
                </Container>
                <Flex direction={'row'} style={{ marginTop: '50px' }}>
                    <Button onClick={() => navigate.push('/admin/customer')}
                        type='submit' variant='outline' fontSize='14px' color='black' fontWeight='medium' w='14%' h='45'
                        _hover={{bg: "teal.200"}}
                        _active={{bg: "teal.400"}}>
                        Kembali
                    </Button>
                    <Button onClick={() => validate()}
                        type='submit' bg='teal.300' fontSize='14px' color='white' fontWeight='medium' w='14%' h='45' style={{ marginLeft: '26px' }}x
                        _hover={{bg: "teal.200"}}
                        _active={{bg: "teal.400"}}
                        isLoading={loading}>
                        Simpan
                    </Button>
                </Flex>
            </Card>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <Center>
                            <Flex direction={'column'} style={{ marginTop: 16, marginBottom: 16 }}>
                                <Image
                                    boxSize='100px'
                                    objectFit='cover'
                                    src={source}
                                    borderRadius={'100px'}
                                    style={{ alignSelf: 'center', marginBottom: '20px' }}
                                />
                                <Text fontSize='xl' color={textColor} fontWeight='bold'>
                                    Data berhasil disimpan.
                                </Text>
                            </Flex>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {loading ? <LoadingComp/> : null}
        </Flex>
    );
}

export default AddCustomer;
