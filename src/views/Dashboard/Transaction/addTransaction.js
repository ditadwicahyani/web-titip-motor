import React, { useState, useEffect } from 'react'
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
    Switch,
    Select,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    useDisclosure,
    Center,
    Image
} from "@chakra-ui/react"
import { useHistory } from "react-router-dom"
import Card from "components/Card/Card.js"
import CardHeader from "components/Card/CardHeader.js"
import source from "../../../assets/img/success.png"
import LoadingComp from '../../../components/Loading/loading.js'
import moment from 'moment'

function AddTransaction() {
    const textColor = useColorModeValue("gray.700", "white");
    const navigate = useHistory();
    const [listDataCustomer, setListDataCustomer] = useState([]);
    const [listDataMotor, setListDataMotor] = useState([]);
    const [check, setCheck] = useState(false);
    const [customer, setCustomer] = useState('');
    const [idCust, setIdCust] = useState('');
    const [phone, setPhone] = useState('');
    const [idPhone, setIdPhone] = useState('');
    const [type, setType] = useState('');
    const [tarif, setTarif] = useState('');
    const [tarifDay, setTarifDay] = useState('');
    const [date, setDate] = useState('');
    const [dateOut, setDateOut] = useState('');
    const [plat, setPlat] = useState('');
    const [note, setNote] = useState('');
    const [loading, setLoading] = useState(false);
    const { isOpen: isOpen, onOpen: onOpen, onClose: onClose } = useDisclosure()
    //validation
    const [isValName, setValName] = useState(false);
    const [isValPhone, setValPhone] = useState(false);
    const [isValType, setValType] = useState(false);
    const [isValTarif1, setValTarif1] = useState(false);
    const [isValTarif2, setValTarif2] = useState(false);
    const [isValDate, setValDate] = useState(false);
    const [isValDate1, setValDate1] = useState(false);
    const [isValPlat, setValPlat] = useState(false);

    useEffect(() => {
        getListData();
    }, []);

    const getListData = () => {
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
            'customer_id': id == undefined ? customer : id,
            'date_come': moment(date).format('yyyy-MM-DD HH:mm:ss'),
            'date_out': '',
            // 'date_out': moment(dateOut).format('yyyy-MM-DD HH:mm:ss'),
            'cost_hourly': parseInt(tarif),
            'cost_daily': parseInt(tarifDay),
            'plat_number': plat,
            'notes': note
        }
        console.log('data post', data);
        // axios post
        axios.post(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/transaction`, data, {
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log('result post', res.data);
            setLoading(false)
            onOpen()
            setTimeout(() => {
                onClose()
                navigate.push('/admin/transactions')
            }, 800);
        }).catch((err) => {
            setLoading(false)
            console.log('err post', err.response)
        })
    }

    const addCustomer = () => {
        setLoading(true)
        let data = {
            'name': customer,
            'no_hp': phone
        }
        // axios post
        axios.post(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/customer`, data, {
            headers: {
                'Accept': 'application/json'
            }
        }).then((res) => {
            console.log('result post', res.data);
            getListData()
            onSubmit(res.data.data.id)
        }).catch((err) => {
            setLoading(false)
            console.log('err post', err.response)
        })
    }

    const validate = () => {
        if (customer == '') {
            setValName(true)
        } else {
            setValName(false)
        }
        if (phone == '') {
            setValPhone(true)
        } else {
            setValPhone(false)
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
        if (date == '') {
            setValDate(true)
        } else {
            setValDate(false)
        }
        if (plat == '') {
            setValPlat(true)
        } else {
            setValPlat(false)
        }
        if (customer !== '' && phone !== '' && type !== '' && tarif !== '' && tarifDay !== '' && date !== '' && plat !== '') {
            if(check == true){
                onSubmit()
            } else {
                addCustomer()
            }
        }
    }

    const onHandleChange = (e) => {
        setCustomer(e.target.value)
        const dataFilter = listDataCustomer.filter(a => a.id == e.target.value);
        setPhone(dataFilter.length == 0 ? '' : dataFilter[0].no_hp);
    }

    return (
        <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <CardHeader p='6px 0px 22px 0px'>
                    <Text fontSize='xl' color={textColor} fontWeight='bold'>
                        Tambah Transaksi
                    </Text>
                </CardHeader>
                <Container maxW='container.lg'>
                    <FormControl display='flex' alignItems='center' style={{ marginBottom: '25px' }}>
                        <FormLabel htmlFor='isChecked' mb='0'>
                            Sudah pernah titip?
                        </FormLabel>
                        <Switch id='isChecked' colorScheme='teal' isChecked={check} onChange={() => { setCheck(!check), setValName(false), setValPhone(false), setValType(false), setValDate(false), setValTarif1(false), setValTarif2(false), setValPlat(false), setCustomer(''), setPhone(''), setIdCust(''), setIdPhone('') }} />
                    </FormControl>
                    {check == true ?
                        <>
                            <FormControl isInvalid={isValName}>
                                <FormLabel>Customer</FormLabel>
                                <Select value={customer} placeholder='Pilih customer' onChange={(e) => onHandleChange(e)}>
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
                        </> :
                        <>
                            <FormControl isInvalid={isValName}>
                                <FormLabel>Customer</FormLabel>
                                <Input type='text' value={customer} placeholder='Input customer' onChange={(e) => setCustomer(e.target.value)} />
                                {!isValName ? null : (
                                    <FormErrorMessage>Customer wajib diisi.</FormErrorMessage>
                                )}
                            </FormControl>
                            <FormControl isInvalid={isValPhone} style={{ marginTop: '25px' }}>
                                <FormLabel>No HP Customer</FormLabel>
                                <Input type='number' value={phone} placeholder='Input no HP' onChange={(e) => setPhone(e.target.value)} />
                                {!isValPhone ? null : (
                                    <FormErrorMessage>No HP wajib diisi.</FormErrorMessage>
                                )}
                            </FormControl>
                        </>}
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
                    <FormControl isInvalid={isValDate} style={{ marginTop: '25px' }}>
                        <FormLabel>Tanggal Masuk</FormLabel>
                        <Input type='datetime-local' max={new Date()} value={date} placeholder='Input tanggal masuk' onChange={(e) => setDate(e.target.value)} />
                        {!isValDate ? null : (
                            <FormErrorMessage>Tanggal masuk wajib diisi.</FormErrorMessage>
                        )}
                    </FormControl>
                    {/* <Flex direction={'row'}>
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
                    </Flex> */}
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
                </Container>
                <Flex direction={'row'} style={{ marginTop: '50px' }}>
                    <Button onClick={() => navigate.push('/admin/transactions')}
                        type='submit' variant='outline' fontSize='14px' color='black' fontWeight='medium' w='14%' h='45'
                        _hover={{ bg: "teal.200" }}
                        _active={{ bg: "teal.400" }}>
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
            {loading ? <LoadingComp /> : null}
        </Flex>
    );
}

export default AddTransaction;
