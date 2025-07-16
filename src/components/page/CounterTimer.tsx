// CountdownTimer.tsx
import { keyframes } from "@emotion/react";
import {
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useReducer, useState } from "react";

// 动画：数字闪烁
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

interface TimerState {
  timeLeft: number; // 单位：秒
  isRunning: boolean;
  mode: "countdown" | "countup";
  targetTime: number; // 目标时间（倒计时用）
}

type TimerAction =
  | { type: "START" }
  | { type: "PAUSE" }
  | { type: "RESET" }
  | { type: "TICK" }
  | { type: "SET_MODE"; payload: "countdown" | "countup" }
  | { type: "SET_TARGET_TIME"; payload: number };

const initialState: TimerState = {
  timeLeft: 60 * 25, // 默认 25 分钟
  isRunning: false,
  mode: "countdown",
  targetTime: 60 * 25,
};

function reducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true };
    case "PAUSE":
      return { ...state, isRunning: false };
    case "RESET":
      if (state.mode === "countdown") {
        return {
          ...state,
          timeLeft: state.targetTime,
          isRunning: false,
        };
      } else {
        return {
          ...state,
          timeLeft: 0,
          isRunning: false,
        };
      }
    case "TICK":
      if (state.mode === "countdown") {
        return state.timeLeft > 0
          ? { ...state, timeLeft: state.timeLeft - 1 }
          : { ...state, isRunning: false };
      } else {
        // 正计时模式
        return { ...state, timeLeft: state.timeLeft + 1 };
      }
    case "SET_MODE": {
      let initialTime = 0;
      if (action.payload === "countdown") {
        initialTime = state.targetTime;
      }

      return {
        ...state,
        mode: action.payload,
        timeLeft: initialTime,
        isRunning: false,
      };
    }
    case "SET_TARGET_TIME":
      return {
        ...state,
        targetTime: action.payload,
        timeLeft: state.mode === "countdown" ? action.payload : state.timeLeft,
        isRunning: false,
      };
    default:
      return state;
  }
}

export const CounterTimer: React.FC = () => {
  const theme = useTheme();
  const [state, dispatch] = useReducer(reducer, initialState);
  const [customTime, setCustomTime] = useState({
    hours: 0,
    minutes: 25,
    seconds: 0,
  });

  useEffect(() => {
    let interval: number;
    if (state.isRunning) {
      interval = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isRunning]);

  const handleModeChange = (mode: "countdown" | "countup") => {
    dispatch({ type: "SET_MODE", payload: mode });
  };

  const handleTimeChange = () => {
    const totalSeconds =
      customTime.hours * 3600 + customTime.minutes * 60 + customTime.seconds;
    dispatch({ type: "SET_TARGET_TIME", payload: totalSeconds });
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    const modes: ("countdown" | "countup")[] = ["countdown", "countup"];
    handleModeChange(modes[newValue]);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      gap={4}
      sx={{ p: 3 }}
    >
      {/* 顶部 Tab 切换区 */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.05)",
          backdropFilter: "blur(10px)",
          border: `1px solid ${
            theme.palette.mode === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)"
          }`,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <Tabs
          value={state.mode === "countdown" ? 0 : 1}
          onChange={handleTabChange}
          sx={{
            "& .MuiTab-root": {
              color: theme.palette.text.secondary,
              fontWeight: 500,
              fontSize: "1rem",
              textTransform: "none",
              minWidth: 120,
              "&.Mui-selected": {
                color: theme.palette.primary.main,
              },
            },
            "& .MuiTabs-indicator": {
              backgroundColor: theme.palette.primary.main,
              height: 3,
            },
          }}
        >
          <Tab label="Count Down" />
          <Tab label="Count Up" />
        </Tabs>
      </Paper>

      {/* 时间输入区 - 仅在倒计时模式显示 */}
      {state.mode === "countdown" && (
        <Paper
          elevation={0}
          sx={{
            backgroundColor:
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.05)"
                : "rgba(0, 0, 0, 0.05)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${
              theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            }`,
            borderRadius: 3,
            p: 3,
          }}
        >
          <Box display="flex" gap={2} alignItems="center">
            <TextField
              label="Hours"
              type="number"
              size="small"
              value={customTime.hours}
              onChange={(e) =>
                setCustomTime((prev) => ({
                  ...prev,
                  hours: Number(e.target.value),
                }))
              }
              sx={{
                width: 80,
                "& .MuiOutlinedInput-root": {
                  color: theme.palette.text.primary,
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.text.secondary,
                },
              }}
            />
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              :
            </Typography>
            <TextField
              label="Minutes"
              type="number"
              size="small"
              value={customTime.minutes}
              onChange={(e) =>
                setCustomTime((prev) => ({
                  ...prev,
                  minutes: Number(e.target.value),
                }))
              }
              sx={{
                width: 80,
                "& .MuiOutlinedInput-root": {
                  color: theme.palette.text.primary,
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.text.secondary,
                },
              }}
            />
            <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
              :
            </Typography>
            <TextField
              label="Seconds"
              type="number"
              size="small"
              value={customTime.seconds}
              onChange={(e) =>
                setCustomTime((prev) => ({
                  ...prev,
                  seconds: Number(e.target.value),
                }))
              }
              sx={{
                width: 80,
                "& .MuiOutlinedInput-root": {
                  color: theme.palette.text.primary,
                  "& fieldset": {
                    borderColor: theme.palette.divider,
                  },
                },
                "& .MuiInputLabel-root": {
                  color: theme.palette.text.secondary,
                },
              }}
            />
            <Button
              variant="outlined"
              onClick={handleTimeChange}
              sx={{
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
                "&:hover": {
                  borderColor: theme.palette.primary.dark,
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                },
              }}
            >
              Set Time
            </Button>
          </Box>
        </Paper>
      )}

      {/* 中间时间显示区 */}
      <Paper
        elevation={0}
        sx={{
          backgroundColor: theme.palette.glass.background,
          border: `1px solid ${theme.palette.glass.border}`,
          boxShadow: theme.palette.glass.shadow,
          backdropFilter: "blur(10px)",
          borderRadius: 4,
          p: 4,
          minWidth: 400,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontFamily: "monospace",
            color: theme.palette.text.primary,
            animation: state.isRunning
              ? `${pulse} 1s infinite ease-in-out`
              : "none",
            fontWeight: 300,
            letterSpacing: "0.1em",
            fontSize: "4rem",
            lineHeight: 1,
          }}
        >
          {formatTime(state.timeLeft)}
        </Typography>
      </Paper>

      {/* 底部按钮区 */}
      <Box display="flex" gap={3}>
        <Button
          variant="contained"
          size="large"
          onClick={() =>
            dispatch({ type: state.isRunning ? "PAUSE" : "START" })
          }
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: 500,
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              transform: "translateY(-2px)",
              boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
            },
          }}
        >
          {state.isRunning ? "PAUSE" : "START"}
        </Button>
        <Button
          variant="outlined"
          size="large"
          onClick={() => dispatch({ type: "RESET" })}
          sx={{
            borderColor: theme.palette.primary.main,
            color: theme.palette.primary.main,
            borderRadius: 3,
            px: 4,
            py: 1.5,
            fontSize: "1.1rem",
            fontWeight: 500,
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              borderColor: theme.palette.primary.dark,
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              transform: "translateY(-2px)",
              boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
            },
          }}
        >
          RESET
        </Button>
      </Box>

      {/* 模式说明 */}
      <Typography
        variant="body2"
        sx={{
          color: theme.palette.text.secondary,
          textAlign: "center",
          maxWidth: 400,
          opacity: 0.8,
        }}
      >
        {state.mode === "countup"
          ? "Count Up: Timer counts up from zero, useful for tracking elapsed time"
          : "Countdown: Timer counts down from the set time to zero"}
      </Typography>
    </Box>
  );
};
