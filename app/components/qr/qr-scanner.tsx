import * as React from "react"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "~/components/ui/dialog"
import { QR_SCANNER_CONFIG } from "~/lib/constants"
import { parseTicketQR } from "~/lib/utils"
import type { QRScanResult, CameraPermission, TicketInfo } from "~/types"

interface QRScannerProps {
  isOpen: boolean
  onClose: () => void
  onScanSuccess: (result: TicketInfo) => void
  onScanError: (error: string) => void
}

export function QRScanner({ isOpen, onClose, onScanSuccess, onScanError }: QRScannerProps) {
  const [isScanning, setIsScanning] = React.useState(false)
  const [cameraPermission, setCameraPermission] = React.useState<CameraPermission>({ granted: false })
  const [stream, setStream] = React.useState<MediaStream | null>(null)
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  // Request camera permission
  const requestCameraPermission = React.useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(QR_SCANNER_CONFIG.constraints)
      setCameraPermission({ granted: true })
      setStream(mediaStream)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Không thể truy cập camera'
      setCameraPermission({ granted: false, error: errorMessage })
      onScanError(`Lỗi camera: ${errorMessage}`)
    }
  }, [onScanError])

  // Stop camera stream
  const stopCamera = React.useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setIsScanning(false)
  }, [stream])

  // Start scanning process
  const startScanning = React.useCallback(() => {
    setIsScanning(true)

    // Set timeout for scanning
    timeoutRef.current = setTimeout(() => {
      setIsScanning(false)
      onScanError('Quét QR hết thời gian. Vui lòng thử lại.')
    }, QR_SCANNER_CONFIG.timeout)

    // TODO: Implement actual QR code detection
    // This would typically use a QR detection library like @zxing/library
    // For now, we'll simulate QR detection
    const simulateQRDetection = () => {
      if (!isScanning) return

      // This is a placeholder - in real implementation, this would be QR detection
      // Example of what the detection would look like:
      /*
      const qrCodeReader = new BrowserQRCodeReader()
      qrCodeReader.decodeFromVideoDevice(undefined, videoRef.current, (result, error) => {
        if (result) {
          handleQRDetection(result.getText())
        }
      })
      */
    }

    simulateQRDetection()
  }, [isScanning, onScanError])

  // Handle QR code detection
  const handleQRDetection = React.useCallback((qrContent: string) => {
    try {
      const ticketInfo = parseTicketQR(qrContent)

      if (!ticketInfo) {
        onScanError('QR code không hợp lệ. Vui lòng kiểm tra lại vé tàu của bạn.')
        return
      }

      // Clear timeout and stop scanning
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      setIsScanning(false)

      onScanSuccess(ticketInfo)
      onClose()
    } catch (error) {
      onScanError('Không thể đọc thông tin từ QR code. Vui lòng thử lại.')
    }
  }, [onScanSuccess, onScanError, onClose])

  // Manual QR input fallback
  const [manualQR, setManualQR] = React.useState('')
  const handleManualSubmit = () => {
    if (manualQR.trim()) {
      handleQRDetection(manualQR.trim())
    }
  }

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  // Handle dialog close
  const handleClose = () => {
    stopCamera()
    onClose()
  }

  React.useEffect(() => {
    if (isOpen && !cameraPermission.granted) {
      requestCameraPermission()
    }
  }, [isOpen, cameraPermission.granted, requestCameraPermission])

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Quét QR Code</DialogTitle>
          <DialogDescription>
            Hướng camera vào QR code trên vé tàu của bạn để tự động điền thông tin chuyến đi.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Camera View */}
          {cameraPermission.granted ? (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full rounded-lg bg-black"
                style={{ aspectRatio: '16/9' }}
              />

              {/* QR Viewfinder Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-white/50 rounded-lg relative">
                  <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-500 rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-500 rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-500 rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-500 rounded-br-lg" />
                </div>
              </div>

              {/* Scanning Status */}
              {isScanning && (
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    Đang quét QR code...
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 bg-gray-100 rounded-lg">
              <div className="text-center space-y-4">
                <div className="text-4xl">📷</div>
                <div>
                  <p className="font-medium">Cần quyền truy cập camera</p>
                  <p className="text-sm text-gray-800">
                    {cameraPermission.error || 'Vui lòng cho phép truy cập camera để quét QR code'}
                  </p>
                </div>
                <Button onClick={requestCameraPermission} variant="outline">
                  Cấp quyền camera
                </Button>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {cameraPermission.granted && (
              <Button
                onClick={startScanning}
                disabled={isScanning}
                className="flex-1"
                variant="train"
              >
                {isScanning ? 'Đang quét...' : 'Bắt đầu quét'}
              </Button>
            )}
            <Button onClick={handleClose} variant="outline" className="flex-1">
              Hủy
            </Button>
          </div>

          {/* Manual Input Fallback */}
          <div className="border-t pt-4">
            <p className="text-sm text-gray-800 mb-2">
              Không thể quét? Nhập mã QR thủ công:
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={manualQR}
                onChange={(e) => setManualQR(e.target.value)}
                placeholder="Nhập nội dung QR code..."
                className="flex-1 px-3 py-2 border rounded-md text-sm"
              />
              <Button
                onClick={handleManualSubmit}
                disabled={!manualQR.trim()}
                variant="outline"
                size="sm"
              >
                Xác nhận
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// Hook for QR Scanner
export function useQRScanner() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [result, setResult] = React.useState<TicketInfo | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  const open = () => {
    setIsOpen(true)
    setError(null)
  }

  const close = () => {
    setIsOpen(false)
  }

  const handleSuccess = (ticketInfo: TicketInfo) => {
    setResult(ticketInfo)
    setError(null)
  }

  const handleError = (errorMessage: string) => {
    setError(errorMessage)
    setResult(null)
  }

  return {
    isOpen,
    result,
    error,
    open,
    close,
    handleSuccess,
    handleError,
  }
}