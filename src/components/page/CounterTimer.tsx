// CountdownTimer.tsx
import { keyframes } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useReducer } from "react";

// 动画：数字闪烁
const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

interface TimerState {
  timeLeft: number; // 单位：秒
  isRunning: boolean;
}

const initialState: TimerState = {
  timeLeft: 60 * 25, // 默认 25 分钟
  isRunning: false,
};

function reducer(state: TimerState, action: any): TimerState {
  switch (action.type) {
    case "START":
      return { ...state, isRunning: true };
    case "PAUSE":
      return { ...state, isRunning: false };
    case "RESET":
      return { ...initialState };
    case "TICK":
      return state.timeLeft > 0
        ? { ...state, timeLeft: state.timeLeft - 1 }
        : { ...state, isRunning: false };
    default:
      return state;
  }
}

export const CounterTimer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state.isRunning) {
      interval = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isRunning]);

  const minutes = Math.floor(state.timeLeft / 60);
  const seconds = state.timeLeft % 60;

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="50vh"
      gap={3}
    >
      <Typography
        variant="h2"
        sx={{
          fontFamily: "monospace",
          animation: `${pulse} 1s infinite ease-in-out`,
        }}
      >
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </Typography>

      <Box display="flex" gap={2}>
        <Button
          variant="contained"
          onClick={() =>
            dispatch({ type: state.isRunning ? "PAUSE" : "START" })
          }
        >
          {state.isRunning ? "暂停" : "开始"}
        </Button>
        <Button variant="outlined" onClick={() => dispatch({ type: "RESET" })}>
          重置
        </Button>
      </Box>
    </Box>
  );
};
