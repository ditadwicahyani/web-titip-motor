import React from "react";
import {
    Badge,
    Button,
    Flex,
    Td,
    Text,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
import moment from 'moment';
import { BiSolidPencil, BiSolidTrashAlt } from "react-icons/bi";
import { FaRegEye } from "react-icons/fa";
import CurrencyFormat from "react-currency-format";

var idLocale = require('moment/locale/id');
moment.locale('id', idLocale);

function TableRow(props) {
    const { type, data1, data2, data3, data4, data5, status, onEdit, onDelete, onView } = props;
    const textColor = useColorModeValue("gray.700", "white");
    const bgStatus = useColorModeValue("gray.400", "#1a202c");
    const colorStatus = useColorModeValue("white", "gray.400");

    return (
        <>
            {type !== "transaksi" ?
                <Tr>
                    <Td minWidth={{ sm: "200px" }} pl="0px">
                        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
                            <Flex direction="column">
                                <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
                                    {data1}
                                </Text>
                            </Flex>
                        </Flex>
                    </Td>
                    <Td minWidth={{ sm: "450px" }} pl="0px">
                        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                            {data2}
                        </Text>
                    </Td>
                    <Td pl="0px">
                        <Button onClick={onEdit} p="0px" bg="transparent" variant="no-hover" style={{ marginRight: "14px" }}>
                            <BiSolidPencil color="#f19e00" style={{ marginRight: "5px" }} />
                            <Text fontSize="13px" color="#f19e00" fontWeight="bold" cursor="pointer">
                                EDIT
                            </Text>
                        </Button>
                        <Button onClick={onDelete} p="0px" bg="transparent" variant="no-hover">
                            <BiSolidTrashAlt color="#E53E3E" style={{ marginRight: "5px" }} />
                            <Text fontSize="13px" color="#E53E3E" fontWeight="bold" cursor="pointer">
                                DELETE
                            </Text>
                        </Button>
                    </Td>
                </Tr> :
                <Tr>
                    <Td minWidth={{ sm: "200px" }} pl="0px">
                        <Text fontSize="md" color={textColor} fontWeight="bold" minWidth="100%">
                            {data1}
                        </Text>
                    </Td>
                    <Td minWidth={{ sm: "190px" }} pl="0px">
                        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                            {data2}
                        </Text>
                    </Td>
                    <Td pl="0px">
                        <Badge
                            bg={status === "Belum Diambil" ? "green.400" : bgStatus}
                            color={status === "Belum Diambil" ? "white" : colorStatus}
                            fontSize="16px"
                            p="3px 10px"
                            borderRadius="8px">
                            {status}
                        </Badge>
                    </Td>
                    <Td minWidth={{ sm: "170px" }} pl="0px">
                        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                        {data3 == undefined ? '' : moment(data3).format('DD MMMM YYYY, HH:mm')}
                        </Text>
                    </Td>
                    <Td minWidth={{ sm: "170px" }} pl="0px">
                        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                            {data4 == undefined ? '' : moment(data4).format('DD MMMM YYYY, HH:mm')}
                        </Text>
                    </Td>
                    <Td minWidth={{ sm: "110px" }} pl="0px">
                        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
                            <CurrencyFormat value={parseInt(data5)} displayType={'text'} thousandSeparator={true} prefix={'Rp'} />
                        </Text>
                    </Td>
                    <Td minWidth={{ sm: "220px" }} pl="0px">
                        <Button onClick={onView} p="0px" bg="transparent" variant="no-hover" style={{ marginRight: "14px" }}>
                            <FaRegEye color="#1A77AA" style={{ marginRight: "5px" }} />
                            <Text fontSize="13px" color="#1A77AA" fontWeight="bold" cursor="pointer">
                                VIEW
                            </Text>
                        </Button>
                        <Button onClick={onEdit} p="0px" bg="transparent" variant="no-hover" style={{ marginRight: "14px" }}>
                            <BiSolidPencil color="#f19e00" style={{ marginRight: "5px" }} />
                            <Text fontSize="13px" color="#f19e00" fontWeight="bold" cursor="pointer">
                                EDIT
                            </Text>
                        </Button>
                        <Button onClick={onDelete} p="0px" bg="transparent" variant="no-hover">
                            <BiSolidTrashAlt color="#E53E3E" style={{ marginRight: "5px" }} />
                            <Text fontSize="13px" color="#E53E3E" fontWeight="bold" cursor="pointer">
                                DELETE
                            </Text>
                        </Button>
                    </Td>
                </Tr>}
        </>
    );
}

export default TableRow;
