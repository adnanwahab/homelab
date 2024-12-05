import React from "react";
function OverHeadMap() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [roomba, setRoomba] = React.useState({
      x: 50,
      y: 50,
      radius: 15,
      speed: 5
    });
    const targetPositionRef = React.useRef<{ x: number; y: number } | null>(null);
  
    const furniture = [
      { x: 50, y: 50, width: 100, height: 50, color: '#c0c0c0' },  // Couch
      { x: 250, y: 200, width: 80, height: 80, color: '#c0c0c0' }  // Table
    ];
  
    const drawScene = React.useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
  
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      // Draw floor
      ctx.fillStyle = '#f0f0f0';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  
      // Draw walls
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 4;
      ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
  
      // Draw furniture
      furniture.forEach(item => {
        ctx.fillStyle = item.color;
        ctx.fillRect(item.x, item.y, item.width, item.height);
      });
  
      // Draw roomba
      ctx.beginPath();
      ctx.fillStyle = 'blue';
      ctx.arc(roomba.x, roomba.y, roomba.radius, 0, Math.PI * 2);
      ctx.fill();
  
      // Draw target if exists
      if (targetPositionRef.current) {
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255,0,0,0.5)';
        ctx.arc(targetPositionRef.current.x, targetPositionRef.current.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }
    }, [roomba]);
  
    const moveRoomba = React.useCallback(() => {
      if (!targetPositionRef.current) return;
  
      const target = targetPositionRef.current;
      const dx = target.x - roomba.x;
      const dy = target.y - roomba.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
  
      if (distance <= roomba.speed) {
        setRoomba(prev => ({
          ...prev,
          x: target.x,
          y: target.y
        }));
        targetPositionRef.current = null;
        return;
      }
  
      const moveX = (dx / distance) * roomba.speed;
      const moveY = (dy / distance) * roomba.speed;
  
      setRoomba(prev => ({
        ...prev,
        x: prev.x + moveX,
        y: prev.y + moveY
      }));
    }, [roomba]);
  
    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
  
      const handleClick = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        targetPositionRef.current = { x, y };
      };
  
      canvas.addEventListener('click', handleClick);
      return () => canvas.removeEventListener('click', handleClick);
    }, []);
  
    React.useEffect(() => {
      let animationId: number;
      
      const gameLoop = () => {
        moveRoomba();
        drawScene();
        animationId = requestAnimationFrame(gameLoop);
      };
  
      gameLoop();
      return () => cancelAnimationFrame(animationId);
    }, [moveRoomba, drawScene]);
  
    return (
      <div className="flex justify-center items-center bg-[#f0f0f0]">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="border-2 border-[#333]"
        />
      </div>
    );
  }

  export default OverHeadMap