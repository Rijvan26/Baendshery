import { FaceMesh } from "@mediapipe/face_mesh"
import { Camera } from "@mediapipe/camera_utils"

export function detectExpression(landmarks) {

  const leftMouth = landmarks[61]
  const rightMouth = landmarks[291]

  const topLip = landmarks[13]
  const bottomLip = landmarks[14]

  const topEye = landmarks[159]
  const bottomEye = landmarks[145]

  const forehead = landmarks[10]
  const chin = landmarks[152]

  const faceHeight = Math.abs(forehead.y - chin.y)

  const mouthWidth =
    Math.abs(leftMouth.x - rightMouth.x) / faceHeight

  const mouthOpen =
    Math.abs(topLip.y - bottomLip.y) / faceHeight

  const eyeOpen =
    Math.abs(topEye.y - bottomEye.y) / faceHeight

  return {
    mouthWidth,
    mouthOpen,
    eyeOpen
  }
}

export function classifyExpression({
  mouthWidth,
  mouthOpen,
  eyeOpen
}) {

  if (mouthOpen > 0.075 && eyeOpen > 0.045) {
    return {
      emoji: "😲",
      label: "Surprised"
    }
  }

  if (mouthWidth > 0.02 && mouthOpen > 0.05) {
    return {
      emoji: "😄",
      label: "Happy"
    }
  }

  if (eyeOpen < 0.00005 && mouthOpen < 0.00008) {
    return {
      emoji: "😑",
      label: "Sad / Tired"
    }
  }

  return {
    emoji: "😐",
    label: "Neutral"
  }
}

export function drawMesh(canvas, video, landmarks) {

  if (!canvas || !video) return

  canvas.width = video.videoWidth || 640
  canvas.height = video.videoHeight || 480

  const ctx = canvas.getContext("2d")

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Futuristic glow effect
  ctx.fillStyle = "rgba(167, 139, 250, 0.8)"
  ctx.shadowBlur = 5
  ctx.shadowColor = "rgba(167, 139, 250, 0.5)"

  for (const lm of landmarks) {

    ctx.beginPath()

    ctx.arc(
      lm.x * canvas.width,
      lm.y * canvas.height,
      0.8,
      0,
      2 * Math.PI
    )

    ctx.fill()
  }
}

export async function initializeFaceMesh({
  videoRef,
  canvasRef,
  landmarksRef,
  setStats,
  setIsRunning,
  setIsLoading
}) {

  const faceMesh = new FaceMesh({
    locateFile: (file) =>
      `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
  })

  faceMesh.setOptions({
    maxNumFaces: 1,
    refineLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  })

  faceMesh.onResults((results) => {

    if (results.multiFaceLandmarks?.length > 0) {

      const landmarks =
        results.multiFaceLandmarks[0]

      landmarksRef.current = landmarks

      drawMesh(
        canvasRef.current,
        videoRef.current,
        landmarks
      )

      const metrics =
        detectExpression(landmarks)

      setStats(metrics)

    } else {

      landmarksRef.current = null

      const ctx =
        canvasRef.current?.getContext("2d")

      if (ctx) {
        ctx.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        )
      }

      setStats(null)
    }
  })

  const stream =
    await navigator.mediaDevices.getUserMedia({
      video: true
    })

  videoRef.current.srcObject = stream

  const camera = new Camera(videoRef.current, {
    onFrame: async () => {
      await faceMesh.send({
        image: videoRef.current
      })
    },
    width: 640,
    height: 480,
  })

  await camera.start()

  setIsRunning(true)
  setIsLoading(false)

  return camera
}