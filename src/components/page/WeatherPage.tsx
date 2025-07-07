import {
  Air,
  Favorite,
  FavoriteBorder,
  Opacity,
  Search,
  WbSunny,
} from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Switch,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { useWeather } from "../../hooks/useWeather";

const cities = [
  "Melbourne",
  "Sydney",
  "Brisbane",
  "Perth",
  "Adelaide",
  "Canberra",
  "Darwin",
  "Hobart",
  "New York",
  "London",
  "Tokyo",
  "Paris",
  "Berlin",
  "Moscow",
  "Beijing",
  "Shanghai",
  "San Francisco",
  "Los Angeles",
  "Chicago",
  "Toronto",
  "Vancouver",
];

export const WeatherPage = () => {
  const theme = useTheme();
  const { currentWeather, fetchWeather, loading } = useWeather();
  const [useCelsius, setUseCelsius] = useState(true);
  const [favoriteCities, setFavoriteCities] = useState<string[]>(["Melbourne"]);
  const [searchValue, setSearchValue] = useState("");

  const handleCitySelect = (city: string) => {
    fetchWeather(city);
    setSearchValue("");
  };

  const toggleFavorite = (city: string) => {
    setFavoriteCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city]
    );
  };

  const convertTemperature = (temp: number) => {
    return useCelsius ? temp : (temp * 9) / 5 + 32;
  };

  const getWeatherBackground = () => {
    if (!currentWeather)
      return `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`;

    const description = currentWeather.description.toLowerCase();

    // 晴天相关
    if (description.includes("clear") || description.includes("sunny")) {
      return "linear-gradient(135deg, rgb(166,63,118) 0%, #ffc371 100%)";
    }

    // 多云相关
    if (description.includes("cloud") || description.includes("overcast")) {
      return "linear-gradient(135deg, #4b4f63 0%, #a0a3b1 100%)";
    }

    // 雨天相关
    if (
      description.includes("rain") ||
      description.includes("drizzle") ||
      description.includes("shower")
    ) {
      return "linear-gradient(135deg, #2f3e4e 0%, #5a6373 100%)";
    }

    // 雪天相关
    if (description.includes("snow") || description.includes("freezing")) {
      return "linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)";
    }

    // 雾天相关
    if (description.includes("fog")) {
      return "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)";
    }

    // 雷暴相关
    if (description.includes("thunder")) {
      return "linear-gradient(135deg, #424242 0%, #616161 100%)";
    }

    // 默认背景
    return `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: getWeatherBackground(),
        transition: "background 0.5s ease",
        py: 4,
        paddingLeft: "4rem",
        paddingRight: "4rem",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            color: theme.palette.text.primary,
            textAlign: "center",
            mb: 4,
          }}
        >
          Weather Now
        </Typography>

        {/* 搜索和设置 */}
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              alignItems: "center",
            }}
          >
            <Box sx={{ flex: 1, width: "100%" }}>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Autocomplete
                  freeSolo
                  options={cities}
                  value={searchValue}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      handleCitySelect(newValue);
                    }
                  }}
                  onInputChange={(_, newInputValue) => {
                    setSearchValue(newInputValue);
                  }}
                  onKeyPress={(event) => {
                    if (event.key === "Enter" && searchValue.trim()) {
                      handleCitySelect(searchValue.trim());
                    }
                  }}
                  sx={{ flex: 1 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search for a city..."
                      variant="outlined"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: theme.palette.background.paper,
                          borderColor: theme.palette.divider,
                          "&:hover": {
                            borderColor: theme.palette.primary.main,
                          },
                          "&.Mui-focused": {
                            borderColor: theme.palette.primary.main,
                            boxShadow: `0 0 10px ${theme.palette.primary.main}40`,
                          },
                        },
                      }}
                    />
                  )}
                />
                <Button
                  variant="contained"
                  onClick={() => {
                    if (searchValue.trim()) {
                      handleCitySelect(searchValue.trim());
                    }
                  }}
                  disabled={!searchValue.trim()}
                  sx={{
                    minWidth: "auto",
                    px: 2,
                    backgroundColor: theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  }}
                >
                  <Search />
                </Button>
              </Box>
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={useCelsius}
                    onChange={(e) => setUseCelsius(e.target.checked)}
                    sx={{
                      "& .MuiSwitch-switchBase.Mui-checked": {
                        color: theme.palette.primary.main,
                      },
                      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                        {
                          backgroundColor: theme.palette.primary.main,
                        },
                    }}
                  />
                }
                label={useCelsius ? "°C" : "°F"}
                sx={{ color: theme.palette.text.primary }}
              />
            </Box>
          </Box>
        </Box>

        {/* 收藏城市 */}
        {favoriteCities.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h5"
              sx={{ color: theme.palette.text.primary, mb: 2 }}
            >
              Favorite Cities
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              {favoriteCities.map((city) => (
                <Chip
                  key={city}
                  label={city}
                  onClick={() => handleCitySelect(city)}
                  sx={{
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? "rgba(128, 79, 179, 0.1)"
                        : "rgba(128, 79, 179, 0.05)",
                    color: theme.palette.text.primary,
                    border: `1px solid ${theme.palette.divider}`,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(128, 79, 179, 0.2)"
                          : "rgba(128, 79, 179, 0.1)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* 当前天气卡片 */}
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              py: 4,
            }}
          >
            <CircularProgress sx={{ color: theme.palette.primary.main }} />
          </Box>
        ) : currentWeather ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              sx={{
                mb: 4,
                marginTop: "2rem",
                backgroundColor: theme.palette.background.paper,
                border: `1px solid ${theme.palette.divider}`,
                boxShadow:
                  theme.palette.mode === "dark"
                    ? "0 0 20px rgba(128, 79, 179, 0.2)"
                    : "0 8px 16px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{ color: theme.palette.text.primary, fontWeight: 600 }}
                  >
                    {currentWeather.city}
                  </Typography>
                  <IconButton
                    onClick={() => toggleFavorite(currentWeather.city)}
                    sx={{ color: theme.palette.primary.main }}
                  >
                    {favoriteCities.includes(currentWeather.city) ? (
                      <Favorite />
                    ) : (
                      <FavoriteBorder />
                    )}
                  </IconButton>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 3,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography
                      variant="h1"
                      sx={{
                        color: theme.palette.text.primary,
                        fontWeight: 300,
                        fontSize: "4rem",
                      }}
                    >
                      {Math.round(
                        convertTemperature(currentWeather.temperature)
                      )}
                      °
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {useCelsius ? "C" : "F"}
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "center" }}>
                    <Typography
                      variant="h2"
                      sx={{ fontSize: "3rem", lineHeight: 1 }}
                    >
                      {currentWeather.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ color: theme.palette.text.secondary }}
                    >
                      {currentWeather.description}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 2,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(128, 79, 179, 0.1)"
                          : "rgba(128, 79, 179, 0.05)",
                      borderRadius: 2,
                    }}
                  >
                    <Opacity sx={{ color: theme.palette.primary.main }} />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        Humidity
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: theme.palette.text.primary }}
                      >
                        {currentWeather.humidity}%
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 2,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(128, 79, 179, 0.1)"
                          : "rgba(128, 79, 179, 0.05)",
                      borderRadius: 2,
                    }}
                  >
                    <Air sx={{ color: theme.palette.primary.main }} />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        Wind Speed
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: theme.palette.text.primary }}
                      >
                        {currentWeather.windSpeed} km/h
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      p: 2,
                      backgroundColor:
                        theme.palette.mode === "dark"
                          ? "rgba(128, 79, 179, 0.1)"
                          : "rgba(128, 79, 179, 0.05)",
                      borderRadius: 2,
                    }}
                  >
                    <WbSunny sx={{ color: theme.palette.primary.main }} />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.text.secondary }}
                      >
                        Feels Like
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: theme.palette.text.primary }}
                      >
                        {Math.round(
                          convertTemperature(currentWeather.feelsLike)
                        )}
                        °
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", color: theme.palette.text.secondary }}
          >
            No weather data available
          </Typography>
        )}
      </motion.div>
    </Box>
  );
};
