import { Box, Container, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const HeroSection: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, ${
              theme.palette.mode === "dark"
                ? "rgba(128, 79, 179, 0.1)"
                : "rgba(128, 79, 179, 0.05)"
            } 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${
              theme.palette.mode === "dark"
                ? "rgba(77, 146, 255, 0.1)"
                : "rgba(77, 146, 255, 0.05)"
            } 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${
              theme.palette.mode === "dark"
                ? "rgba(255, 102, 231, 0.08)"
                : "rgba(255, 102, 231, 0.03)"
            } 0%, transparent 50%)
          `,
          zIndex: 0,
        },
        "&::after": {
          content: '""',
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "300px",
          height: "300px",
          background: `
            conic-gradient(from 0deg, transparent, ${
              theme.palette.mode === "dark"
                ? "rgba(128, 79, 179, 0.1)"
                : "rgba(128, 79, 179, 0.05)"
            }, transparent, ${
            theme.palette.mode === "dark"
              ? "rgba(77, 146, 255, 0.1)"
              : "rgba(77, 146, 255, 0.05)"
          }, transparent)
          `,
          borderRadius: "50%",
          animation: "rotate 20s linear infinite",
          zIndex: 0,
        },
        "@keyframes rotate": {
          "0%": { transform: "translate(-50%, -50%) rotate(0deg)" },
          "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            textAlign: "center",
            maxWidth: "800px",
            mx: "auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: {
                  xs: "2.5rem",
                  sm: "3.5rem",
                  md: "4rem",
                  lg: "4.5rem",
                },
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow:
                  theme.palette.mode === "dark"
                    ? `0 0 20px ${theme.palette.primary.main}40`
                    : "none",
              }}
            >
              Bingxin Zhang
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Typography
              variant="h2"
              component="h2"
              sx={{
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" },
                fontWeight: 500,
                color: theme.palette.text.secondary,
                mb: 3,
                maxWidth: "600px",
                mx: "auto",
              }}
            >
              Software Engineer & Creative Developer
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: "1rem", sm: "1.125rem" },
                color: theme.palette.text.secondary,
                maxWidth: "500px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              Crafting digital experiences with clean code and innovative
              design. Passionate about building scalable solutions that make a
              difference.
            </Typography>
          </motion.div>

          {/* 抽象赛博图元素 */}
          <Box
            sx={{
              position: "absolute",
              top: "20%",
              right: "10%",
              width: "100px",
              height: "100px",
              border: `2px solid ${
                theme.palette.mode === "dark"
                  ? "rgba(128, 79, 179, 0.3)"
                  : "rgba(128, 79, 179, 0.2)"
              }`,
              borderRadius: "50%",
              animation: "pulse 3s ease-in-out infinite",
              zIndex: -1,
              "@keyframes pulse": {
                "0%, 100%": {
                  transform: "scale(1)",
                  opacity: 0.5,
                },
                "50%": {
                  transform: "scale(1.1)",
                  opacity: 0.8,
                },
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: "30%",
              left: "15%",
              width: "60px",
              height: "60px",
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              borderRadius: "4px",
              transform: "rotate(45deg)",
              animation: "float 4s ease-in-out infinite",
              zIndex: 0,
              "@keyframes float": {
                "0%, 100%": { transform: "rotate(45deg) translateY(0px)" },
                "50%": { transform: "rotate(45deg) translateY(-10px)" },
              },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "60%",
              right: "20%",
              width: "80px",
              height: "2px",
              background: `linear-gradient(90deg, transparent, ${theme.palette.primary.main}, transparent)`,
              animation: "scan 2s ease-in-out infinite",
              zIndex: 0,
              "@keyframes scan": {
                "0%": { opacity: 0, transform: "scaleX(0)" },
                "50%": { opacity: 1, transform: "scaleX(1)" },
                "100%": { opacity: 0, transform: "scaleX(0)" },
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
