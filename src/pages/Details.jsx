import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";


function Details() {

  const { id } = useParams();

  const videoRef = useRef(null);
  const photoCanvasRef = useRef(null);
  const signCanvasRef = useRef(null);

  const [employee, setEmployee] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [drawing, setDrawing] = useState(false);

  // Fetch employee + load saved photo
  useEffect(() => {

    fetch("https://backend.jotish.in/backend_dev/gettabledata.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "test",
        password: "123456"
      })
    })
      .then(res => res.json())
      .then(data => {

        const tableData = data?.TABLE_DATA?.data || [];
        const emp = tableData.find(e => e[3] === id);

        setEmployee(emp);

      });

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });

    const savedPhoto = localStorage.getItem(`employeePhoto_${id}`);
    if (savedPhoto) setPhoto(savedPhoto);

  }, [id]);

  // Restore signature
  useEffect(() => {

    const canvas = signCanvasRef.current;
    if (!canvas) return;

    const savedSignature = localStorage.getItem(`employeeSignature_${id}`);

    if (savedSignature) {

      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.src = savedSignature;

      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };

    }

  }, [id]);

  // Capture Photo
  const capturePhoto = () => {

    const canvas = photoCanvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(videoRef.current, 0, 0, 400, 300);

    const image = canvas.toDataURL();

    setPhoto(image);

    localStorage.setItem(`employeePhoto_${id}`, image);

  };

  // Signature drawing
  const startDrawing = () => {
    setDrawing(true);
    const ctx = signCanvasRef.current.getContext("2d");
    ctx.beginPath();
  };

  const stopDrawing = () => {

    setDrawing(false);

    const canvas = signCanvasRef.current;

    const image = canvas.toDataURL();

    localStorage.setItem(`employeeSignature_${id}`, image);

  };

  const draw = (e) => {

    if (!drawing) return;

    const canvas = signCanvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const ctx = canvas.getContext("2d");

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctx.lineTo(x, y);
    ctx.stroke();

  };

  // Merge photo + signature
  const mergeImages = () => {

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 400;
    canvas.height = 500;

    const photoImg = new Image();
    photoImg.src = photo;

    photoImg.onload = () => {

      ctx.drawImage(photoImg, 0, 0, 400, 300);

      const signCanvas = signCanvasRef.current;

      ctx.drawImage(signCanvas, 0, 300);

      const finalImage = canvas.toDataURL();

      localStorage.setItem(`mergedImage_${id}`, finalImage);

      alert("Photo + Signature merged!");

    };

  };

  if (!employee) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (

    <div className="min-h-screen flex justify-center bg-gray-100 p-6">

      <div className="bg-white shadow-lg rounded-lg p-8 w-[600px]">

        <h2 className="text-xl font-bold text-center mb-4">
          Employee Profile
        </h2>

        <hr className="mb-4"/>

        {/* Profile Photo */}

        <div className="flex flex-col items-center">

          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200">

            {photo ? (
              <img src={photo} alt="profile"/>
            ) : (
              <div className="flex items-center justify-center h-full">
                No Photo
              </div>
            )}

          </div>

        </div>

        {/* Employee Info */}

        <div className="mt-6 space-y-2">

          <p><b>Name:</b> {employee[0]}</p>
          <p><b>Department:</b> {employee[1]}</p>
          <p><b>City:</b> {employee[2]}</p>
          <p><b>ID:</b> {employee[3]}</p>
          <p><b>Date:</b> {employee[4]}</p>
          <p><b>Salary:</b> ₹{employee[5]}</p>

        </div>

        <hr className="my-6"/>

        {/* Camera */}

        <h3 className="font-semibold mb-2">Camera</h3>

        {!photo && (
          <>
            <video ref={videoRef} autoPlay width="400" className="border rounded"/>

            <button
              onClick={capturePhoto}
              className="mt-3 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Capture Photo
            </button>
          </>
        )}

        {photo && (
          <button
            onClick={() => {
              setPhoto(null)
              localStorage.removeItem(`employeePhoto_${id}`)
            }}
            className="mt-3 bg-gray-500 text-white px-4 py-2 rounded"
          >
            Click Again
          </button>
        )}

        <canvas ref={photoCanvasRef} width="400" height="300" className="hidden"/>

        <hr className="my-6"/>

        {/* Signature */}

        <h3 className="font-semibold mb-2">Signature</h3>

        <canvas
          ref={signCanvasRef}
          width="400"
          height="150"
          className="border"
          onMouseDown={startDrawing}
          onMouseUp={stopDrawing}
          onMouseMove={draw}
        />

        <button
          onClick={() => {

            const canvas = signCanvasRef.current
            const ctx = canvas.getContext("2d")

            ctx.clearRect(0,0,400,150)

            localStorage.removeItem(`employeeSignature_${id}`)

          }}
          className="mt-3 bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Signature
        </button>

        <button
          onClick={mergeImages}
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
        >
          Merge Photo + Signature
        </button>

      </div>

    </div>

  );
}

export default Details;