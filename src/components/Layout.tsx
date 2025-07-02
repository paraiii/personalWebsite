import { Box, Container, useTheme } from "@mui/material";
import React from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import ThemeToggle from "./ThemeToggle";
import WeatherCard from "./WeatherCard";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          backgroundColor: theme.palette.background.paper,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 2px 8px rgba(128, 79, 179, 0.2)"
              : "0 2px 8px rgba(0, 0, 0, 0.1)",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backdropFilter: "blur(10px)",
          borderBottom: "none",
        }}
      >
        <Container maxWidth={false} sx={{ py: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            {/* Weather Card - 变小 */}
            <Box sx={{ flexShrink: 0 }}>
              <WeatherCard />
            </Box>

            {/* Navigation */}
            <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
              <Navigation />
            </Box>

            {/* Theme Toggle */}
            <Box sx={{ flexShrink: 0 }}>
              <ThemeToggle />
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{ flex: 1, display: "flex", flexDirection: "column" }}
      >
        {children}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
