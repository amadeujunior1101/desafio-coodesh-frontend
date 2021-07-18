import { Box, Avatar } from "@material-ui/core";

export default function Home() {
  return (
    <Box
      bgcolor="#24292e"
      alignItems="center"
      justifyContent="space-between"
      display="flex"
      maxWidth="xl"
    >
      <Box
        alignItems="center"
        justifyContent="space-between"
        display="flex"
        m={2}
      >
        <Box mr={1} style={{ background: "#FFFFFF" }}>
          <Avatar variant="square">H</Avatar>
        </Box>
        <Box style={{ color: "#FFFFFF" }}>Empresa</Box>
      </Box>
      <Box mr={2}>
        <Avatar>H</Avatar>
      </Box>
    </Box>
  );
}
