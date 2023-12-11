import React from 'react'
import { Skeleton, Stack } from '@chakra-ui/react'

const Loader = () => {
    return (
        <div>
            <Stack>
                <Skeleton startColor='pink.500' endColor='blue.500' height='200px' />
                <Skeleton startColor='blue.500' height='20px' />
                <Skeleton startColor='blue.500' height='20px' />
            </Stack>
        </div>
    )
}

export default Loader
