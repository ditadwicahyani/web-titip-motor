import React, { useState } from 'react';
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
    ChakraProvider,
    extendTheme,
    Center,
    Image
} from "@chakra-ui/react";
import Lottie from 'react-lottie';
import animationData from '../../assets/json/loading.json';

function LoadingComp({}) {
    const { isOpen, onClose } = useDisclosure({defaultIsOpen: true})

    const theme = extendTheme({
        components: {
            Modal: {
                baseStyle: (props) => ({
                    dialog: {
                        bg: "transparent"
                    }
                })
            }
        }
    });

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <ChakraProvider theme={theme}>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent style={{ boxShadow: 'none' }}>
                    <ModalBody>
                        <Center>
                            <Flex direction={'column'}>
                                <Lottie
                                    options={defaultOptions}
                                    height={200}
                                    width={200}
                                />
                            </Flex>
                        </Center>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
}

export default LoadingComp;
