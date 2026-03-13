import { useRef } from "react"




function SignatureCanvas() {

 const canvasRef = useRef()

 let drawing = false

 const start = () => drawing = true
 const end = () => drawing = false

 const draw = (e) => {

  if (!drawing) return

  const ctx = canvasRef.current.getContext("2d")

  ctx.lineWidth = 2
  ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  ctx.stroke()
 }

 return (
  <canvas
   ref={canvasRef}
   width={400}
   height={200}
   className="border"
   onMouseDown={start}
   onMouseUp={end}
   onMouseMove={draw}
  />
 )
}

export default SignatureCanvas