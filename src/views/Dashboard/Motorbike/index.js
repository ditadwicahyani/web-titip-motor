import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
    Flex, Table, Tbody, Th, Thead, Tr, useColorModeValue, Button, useDisclosure,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from "@chakra-ui/react";
import { AiOutlinePlus } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import TableRow from "components/Tables/TableRow";
import LoadingComp from '../../../components/Loading/loading.js';

function Motorbike() {
    const textColor = useColorModeValue("gray.700", "white");
    const navigate = useHistory();
    const [listData, setListData] = useState([]);
    const [idDel, setIdDel] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getListData();
    }, []);

    const getListData = () => {
        // axios get
        axios.get(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/item`, {
            headers: { 'Accept': 'application/json' }
        }).then((res) => {
            // console.log('result =>', res.data)
            setListData(res.data.data)
        }).catch((err) => {
            console.log('error =>', err.response.data)
        })
    }

    const onDelete = (id) => {
        onClose();
        setLoading(true);
        // axios delete
        axios.delete(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/item/${id}`, {
            headers: {
                'Accept': 'application/json',
            }
        }).then((res) => {
            console.log('hasil delete', res.data);
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
                <CardHeader p='6px 0px 22px 0px'>
                    <Button onClick={() => navigate.push("/admin/addmotor")}
                        type='submit' bg='teal.300' fontSize='14px' color='white' fontWeight='medium' w='13%' h='45'
                        _hover={{
                            bg: "teal.200",
                        }}
                        _active={{
                            bg: "teal.400",
                        }}
                        leftIcon={<AiOutlinePlus size={20} />}>
                        Tambah
                    </Button>
                </CardHeader>
                <CardBody>
                    <Table variant='simple' color={textColor}>
                        <Thead>
                            <Tr my='.8rem' pl='0px' color='gray.400'>
                                {["Brand Motor", "Jenis Motor", "Aksi"].map((caption, idx) => {
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
                                        data1={row.brand}
                                        data2={row.title}
                                        onEdit={() => {navigate.push({
                                            pathname: "/admin/editmotor",
                                            search: "",
                                            hash: "#",
                                            state: { params: row }
                                          })}}
                                        onDelete={() => { setIdDel(row.id), onOpen() }}
                                    />
                                );
                            })}
                        </Tbody>
                    </Table>
                </CardBody>
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
                        <Button colorScheme='red' ml={3} onClick={()=>{onDelete(idDel)}}>
                            Hapus
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            {loading ? <LoadingComp/> : null}
        </Flex>
    );
}

export default Motorbike;
