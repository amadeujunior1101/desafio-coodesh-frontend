import { useState } from "react";
import { Box, Container } from "@material-ui/core";
import Header from "../components/Header";
import Table from "../components/table";

function App() {
  const [openLoad, setOpenLoad] = useState(false);

  const handleOpenLoad: Function = (value: boolean) => {
    setOpenLoad(value);
  };

  return (
    <Box component="div">
      {openLoad && (
        <Box
          component="div"
          zIndex="100"
          position="absolute"
          width="100%"
          height="100%"
          bgcolor="#203040"
          justifyContent="center"
          alignItems="center"
          display="flex"
          style={{
            opacity: "0.5",
          }}
        >
          <Box component="span" color="white" fontSize="30">
            Loading...
          </Box>
        </Box>
      )}
      <Box maxWidth="xl" maxHeight="xl">
        <Header />
        <Container maxWidth="lg">
          <Table handleOpenLoad={handleOpenLoad} />
        </Container>
      </Box>
    </Box>
  );
}

export default App;
