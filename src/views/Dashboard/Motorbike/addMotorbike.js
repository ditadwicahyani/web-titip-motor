import React, { useState } from 'react';
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

function AddMotorbike() {
    const textColor = useColorModeValue("gray.700", "white");
    const navigate = useHistory();
    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');
    const [isValBrand, setIsValBrand] = useState(false);
    const [isValType, setIsValType] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure()

    const onSubmit = () => {
        setLoading(true)
        let data = {
            'brand': brand,
            'title': type
        }
        console.log('data post', data);
        // axios post
        axios.post(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/item`, data, {
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log('result post', res.data);
            setLoading(false)
            onOpen()
            setTimeout(() => {
                onClose()
                navigate.push('/admin/motor')
            }, 800);
        }).catch((err) => {
            setLoading(false)
            console.log('err post', err.response)
        })
    }

    const validate = () => {
        if (brand == '') {
            setIsValBrand(true)
        } else {
            setIsValBrand(false)
        }
        if (type == '') {
            setIsValType(true)
        } else {
            setIsValType(false)
        }
        if (brand !== '' && type !== '') {
            onSubmit()
        }
    }

    return (
        <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <CardHeader p='6px 0px 22px 0px'>
                    <Text fontSize='xl' color={textColor} fontWeight='bold'>
                        Tambah Kategori Motor
                    </Text>
                </CardHeader>
                <Container maxW='container.lg'>
                    <FormControl isInvalid={isValBrand}>
                        <FormLabel>Brand Motor</FormLabel>
                        <Input type='text' value={brand} placeholder='Input brand motor' onChange={(e) => { setBrand(e.target.value), setIsValBrand(false) }} />
                        {!isValBrand ? null : (
                            <FormErrorMessage>Brand motor wajib diisi.</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={isValType} style={{ marginTop: '25px' }}>
                        <FormLabel>Jenis Motor</FormLabel>
                        <Input type='text' value={type} placeholder='Input jenis motor' onChange={(e) => { setType(e.target.value), setIsValType(false) }} />
                        {!isValType ? null : (
                            <FormErrorMessage>Jenis Motor wajib diisi.</FormErrorMessage>
                        )}
                    </FormControl>
                </Container>
                <Flex direction={'row'} style={{ marginTop: '50px' }}>
                    <Button onClick={() => navigate.push('/admin/motor')}
                        type='submit' variant='outline' fontSize='14px' color='black' fontWeight='medium' w='14%' h='45'
                        _hover={{bg: "teal.200"}}
                        _active={{bg: "teal.400"}}>
                        Kembali
                    </Button>
                    <Button onClick={() => validate()}
                        type='submit' fontSize='14px' color='white' fontWeight='medium' w='14%' h='45'
                        bg='teal.300'
                        style={{ marginLeft: '26px' }}
                        _hover={{ bg: "teal.200" }}
                        _active={{ bg: "teal.400" }}
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

export default AddMotorbike;
