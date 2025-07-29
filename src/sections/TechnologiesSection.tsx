import { Box, Container, Paper, Typography, useTheme } from "@mui/material";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";
import React from "react";
import { techList } from "../data/techList";

export const TechnologiesSection: React.FC = () => {
  const theme = useTheme();

  const cardVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.2 },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h4"
        component="h4"
        align="left"
        sx={{ mb: 6, fontWeight: "bold" }}
      >
        Technologies
      </Typography>
      <Grid container spacing={2} justifyContent="start">
        {techList.map((tech, index) => (
          <Grid key={index} size={{ xs: 6, sm: 4, md: 3 }}>
            <a
              href={tech.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Learn more about ${tech.name}`}
              style={{ textDecoration: "none" }}
            >
              <motion.div
                variants={cardVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
              >
                <Paper
                  sx={{
                    width: 128,
                    height: 128,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    cursor: "pointer",
                    backgroundColor: theme.palette.background.paper,
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 2,
                  }}
                >
                  <Box
                    component="img"
                    src={tech.icon}
                    alt={`${tech.name} logo`}
                    sx={{
                      width: 48,
                      height: 48,
                      objectFit: "contain",
                    }}
                  />
                  <Typography
                    variant="body2"
                    component="h3"
                    sx={{
                      fontWeight: "medium",
                      color: theme.palette.text.primary,
                      textAlign: "center",
                    }}
                  >
                    {tech.name}
                  </Typography>
                </Paper>
              </motion.div>
            </a>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
