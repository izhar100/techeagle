import { Box } from '@chakra-ui/react'
import AllRoutes from './components/AllRoutes'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Box width={"100%"} position={"fixed"} boxShadow={" rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"} zIndex={10} bgColor={"white"}>
        <Navbar />
      </Box>
      <br />
      <br />
      <br />
      <Box>
        <AllRoutes />
      </Box>
    </>
  )
}

export default App
