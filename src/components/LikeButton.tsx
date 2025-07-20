import styled from "@emotion/styled";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { Theme } from "@mui/material";
import { Box, IconButton, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

interface LikeButtonProps {
  initialCount?: number;
  onLike?: (newCount: number) => void;
  maxLikes?: number;
}
interface HeartBurst {
  id: number;
  x: number;
  y: number;
  scale: number;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  initialCount = 0,
  onLike,
  maxLikes,
}) => {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [bursts, setBursts] = useState<HeartBurst[]>([]);

  const handleClick = () => {
    if (maxLikes && count >= maxLikes) return;
    const newCount = count + 1;
    setCount(newCount);
    setLiked(true);
    onLike?.(newCount);
    createBurst();
  };

  const createBurst = () => {
    const id = Date.now();
    const newBurst: HeartBurst = {
      id,
      x: (Math.random() - 0.5) * 40,
      y: (Math.random() - 1) * 20,
      scale: 0.8 + Math.random() * 0.6,
    };
    setBursts((prev) => [...prev, newBurst]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1000);
  };

  return (
    <Box>
      <HeartContainer liked={liked}>
        <IconButton onClick={handleClick}>
          {liked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <Typography>{count}</Typography>
      </HeartContainer>
      <AnimatePresence>
        {bursts.map(({ id, x, y, scale }) => (
          <BurstHeart
            key={id}
            initial={{ opacity: 1, x: 0, y: 0, scale }}
            animate={{ opacity: 0, x, y }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <FavoriteIcon />
          </BurstHeart>
        ))}
      </AnimatePresence>
    </Box>
  );
};

const HeartContainer = styled(Box)<{ liked: boolean }>(({ theme, liked }) => ({
  color: liked
    ? "#FF5C8D"
    : (theme as Theme).palette.mode === "dark"
    ? "#fff"
    : "#000",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
}));

const BurstHeart = styled(motion.div)(({ theme }) => ({
  position: "absolute",
  fontSize: "0.5em",
  gap: (theme as Theme).spacing(1),
}));
