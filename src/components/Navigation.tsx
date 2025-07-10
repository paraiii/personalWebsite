import { Tab, Tabs, useTheme } from "@mui/material";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Navigation: React.FC = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(newValue);
  };

  // 根据当前路径确定active tab
  const getCurrentTab = () => {
    const path = location.pathname;
    switch (path) {
      case "/":
        return "/";
      case "/about":
        return "/about";
      case "/projects":
        return "/projects";
      case "/resume":
        return "/resume";
      case "/playground":
        return "/playground";
      case "/weather":
        return "/weather";
      case "/timer":
        return "/timer";
      case "/test":
        return "/test";
      default:
        return "/";
    }
  };

  return (
    <Tabs
      value={getCurrentTab()}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons="auto"
      sx={{
        "& .MuiTabs-indicator": {
          backgroundColor: theme.palette.primary.main,
          height: 3,
          borderRadius: 2,
        },
        "& .MuiTab-root": {
          color: theme.palette.text.secondary,
          fontWeight: 500,
          textTransform: "none",
          minWidth: "auto",
          px: 2,
          "&.Mui-selected": {
            color: theme.palette.primary.main,
          },
          "&:hover": {
            color: theme.palette.text.primary,
          },
        },
      }}
    >
      <Tab label="Home" value="/" />
      <Tab label="More About Me" value="/about" />
      <Tab label="Past Projects" value="/projects" />
      <Tab label="Resume" value="/resume" />
      <Tab label="Playground" value="/playground" />
      <Tab label="Weather Now" value="/weather" />
      <Tab label="Counter Timer" value="/timer" />
      {/* <Tab label="Test" value="/test" /> */}
    </Tabs>
  );
};
