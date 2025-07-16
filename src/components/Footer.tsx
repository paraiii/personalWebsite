import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        mt: "auto",
        py: 4,
        textAlign: "center",
        color: (theme) => theme.palette.text.secondary,
        backgroundColor: (theme) => theme.palette.background.paper,
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: (theme) =>
            `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
        },
      }}
    >
      <Stack
        direction="row"
        spacing={3}
        justifyContent="center"
        sx={{ mb: 2 }}
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="mailto:bingxin@email.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: (theme) => theme.palette.secondary.main,
            textDecoration: "none",
            "&:hover": {
              color: (theme) => theme.palette.primary.main,
              textShadow: (theme) => `0 0 8px ${theme.palette.primary.main}`,
            },
            transition: "all 0.3s ease",
          }}
        >
          Email
        </Link>
        <Link
          href="https://github.com/username"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: (theme) => theme.palette.secondary.main,
            textDecoration: "none",
            "&:hover": {
              color: (theme) => theme.palette.primary.main,
              textShadow: (theme) => `0 0 8px ${theme.palette.primary.main}`,
            },
            transition: "all 0.3s ease",
          }}
        >
          GitHub
        </Link>
        <Link
          href="https://twitter.com/username"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: (theme) => theme.palette.secondary.main,
            textDecoration: "none",
            "&:hover": {
              color: (theme) => theme.palette.primary.main,
              textShadow: (theme) => `0 0 8px ${theme.palette.primary.main}`,
            },
            transition: "all 0.3s ease",
          }}
        >
          Twitter
        </Link>
        <Link
          href="https://linkedin.com/in/username"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: (theme) => theme.palette.secondary.main,
            textDecoration: "none",
            "&:hover": {
              color: (theme) => theme.palette.primary.main,
              textShadow: (theme) => `0 0 8px ${theme.palette.primary.main}`,
            },
            transition: "all 0.3s ease",
          }}
        >
          LinkedIn
        </Link>
      </Stack>

      <Divider
        sx={{
          my: 2,
          borderColor: (theme) => theme.palette.divider,
          opacity: 0.5,
        }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Typography
          variant="caption"
          display="block"
          sx={{
            mb: 1,
            color: (theme) => theme.palette.text.secondary,
            fontFamily: "monospace",
          }}
        >
          Built with React, TypeScript, and Material-UI
        </Typography>
        <Typography
          variant="caption"
          display="block"
          sx={{
            color: (theme) => theme.palette.text.primary,
            fontFamily: "monospace",
          }}
        >
          © {new Date().getFullYear()} Bingxin
        </Typography>
      </motion.div>
    </Box>
  );
};
