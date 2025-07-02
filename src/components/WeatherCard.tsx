import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { Box, Skeleton, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useWeather } from "../hooks/useWeather";

const WeatherCard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { currentWeather, loading } = useWeather();

  const getWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case "sunny":
        return "☀️";
      case "cloudy":
        return "☁️";
      case "rainy":
        return "🌧️";
      case "partly cloudy":
        return "⛅";
      default:
        return "🌤️";
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: "8px 12px",
          backgroundColor: theme.palette.background.default,
          borderRadius: 2,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 2px 8px rgba(128, 79, 179, 0.15)"
              : "0 2px 8px rgba(0, 0, 0, 0.08)",
          minWidth: "140px",
          maxWidth: "160px",
        }}
      >
        <Skeleton variant="circular" width={20} height={20} />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Skeleton variant="text" width="60%" height={16} />
          <Skeleton variant="text" width="40%" height={14} />
        </Box>
      </Box>
    );
  }

  if (!currentWeather) {
    return (
      <Box
        onClick={() => navigate("/weather")}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: "8px 12px",
          backgroundColor: theme.palette.background.default,
          borderRadius: 2,
          cursor: "pointer",
          transition: "all 0.3s ease",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 2px 8px rgba(128, 79, 179, 0.15)"
              : "0 2px 8px rgba(0, 0, 0, 0.08)",
          border: "none",
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow:
              theme.palette.mode === "dark"
                ? "0 4px 12px rgba(128, 79, 179, 0.25)"
                : "0 4px 12px rgba(0, 0, 0, 0.12)",
          },
          minWidth: "140px",
          maxWidth: "160px",
        }}
      >
        <WbSunnyIcon
          sx={{
            fontSize: "1.2rem",
            color: theme.palette.mode === "dark" ? "#ffd700" : "#f59e0b",
          }}
        />
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.primary,
              fontWeight: 500,
              fontSize: "0.75rem",
              lineHeight: 1,
              display: "block",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            Loading...
          </Typography>
          <Typography
            variant="caption"
            sx={{
              color: theme.palette.text.secondary,
              fontSize: "0.7rem",
              lineHeight: 1,
              display: "block",
            }}
          >
            --
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      onClick={() => navigate("/weather")}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        padding: "8px 12px",
        backgroundColor: theme.palette.background.default,
        borderRadius: 2,
        cursor: "pointer",
        transition: "all 0.3s ease",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0 2px 8px rgba(128, 79, 179, 0.15)"
            : "0 2px 8px rgba(0, 0, 0, 0.08)",
        border: "none",
        "&:hover": {
          transform: "translateY(-1px)",
          boxShadow:
            theme.palette.mode === "dark"
              ? "0 4px 12px rgba(128, 79, 179, 0.25)"
              : "0 4px 12px rgba(0, 0, 0, 0.12)",
        },
        minWidth: "140px",
        maxWidth: "160px",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.2rem",
          lineHeight: 1,
        }}
      >
        {getWeatherIcon(currentWeather.description)}
      </Typography>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.primary,
            fontWeight: 500,
            fontSize: "0.75rem",
            lineHeight: 1,
            display: "block",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {currentWeather.city === "Current Location"
            ? "Current"
            : currentWeather.city}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.text.secondary,
            fontSize: "0.7rem",
            lineHeight: 1,
            display: "block",
          }}
        >
          {Math.round(currentWeather.temperature)}°C
        </Typography>
      </Box>
    </Box>
  );
};

export default WeatherCard;
