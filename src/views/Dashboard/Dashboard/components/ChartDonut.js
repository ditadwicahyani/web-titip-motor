// Chakra imports
import {
    Flex,
    Icon,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import DashboardTableRow from "components/Tables/DashboardTableRow";
import React from "react";
import { PieChart, Pie, Tooltip } from "recharts";
import Chart from 'react-apexcharts'

const ChartDonut = ({ title }) => {
    const textColor = useColorModeValue("gray.700", "white");
    const data = [
        { name: "Geeksforgeeks", students: 400 },
        { name: "Technical scripter", students: 700 },
        { name: "Geek-i-knack", students: 200 },
        { name: "Geek-o-mania", students: 1000 },
    ];

    return (
        <Card p='16px' overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader p='12px 0px 28px 0px'>
                <Flex direction='column'>
                    <Text fontSize='lg' color={textColor} fontWeight='bold' pb='.5rem'>
                        {title}
                    </Text>
                </Flex>
            </CardHeader>
            <Chart options={{
                xaxis: {
                    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
                }
            }}
                series={[{
                    name: 'series-1',
                    data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
                }]}
                type="bar"
                width={450}
                height={300} />
        </Card>
    );
};

export default ChartDonut;
