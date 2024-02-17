import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
    Flex,
    Text,
    useColorModeValue,
    Button,
    Container,
    Badge,
    Stack,
    Image
} from "@chakra-ui/react";
import { useLocation, useHistory } from "react-router-dom";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';

function DetailTransaction() {
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");
    const navigate = useHistory();
    const route = useLocation();
    const [dataDetail, setDataDetail] = useState('');
    const [total, setTotal] = useState('');

    useEffect(() => {
        getListData();
    }, []);

    const getListData = () => {
        // axios get
        axios.get(`https://kel6nitipmotorapi.franciscusrangga.com/api/v1/transaction/${route.state?.params?.id}`, {
            headers: { 'Accept': 'application/json' }
        }).then((res) => {
            console.log('result =>', res.data.data)
            setDataDetail(res.data.data)
            const startDate = new Date(res.data.data.date_come);
            const endDate = Date.now();

            const timeDifferenceMS = endDate - startDate;

            const timeDifferenceHours = Math.floor(timeDifferenceMS / 3600000);
            const timeDifferenceDays = Math.floor(timeDifferenceMS / 86400000);

            console.log(`Time difference in hours: ${timeDifferenceHours}`);
            console.log(`Time difference in days: ${timeDifferenceDays}`);
            if(timeDifferenceDays == 0){
                setTotal(parseInt(res.data.data.cost_hourly) * timeDifferenceHours)
            } else {
                const days = parseInt(res.data.data.cost_daily) * timeDifferenceDays;
                const hour = timeDifferenceHours - (24 * timeDifferenceDays);
                if( hour == 0 ){
                    setTotal(days)
                } else {
                    setTotal(days + parseInt(res.data.data.cost_hourly) * hour)
                }
            }
        }).catch((err) => {
            console.log('error =>', err.response.data)
        })
    }

    return (
        <Flex direction='column' pt={{ base: "120px", md: "75px" }}>
            <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
                <CardHeader p='6px 0px 22px 0px'>
                    <Text fontSize='xl' color={textColor} fontWeight='bold'>
                        Detail Transaksi
                    </Text>
                </CardHeader>
                <Container maxW='container.lg'>
                    <Flex direction={'row'} style={{ marginTop: '12px' }}>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '15%' }}>Status</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '20px' }}>:</Text>
                        <Badge
                            bg={dataDetail?.status == "reserved" ? "green.400" : bgStatus}
                            color={dataDetail?.status == "reserved" ? "white" : colorStatus}
                            fontSize="16px"
                            p="3px 10px"
                            borderRadius="8px"
                        >
                            {dataDetail == '' ? '-' : dataDetail.status == "reserved" ? "Belum Diambil" : "Sudah Diambil"}
                        </Badge>
                    </Flex>
                    <Flex direction={'row'} style={{ marginTop: '12px' }}>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '15%' }}>Customer</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '20px' }}>:</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal'>{dataDetail == '' ? '-' : dataDetail.customer?.name}</Text>
                    </Flex>
                    <Flex direction={'row'} style={{ marginTop: '12px' }}>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '15%' }}>Jenis Motor</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '20px' }}>:</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal'>{dataDetail == '' ? '-' : dataDetail.item?.brand + ' ' + dataDetail?.item?.title}</Text>
                    </Flex>
                    <Flex direction={'row'} style={{ marginTop: '12px' }}>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '15%' }}>Tanggal Masuk</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '20px' }}>:</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal'>{dataDetail == '' ? '-' : moment(dataDetail.date_come).format('DD MMMM YYYY, HH:mm')}</Text>
                    </Flex>
                    <Flex direction={'row'} style={{ marginTop: '12px' }}>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '15%' }}>Tanggal Keluar</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '20px' }}>:</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal'>{dataDetail == '' ? '-' : (dataDetail?.status == 'reserved' ? '-' : moment(dataDetail.date_come).format('DD MMMM YYYY, HH:mm'))}</Text>
                    </Flex>
                    <Flex direction={'row'} style={{ marginTop: '12px' }}>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '15%' }}>Tarif Per Jam</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '20px' }}>:</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal'>
                        <CurrencyFormat value={dataDetail == '' ? 0 : parseInt(dataDetail.cost_hourly)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                        </Text>
                    </Flex>
                    <Flex direction={'row'} style={{ marginTop: '12px' }}>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '15%' }}>Tarif Per Hari</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '20px' }}>:</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal'>
                        <CurrencyFormat value={dataDetail == '' ? 0 : parseInt(dataDetail.cost_daily)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                        </Text>
                    </Flex>
                    <Flex direction={'row'} style={{ marginTop: '12px' }}>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '15%' }}>Plat Nomor</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '20px' }}>:</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal'>{dataDetail == '' ? '-' : dataDetail.plat_number}</Text>
                    </Flex>
                    <Flex direction={'row'} style={{ marginTop: '12px' }}>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '15%' }}>Catatan</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '20px' }}>:</Text>
                        <Text fontSize='md' color={'black'} fontWeight='normal'>{dataDetail == '' ? '-' : dataDetail.notes == '' ? '-' : dataDetail.notes}</Text>
                    </Flex>
                    {dataDetail == '' || dataDetail?.attachment?.length == 0 ? null :
                        <Stack direction={'column'} style={{ marginTop: '16px' }}>
                            <Text fontSize='md' color={'black'} fontWeight='normal' style={{ width: '15%' }}>Foto</Text>
                            <Flex direction={'row'}>
                                {(dataDetail == '' ? [] : dataDetail?.attachment).map((val) => {
                                    return (
                                        <Image
                                            boxSize='150px'
                                            objectFit='cover'
                                            src={val.url_photo}
                                            borderRadius={'16'}
                                            style={{ marginRight: 12 }}
                                        />
                                    )
                                })}
                            </Flex>
                        </Stack>}
                    <Flex>
                        <Stack direction={'row'} style={{ borderWidth: 1, borderColor: '#E0E0E0', borderRadius: '8px', paddingTop: '6px', paddingBottom: '6px', marginTop: '25px', paddingLeft: 16, paddingRight: 16 }}>
                            <Text fontSize='md' color={'black'} fontWeight='semibold'>Total Tarif</Text>
                            <Text fontSize='md' color={'black'} fontWeight='semibold' style={{ marginLeft: '14px', marginRight: '4px' }}>:</Text>
                            <Text fontSize='md' color={'black'} fontWeight='semibold'><CurrencyFormat value={dataDetail == '' ? 0 : parseInt(total)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} /></Text>
                        </Stack>
                    </Flex>
                </Container>
                <Flex direction={'row'} style={{ marginTop: '50px' }}>
                    <Button onClick={() => navigate.push('/admin/transactions')}
                        type='submit' variant='outline' fontSize='14px' color='black' fontWeight='medium' w='14%' h='45'
                        _hover={{ bg: "gray.200" }}
                        _active={{ bg: "gray.400" }}>
                        Kembali
                    </Button>
                </Flex>
            </Card>
        </Flex>
    );
}

export default DetailTransaction;
