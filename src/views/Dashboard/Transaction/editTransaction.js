// Chakra imports
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
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
    Select,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Image,
    Center,
    Wrap,
    useToast
} from "@chakra-ui/react";
import moment from 'moment';
import { useHistory, useLocation } from "react-router-dom";
import { MdCloudUpload } from "react-icons/md";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import source from "../../../assets/img/success.png";
import LoadingComp from '../../../components/Loading/loading.js';

function EditTransaction() {
    const textColor = useColorModeValue("gray.700", "white");
    const navigate = useHistory();
    const route = useLocation();
    const hiddenFileInput = useRef(null);
    const toast = useToast()
    const [detail, setDetail] = useState('');
    const [listDataCustomer, setListDataCustomer] = useState([]);
    const [listDataMotor, setListDataMotor] = useState([]);
    const [customer, setCustomer] = useState(route.state?.params == undefined ? '' : route.state?.params?.customer?.id);
    const [type, setType] = useState(route.state?.params == undefined ? '' : route.state?.params?.item?.id);
    const [tarif, setTarif] = useState('');
    const [tarifDay, setTarifDay] = useState('');
    const [dateIn, setDateIn] = useState('');
    const [dateOut, setDateOut] = useState('');
    const [plat, setPlat] = useState('');
    const [note, setNote] = useState('');
    const [status, setStatus] = useState('');
    const [file, setFile] = useState('');
    const [loading, setLoading] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [typeModal, setTypeModal] = useState('');
    //validation
    const [isValName, setValName] = useState(false);
    const [isValType, setValType] = useState(false);
    const [isValTarif1, setValTarif1] = useState(false);
    const [isValTarif2, setValTarif2] = useState(false);
    const [isValDate, setValDate] = useState(false);
    const [isValDate1, setValDate1] = useState(false);
    const [isValPlat, setValPlat] = useState(false);
    const [isValStatus, setValStatus] = useState(false);

    useEffect(() => {
        getListData();
    }, []);

    const getListData = () => {
        // axios get detail
        axios.get(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/transaction/${route.state?.params?.id}`, {
            headers: { 'Accept': 'application/json' }
        }).then((res) => {
            console.log('result =>', res.data.data)
            setDetail(res.data?.data)
            setTarif(res.data.data?.cost_hourly)
            setTarifDay(res.data.data?.cost_daily)
            setDateIn(res.data.data?.date_come)
            setPlat(res.data.data?.plat_number)
            setNote(res.data.data?.notes)
            setStatus(res.data.data?.status)
        }).catch((err) => {
            console.log('error =>', err.response.data)
        })
        // axios get customer
        axios.get(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/customer`, {
            headers: { 'Accept': 'application/json' }
        }).then((res) => {
            // console.log('res cus =>', res.data)
            setListDataCustomer(res.data.data)
        }).catch((err) => {
            console.log('err cus =>', err.response.data)
        })

        // axios get motor
        axios.get(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/item`, {
            headers: { 'Accept': 'application/json' }
        }).then((res) => {
            // console.log('res Mo =>', res.data)
            setListDataMotor(res.data.data)
        }).catch((err) => {
            console.log('err Mo =>', err.response.data)
        })
    }

    const onSubmit = (id) => {
        setLoading(true)
        let data = {
            'item_id': type,
            'customer_id': customer,
            'date_come': moment(dateIn).format('yyyy-MM-DD HH:mm:ss'),
            'date_out': moment(dateOut).format('yyyy-MM-DD HH:mm:ss'),
            'cost_hourly': parseInt(tarif),
            'cost_daily': parseInt(tarifDay),
            'plat_number': plat,
            'notes': note,
            'status': status
        }
        console.log('data post', data);
        // axios update
        axios.patch(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/transaction/${route.state?.params?.id}`, data, {
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log('result update', res.data);
            setTypeModal('update')
            setLoading(false)
            onOpen()
            setTimeout(() => {
                onClose()
                navigate.push('/admin/transactions')
            }, 800);
        }).catch((err) => {
            setLoading(false)
            console.log('err update', err.response)
        })
    }

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    const onPostImage = event => {
        setLoading(true)
        const fileUploaded = event.target.files[0];
        // console.log('filenya', event.target.value);

        const formData = new FormData();
        formData.append("transaction_id", route.state?.params?.id);
        formData.append("title", fileUploaded.name);
        formData.append("image", fileUploaded);
        // axios post
        axios.post(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/transaction-photo-location`, formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            }
        }).then((res) => {
            console.log('result post', res.data);
            setTypeModal('upload')
            setLoading(false)
            onOpen()
            getListData()
            setTimeout(() => {
                onClose()
            }, 800);
        }).catch((err) => {
            setLoading(false)
            toast({
                title: `Upload Foto gagal!`,
                position: 'top',
                status:'error',
                isClosable: true,
              })
            console.log('err post', err)
        })
    };

    const onDelete = (id) => {
        setLoading(true);
        // axios delete
        axios.delete(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/transaction-photo-location/${id}`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then((res) => {
            console.log('hasil del', res.data);
            getListData();
            setLoading(false);
        }).catch((err) => {
            setLoading(false);
            console.log('error del', err.response)
        })
    }

    const validate = () => {
        if (customer == '') {
            setValName(true)
        } else {
            setValName(false)
        }
        if (type == '') {
            setValType(true)
        } else {
            setValType(false)
        }
        if (tarif == '') {
            setValTarif1(true)
        } else {
            setValTarif1(false)
        }
        if (tarifDay == '') {
            setValTarif2(true)
        } else {
            setValTarif2(false)
        }
        if (dateIn == '') {
            setValDate(true)
        } else {
            setValDate(false)
        }
        if (dateOut == '') {
            setValDate1(true)
        } else {
            setValDate1(false)
        }
        if (plat == '') {
            setValPlat(true)
        } else {
            setValPlat(false)
        }
        if (status == '') {
            setValStatus(true)
        } else {
            setValStatus(false)
        }
        if (customer !== '' && type !== '' && tarif !== '' && tarifDay !== '' && dateIn !== '' && dateOut !== '' && plat !== '' && status !== '') {
            onSubmit()
        }
    }
    // console.log('hasil foto', file);
    return (
        <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <CardHeader p='6px 0px 22px 0px'>
                    <Text fontSize='xl' color={textColor} fontWeight='bold'>
                        Edit Transaksi
                    </Text>
                </CardHeader>
                <Container maxW='container.lg'>
                    <FormControl isInvalid={isValName}>
                        <FormLabel>Customer</FormLabel>
                        <Select value={customer} placeholder='Pilih customer' onChange={(e) => setCustomer(e.target.value)}>
                            {listDataCustomer.map((val) => {
                                return (
                                    <option value={val.id}>{val.name}</option>
                                )
                            })}
                        </Select>
                        {!isValName ? null : (
                            <FormErrorMessage>Customer wajib diisi.</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl isInvalid={isValType} style={{ marginTop: '25px' }}>
                        <FormLabel>Jenis Motor</FormLabel>
                        <Select value={type} placeholder='Pilih jenis motor' onChange={(e) => setType(e.target.value)}>
                            {listDataMotor.map((val) => {
                                return (
                                    <option value={val.id}>{val.brand + ' ' + val.title}</option>
                                )
                            })}
                        </Select>
                        {!isValType ? null : (
                            <FormErrorMessage>Jenis Motor wajib diisi.</FormErrorMessage>
                        )}
                    </FormControl>
                    <Flex direction={'row'}>
                        <FormControl isInvalid={isValDate} style={{ marginTop: '25px', marginRight: '20px' }}>
                            <FormLabel>Tanggal Masuk</FormLabel>
                            <Input type='datetime-local' value={dateIn} placeholder='Input tanggal masuk' onChange={(e) => setDateIn(e.target.value)} />
                            {!isValDate ? null : (
                                <FormErrorMessage>Tanggal masuk wajib diisi.</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={isValDate1} style={{ marginTop: '25px', marginLeft: '20px' }}>
                            <FormLabel>Tanggal Keluar</FormLabel>
                            <Input type='datetime-local' value={dateOut} placeholder='Input tanggal keluar' onChange={(e) => setDateOut(e.target.value)} />
                            {!isValDate1 ? null : (
                                <FormErrorMessage>Tanggal keluar wajib diisi.</FormErrorMessage>
                            )}
                        </FormControl>
                    </Flex>
                    <Flex direction={'row'}>
                        <FormControl isInvalid={isValTarif1} style={{ marginTop: '25px', marginRight: '20px' }}>
                            <FormLabel>Tarif Per Jam</FormLabel>
                            <Input type='number' value={tarif} placeholder='Input tarif per jam' onChange={(e) => setTarif(e.target.value)} />
                            {!isValTarif1 ? null : (
                                <FormErrorMessage>Tarif per jam wajib diisi.</FormErrorMessage>
                            )}
                        </FormControl>
                        <FormControl isInvalid={isValTarif2} style={{ marginTop: '25px', marginLeft: '20px' }}>
                            <FormLabel>Tarif Per Hari</FormLabel>
                            <Input type='number' value={tarifDay} placeholder='Input tarif per hari' onChange={(e) => setTarifDay(e.target.value)} />
                            {!isValTarif2 ? null : (
                                <FormErrorMessage>Tarif per hari wajib diisi.</FormErrorMessage>
                            )}
                        </FormControl>
                    </Flex>
                    <FormControl isInvalid={isValPlat} style={{ marginTop: '25px' }}>
                        <FormLabel>Plat Nomor</FormLabel>
                        <Input type='text' value={plat} placeholder='Input plat nomor' onChange={(e) => setPlat(e.target.value.toUpperCase())} />
                        {!isValPlat ? null : (
                            <FormErrorMessage>Plat nomor wajib diisi.</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl style={{ marginTop: '25px' }}>
                        <FormLabel>Catatan (opsional)</FormLabel>
                        <Input type='text' value={note} placeholder='Input catatan' onChange={(e) => setNote(e.target.value)} />
                    </FormControl>
                    <FormControl isInvalid={isValStatus} style={{ marginTop: '25px' }}>
                        <FormLabel>Status</FormLabel>
                        <Select placeholder='Pilih status' onChange={(e) => setStatus(e.target.value)} value={status}>
                            <option value={'reserved'}>Belum Diambil</option>
                            <option value={'taken'}>Sudah Diambil</option>
                        </Select>
                        {!isValStatus ? null : (
                            <FormErrorMessage>Status wajib diisi.</FormErrorMessage>
                        )}
                    </FormControl>
                    <FormControl style={{ marginTop: '25px' }}>
                        <FormLabel>Foto</FormLabel>
                        {/* <Input type="file" multiple accept="image/*" onChange={handleChange} borderColor={'transparent'} style={{ alignContent: 'center', marginLeft: -10, display: 'none' }} /> */}
                        <Wrap direction={'row'}>
                            {detail?.attachment?.map((files, i) => {
                                return (
                                    <Flex direction={'column'} style={{borderWidth: 1, borderColor: 'gray.200', borderRadius: 16, marginRight: 12, padding: 12}}>
                                        <Center>
                                        <Image
                                            boxSize='120px'
                                            objectFit='cover'
                                            src={files.url_photo}
                                            borderRadius={'16'}
                                            style={{ background: '#F7FAFC', marginBottom: 10, justifySelf: 'center'}}
                                        />
                                        </Center>
                                        <Button onClick={() => onDelete(files.id)}
                                            type='submit' bg="#EF3A3A" fontSize='14px' color='white' fontWeight='medium' size='xs'
                                            _hover={{ bg: "teal.200" }}
                                            _active={{ bg: "teal.400" }}>
                                            Hapus
                                        </Button>
                                    </Flex>
                                )
                            })}
                        </Wrap>
                    </FormControl>
                    <Button onClick={() => handleClick()}
                        type='submit' bg='teal.300' fontSize='14px' color='white' fontWeight='medium' w='16%' h='45'
                        style={{ marginTop: '25px' }}
                        _hover={{ bg: "teal.200" }}
                        _active={{ bg: "teal.400" }}
                        leftIcon={<MdCloudUpload size={20} color='white' />}>
                        Upload Foto
                    </Button>
                    <input
                        type="file"
                        onChange={onPostImage}
                        ref={hiddenFileInput}
                        style={{ display: 'none' }}
                    />
                </Container>
                <Flex direction={'row'} style={{ marginTop: '50px' }}>
                    <Button onClick={() => navigate.push('/admin/transactions')}
                        type='submit' variant='outline' fontSize='14px' color='black' fontWeight='medium' w='14%' h='45'
                        _hover={{ bg: "gray.200" }}
                        _active={{ bg: "gray.400" }}>
                        Kembali
                    </Button>
                    <Button onClick={() => validate()}
                        type='submit' bg='teal.300' fontSize='14px' color='white' fontWeight='medium' w='14%' h='45' style={{ marginLeft: '26px' }} x
                        _hover={{ bg: "teal.200" }}
                        _active={{ bg: "teal.400" }}>
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
                                    {typeModal == 'update' ? 'Data berhasil diubah.' : 'Foto berhasil diupload.'}
                                </Text>
                            </Flex>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
            {loading ? <LoadingComp /> : null}
        </Flex>
    );
}

export default EditTransaction;
