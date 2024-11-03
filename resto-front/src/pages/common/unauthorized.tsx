import { Box, Typography } from "@mui/material";

function UnauthorizedPage() {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h4" gutterBottom>
          Accès non autorisé
        </Typography>
        <Typography variant="body1">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </Typography>
      </Box>
    );
  }

  export default UnauthorizedPage;