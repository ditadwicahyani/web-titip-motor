import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
    Flex, Table, Tbody, Th, Thead, Tr, useColorModeValue, Button, useDisclosure, FormControl, Select,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useToast
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TableRow from "components/Tables/TableRow";
import LoadingComp from '../../../components/Loading/loading.js';

function Transaction() {
    const textColor = useColorModeValue("gray.700", "white");
    const navigate = useHistory();
    const toast = useToast()
    const [listData, setListData] = useState([]);
    const [listDataCustomer, setListDataCustomer] = useState([]);
    const [listDataMotor, setListDataMotor] = useState([]);
    const [customer, setCustomer] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [idDel, setIdDel] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getListData();
        getData();
    }, []);

    const getListData = () => {
        // axios get
        axios.get(type !== '' && status !== '' ? `https://kel6nitipmotorapi.franciscusrangga.com/api/v1/transaction?item_id=${type == '' ? 0 : type}&transaction_status=${status}` :
        type !== '' && status == '' ?  `https://kel6nitipmotorapi.franciscusrangga.com/api/v1/transaction?item_id=${type == '' ? 0 : type}` :
        type == '' && status !== '' ?  `https://kel6nitipmotorapi.franciscusrangga.com/api/v1/transaction?transaction_status=${status}` :
        `https://kel6nitipmotorapi.franciscusrangga.com/api/v1/transaction`, {
            headers: { 'Accept': 'application/json' }
        }).then((res) => {
            console.log('result =>', res.data)
            setListData(res.data.data)
            setLoading(false)
        }).catch((err) => {
            setLoading(false)
            toast({
                title: `Data tidak ada.`,
                position: 'top',
                status:'error',
                isClosable: true,
              })
            console.log('error =>', err.response.data)
        })
    }

    const getData = () => {
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

    const onDelete = (id) => {
        onClose();
        setLoading(true);
        // axios delete
        axios.delete(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/transaction/${id}`, {
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

    return (
        <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <Flex direction={'row'}>
                    <Flex direction={'row'} justifyContent={'space-between'} style={{ width: '50%', marginRight: '4%' }}>
                        {/* <FormControl style={{ marginBottom: '20px', width: '32%' }}>
                            <Select value={customer} placeholder='Filter customer' onChange={(e) => setCustomer(e.target.value)}>
                                {listDataCustomer.map((val) => {
                                    return (
                                        <option value={val.id}>{val.name}</option>
                                    )
                                })}
                            </Select>
                        </FormControl> */}
                        <FormControl style={{ marginBottom: '20px', width: '47%' }}>
                            <Select value={type} placeholder='Filter motor' onChange={(e) => setType(e.target.value)}>
                                {listDataMotor.map((val) => {
                                    return (
                                        <option value={val.id}>{val.brand + ' ' + val.title}</option>
                                    )
                                })}
                            </Select>
                        </FormControl>
                        <FormControl style={{ marginBottom: '20px', width: '47%' }}>
                            <Select placeholder='Filter status' onChange={(e) => setStatus(e.target.value)} value={status}>
                                <option value={'reserved'}>Belum Diambil</option>
                                <option value={'taken'}>Sudah Diambil</option>
                            </Select>
                        </FormControl>
                    </Flex>
                    <Button onClick={() => {setLoading(true), getListData()}}
                        type='submit' bg='teal.300' fontSize='14px' color='white' fontWeight='medium' w='7%'
                        _hover={{ bg: "teal.200" }}
                        _active={{ bg: "teal.400" }}>
                        Cari
                    </Button>
                </Flex>
                <CardHeader p='6px 0px 22px 0px'>
                    <Button onClick={() => navigate.push('/admin/addtransaction')}
                        type='submit' bg='teal.300' fontSize='14px' color='white' fontWeight='medium' w='13%' h='45'
                        // mb='24px'
                        _hover={{ bg: "teal.200" }}
                        _active={{ bg: "teal.400" }}
                        leftIcon={<AiOutlinePlus size={20} />}>
                        Tambah
                    </Button>
                </CardHeader>
                <div style={{ overflowX: "scroll" }}>
                    <CardBody>
                        <Table variant='simple' color={textColor}>
                            <Thead>
                                <Tr my='0.7rem' pl='0px' color='gray.400'>
                                    {["Nama Customer", "Motor", "Status", "Tanggal Masuk", "Tanggal Keluar", "Total Tarif", "Aksi"].map((caption, idx) => {
                                        return (
                                            <Th color='gray.400' key={idx} ps={idx === 0 ? "0px" : "0px"}>
                                                {caption}
                                            </Th>
                                        );
                                    })}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {listData.map((row) => {
                                    return (
                                        <TableRow
                                            type={'transaksi'}
                                            data1={row.customer.name}
                                            data2={row.item.brand + ' ' + row.item.title}
                                            data3={row.date_come}
                                            data4={row.date_out}
                                            data5={row.cost_final}
                                            status={row.status == "reserved" ? "Belum Diambil" : "Sudah Diambil"}
                                            onEdit={() => navigate.push({
                                                pathname: "/admin/edittransaction",
                                                search: "",
                                                hash: "#",
                                                state: { params: row }
                                            })}
                                            onDelete={() => { setIdDel(row.id), onOpen() }}
                                            onView={() => navigate.push({
                                                pathname: "/admin/detailtransaction",
                                                search: "",
                                                hash: "#",
                                                state: { params: row }
                                            })}
                                        />
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </CardBody>
                </div>
            </Card>
            <AlertDialog
                motionPreset='slideInBottom'
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader>Anda yakin?</AlertDialogHeader>
                    <AlertDialogBody>
                        Data yang sudah dihapus tidak bisa dikembalikan!
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={() => { onClose(), setIdDel('') }}>
                            Batal
                        </Button>
                        <Button colorScheme='red' ml={3} onClick={() => { onDelete(idDel) }}>
                            Hapus
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {loading ? <LoadingComp /> : null}
        </Flex>
    );
}

export default Transaction;
