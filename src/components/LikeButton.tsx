import styled from "@emotion/styled";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import type { Theme } from "@mui/material";
import { Box, IconButton, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

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
  rotate: number;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
  initialCount = 0,
  // onLike,
  // maxLikes,
}) => {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [bursts, setBursts] = useState<HeartBurst[]>([]);

  useEffect(() => {
    fetch("../../../.netlify/functions/likeCount")
      .then((res) => res.json())
      .then((data) => {
        if (data.count) setCount(data.count);
      });
  }, []);

  const handleClick = async () => {
    try {
      const res = await fetch("../../../.netlify/functions/likeCount", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log("🔥 POST response:", data);

      if (data?.count !== undefined) {
        setCount(data.count);
        setLiked(true);
        createBurst();
      } else {
        console.error("❌ Invalid response:", data);
      }
    } catch (err) {
      console.error("❌ Failed to update like count:", err);
    }
  };

  // const handleClick = () => {
  //   if (maxLikes && count >= maxLikes) return;
  //   const newCount = count + 1;
  //   setCount(newCount);
  //   setLiked(true);
  //   onLike?.(newCount);
  //   createBurst();
  // };

  const createBurst = () => {
    const count = 6; // 每次生成 6 个爱心
    const newBursts: HeartBurst[] = Array.from({ length: count }).map(
      (_, i) => {
        const id = Date.now() + i;
        const angle = Math.random() * 2 * Math.PI;
        const radius = 40 + Math.random() * 60; // 弹出距离
        return {
          id,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          scale: 0.8 + Math.random() * 0.4,
          rotate: Math.random() * 90 - 45, // -45 ~ +45 度
        };
      }
    );

    setBursts((prev) => [...prev, ...newBursts]);

    setTimeout(() => {
      setBursts((prev) =>
        prev.filter((b) => !newBursts.some((n) => n.id === b.id))
      );
    }, 1000);
  };

  return (
    <Box>
      <HeartContainer liked={liked}>
        <IconButton onClick={handleClick}>
          {liked ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <Typography>{count}</Typography>

        <AnimatePresence>
          {bursts.map(({ id, x, y, scale, rotate }) => (
            <BurstHeart
              key={id}
              initial={{ opacity: 1, x: 0, y: 0, scale: 0.6, rotate: 0 }}
              animate={{ opacity: 0, x, y, scale, rotate }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <FavoriteIcon />
            </BurstHeart>
          ))}
        </AnimatePresence>
      </HeartContainer>
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
