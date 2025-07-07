import { Brightness4, Brightness7 } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useThemeToggle } from "../hooks/useThemeToggle";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeToggle();

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    toggleTheme();
  };

  const mode = theme.palette.mode;

  return (
    <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
      <IconButton
        data-testid="theme-toggle"
        onClick={handleClick}
        sx={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 9999,
          backgroundColor: "rgba(128, 79, 179, 0.1)",
          border: "1px solid rgba(128, 79, 179, 0.3)",
          backdropFilter: "blur(10px)",
          width: 48,
          height: 48,
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "rgba(128, 79, 179, 0.2)",
            boxShadow: "0 0 15px rgba(128, 79, 179, 0.4)",
            transform: "scale(1.05)",
          },
          "&:active": {
            transform: "scale(0.95)",
          },
          transition: "all 0.3s ease",
          pointerEvents: "auto",
        }}
      >
        {mode === "light" ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );
};
