import React, { useEffect, useRef, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
}

interface SnakeAnimationProps {
  segmentCount?: number;
  dotSize?: number;
  gapSize?: number;
  baseSpeed?: number;
  color?: string;
  opacity?: number;
  borderMargin?: number;
}

const SnakeAnimation: React.FC<SnakeAnimationProps> = ({
  segmentCount = 80,
  dotSize = 4,
  gapSize = 8,
  baseSpeed = 3,
  color = '#8338ec',
  opacity = 0.2,
  borderMargin = 30,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const snakeRef = useRef<Point[]>([]);
  const positionRef = useRef<number>(0); // Position along the border path (0 to totalPerimeter)

  // Get the border path corners
  const getBorderPath = useCallback((width: number, height: number) => {
    const margin = borderMargin;
    return {
      topLeft: { x: margin, y: margin },
      topRight: { x: width - margin, y: margin },
      bottomRight: { x: width - margin, y: height - margin },
      bottomLeft: { x: margin, y: height - margin },
      width: width - margin * 2,
      height: height - margin * 2,
      perimeter: (width - margin * 2) * 2 + (height - margin * 2) * 2,
    };
  }, [borderMargin]);

  // Convert a position along the perimeter to x,y coordinates
  const perimeterToPoint = useCallback((position: number, width: number, height: number): Point => {
    const path = getBorderPath(width, height);
    const { topLeft, topRight, bottomRight, bottomLeft } = path;

    // Normalize position to be within perimeter
    let pos = position % path.perimeter;
    if (pos < 0) pos += path.perimeter;

    const topEdge = path.width;
    const rightEdge = topEdge + path.height;
    const bottomEdge = rightEdge + path.width;
    // const leftEdge = bottomEdge + path.height; // Full perimeter

    if (pos <= topEdge) {
      // Top edge: left to right
      return { x: topLeft.x + pos, y: topLeft.y };
    } else if (pos <= rightEdge) {
      // Right edge: top to bottom
      const edgePos = pos - topEdge;
      return { x: topRight.x, y: topRight.y + edgePos };
    } else if (pos <= bottomEdge) {
      // Bottom edge: right to left
      const edgePos = pos - rightEdge;
      return { x: bottomRight.x - edgePos, y: bottomRight.y };
    } else {
      // Left edge: bottom to top
      const edgePos = pos - bottomEdge;
      return { x: bottomLeft.x, y: bottomLeft.y - edgePos };
    }
  }, [getBorderPath]);

  // Initialize snake on the border
  const initializeSnake = useCallback((width: number, height: number) => {
    const path = getBorderPath(width, height);
    const snake: Point[] = [];
    const segmentSpacing = 6;

    positionRef.current = 0;

    for (let i = 0; i < segmentCount; i++) {
      const pos = (positionRef.current - i * segmentSpacing + path.perimeter) % path.perimeter;
      snake.push(perimeterToPoint(pos, width, height));
    }

    snakeRef.current = snake;
  }, [segmentCount, getBorderPath, perimeterToPoint]);

  // Draw dotted line for snake body
  const drawSnake = useCallback((ctx: CanvasRenderingContext2D, snake: Point[]) => {
    if (snake.length < 2) return;

    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = dotSize;
    ctx.lineCap = 'round';
    ctx.setLineDash([dotSize, gapSize]);

    // Draw the snake path with gradient opacity
    for (let i = 0; i < snake.length - 1; i++) {
      const progress = i / snake.length;
      ctx.globalAlpha = opacity * (1 - progress * 0.6);

      ctx.beginPath();
      ctx.moveTo(snake[i].x, snake[i].y);
      ctx.lineTo(snake[i + 1].x, snake[i + 1].y);
      ctx.stroke();
    }

    // Draw head with glow effect
    ctx.setLineDash([]);
    ctx.globalAlpha = opacity * 1.8;

    // Outer glow
    ctx.beginPath();
    ctx.arc(snake[0].x, snake[0].y, dotSize * 2.5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity * 0.3;
    ctx.fill();

    // Inner head
    ctx.beginPath();
    ctx.arc(snake[0].x, snake[0].y, dotSize * 1.5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.globalAlpha = opacity * 2;
    ctx.fill();

    ctx.restore();
  }, [color, dotSize, gapSize, opacity]);

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const snake = snakeRef.current;
    if (snake.length === 0) {
      initializeSnake(width, height);
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    const path = getBorderPath(width, height);

    // Update position along the border (clockwise movement)
    positionRef.current += baseSpeed;

    // Keep position within bounds
    if (positionRef.current >= path.perimeter) {
      positionRef.current -= path.perimeter;
    }

    // Update snake segments
    const segmentSpacing = 6;
    const newSnake: Point[] = [];

    for (let i = 0; i < segmentCount; i++) {
      let pos = positionRef.current - i * segmentSpacing;
      // Normalize position
      pos = ((pos % path.perimeter) + path.perimeter) % path.perimeter;
      newSnake.push(perimeterToPoint(pos, width, height));
    }

    snakeRef.current = newSnake;

    // Draw the snake
    drawSnake(ctx, newSnake);

    animationRef.current = requestAnimationFrame(animate);
  }, [initializeSnake, getBorderPath, perimeterToPoint, drawSnake, segmentCount, baseSpeed]);

  // Handle canvas resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { innerWidth, innerHeight } = window;
    const dpr = window.devicePixelRatio || 1;

    canvas.width = innerWidth * dpr;
    canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`;
    canvas.style.height = `${innerHeight}px`;

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    // Re-initialize snake on resize
    initializeSnake(innerWidth, innerHeight);
  }, [initializeSnake]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    // Start animation
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [handleResize, animate]);

  return (
    <canvas
      ref={canvasRef}
      className="snake-canvas"
      aria-hidden="true"
    />
  );
};

export default SnakeAnimation;
