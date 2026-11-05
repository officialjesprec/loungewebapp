import React, { useState, useRef, useEffect, useCallback } from 'react';
import jsQR from 'jsqr';
import {
  QrCode,
  Camera,
  CameraOff,
  FlipHorizontal,
  Zap,
  ZapOff,
  CheckCircle2,
  AlertTriangle,
  Upload,
  RefreshCw,
  ShieldCheck,
  UserCheck,
  Clock,
  Sparkles,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface VerificationResult {
  tested: boolean;
  code: string;
  valid: boolean;
  guestName?: string;
  guestPhone?: string;
  vertical?: 'Club' | 'Lounge' | 'Hotel' | 'Tickets';
  reference?: string;
  details?: string;
  amountNaira?: number;
  bookingId?: string;
  status?: string;
  timestamp: string;
}

interface CameraQrScannerProps {
  onVerifyQrCode: (code: string) => {
    valid: boolean;
    guestName?: string;
    guestPhone?: string;
    vertical?: 'Club' | 'Lounge' | 'Hotel' | 'Tickets';
    reference?: string;
    details?: string;
    amountNaira?: number;
    bookingId?: string;
    status?: string;
  };
  onCheckInBooking?: (bookingId: string) => void;
}

export const CameraQrScanner: React.FC<CameraQrScannerProps> = ({
  onVerifyQrCode,
  onCheckInBooking,
}) => {
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [torchEnabled, setTorchEnabled] = useState<boolean>(false);
  const [hasTorchSupport, setHasTorchSupport] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [lastScannedCode, setLastScannedCode] = useState<string>('');
  const [scanResult, setScanResult] = useState<VerificationResult | null>(null);
  const [shiftHistory, setShiftHistory] = useState<VerificationResult[]>([]);
  const [manualCodeInput, setManualCodeInput] = useState<string>('CRE8-VIP-BF1-9921');
  const [isProcessingFrame, setIsProcessingFrame] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Play audio chime for scan validation
  const playBeep = useCallback((success: boolean) => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (success) {
        // High harmonic pleasant double ping
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
        osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.15); // E6
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      } else {
        // Low discordant warning buzz
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.setValueAtTime(180, ctx.currentTime + 0.12);
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      }
    } catch {
      // AudioContext muted/unsupported
    }
  }, [soundEnabled]);

  // Execute verification logic with existing onVerifyQrCode utility
  const executeVerification = useCallback((code: string) => {
    const rawResult = onVerifyQrCode(code);
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const fullResult: VerificationResult = {
      tested: true,
      code,
      valid: rawResult.valid,
      guestName: rawResult.guestName,
      guestPhone: rawResult.guestPhone,
      vertical: rawResult.vertical,
      reference: rawResult.reference,
      details: rawResult.details,
      amountNaira: rawResult.amountNaira,
      bookingId: rawResult.bookingId,
      status: rawResult.status || (rawResult.valid ? 'Confirmed' : 'Unrecognized'),
      timestamp: timeString,
    };

    setScanResult(fullResult);
    setShiftHistory((prev) => [fullResult, ...prev.slice(0, 9)]);
    playBeep(rawResult.valid);

    // Haptic vibration feedback
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      if (rawResult.valid) {
        navigator.vibrate(80);
      } else {
        navigator.vibrate([120, 60, 120]);
      }
    }
  }, [onVerifyQrCode, playBeep]);

  // Start Camera Stream
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsCameraActive(true);

      // Check torch support
      const track = stream.getVideoTracks()[0];
      const capabilities = (track.getCapabilities?.() as any) || {};
      if (capabilities.torch) {
        setHasTorchSupport(true);
      } else {
        setHasTorchSupport(false);
      }
    } catch (err: any) {
      console.warn('Camera access unavailable or denied:', err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera permission denied. Please allow camera access in browser permissions or use the Direct Scan Simulators below.'
          : 'Camera device unavailable on this system. You can test live passes using the Direct Scan Simulators or File Upload.'
      );
      setIsCameraActive(false);
    }
  };

  // Stop Camera Stream
  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
    setTorchEnabled(false);
  };

  // Toggle Torch/Flashlight
  const toggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (track && (track.getCapabilities?.() as any)?.torch) {
      try {
        await track.applyConstraints({
          advanced: [{ torch: !torchEnabled } as any],
        });
        setTorchEnabled(!torchEnabled);
      } catch (err) {
        console.warn('Torch constraint error:', err);
      }
    }
  };

  // Switch between Environment and User camera
  const switchCameraFacing = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
  };

  useEffect(() => {
    if (isCameraActive) {
      startCamera();
    }
  }, [facingMode]);

  // Video scanning frame loop
  useEffect(() => {
    let active = true;

    const scanVideoFrame = () => {
      if (!active || !isCameraActive) return;

      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          try {
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const qrCode = jsQR(imageData.data, imageData.width, imageData.height, {
              inversionAttempts: 'dontInvert',
            });

            if (qrCode && qrCode.data) {
              const code = qrCode.data.trim();
              if (code && code !== lastScannedCode) {
                setLastScannedCode(code);
                executeVerification(code);
              }
            }
          } catch {
            // Frame read skip
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(scanVideoFrame);
    };

    if (isCameraActive) {
      animationFrameRef.current = requestAnimationFrame(scanVideoFrame);
    }

    return () => {
      active = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isCameraActive, lastScannedCode, executeVerification]);

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Handle image file upload to scan QR code
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
          if (qrCode && qrCode.data) {
            executeVerification(qrCode.data);
          } else {
            alert('No valid QR code could be detected in this uploaded image.');
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-serif text-[#C67D0A] uppercase tracking-wider font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Door & Turnstile Security Console</span>
          </div>
          <h3 className="font-display text-2xl font-bold text-[#143D2B]">
            Camera-Based QR Code Pass Validator
          </h3>
          <p className="text-xs text-[#555555] font-serif mt-0.5">
            Real-time optical camera scanner validating club VIP tables, lodge room passes, and zero-commission event tickets.
          </p>
        </div>

        {/* Camera Start / Stop & Sound Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            title={soundEnabled ? 'Mute audio feedback' : 'Enable audio chime'}
            className="p-2.5 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] text-[#555555] hover:text-[#143D2B] transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {!isCameraActive ? (
            <button
              onClick={startCamera}
              className="px-5 py-2.5 bg-[#143D2B] hover:bg-[#1E553C] text-white font-serif text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>Launch Live Camera</span>
            </button>
          ) : (
            <button
              onClick={stopCamera}
              className="px-5 py-2.5 bg-red-700 hover:bg-red-800 text-white font-serif text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-2"
            >
              <CameraOff className="w-4 h-4" />
              <span>Stop Camera</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Camera Viewfinder & Active Validation Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Camera Viewport (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-3">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isCameraActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
              <span className="text-xs font-serif font-bold text-[#143D2B]">
                {isCameraActive ? 'Live Camera Feed Active' : 'Optical Camera Standby'}
              </span>
            </div>

            {isCameraActive && (
              <div className="flex items-center gap-2">
                {hasTorchSupport && (
                  <button
                    onClick={toggleTorch}
                    className={`p-1.5 rounded-lg border text-xs font-serif flex items-center gap-1 transition-colors cursor-pointer ${
                      torchEnabled
                        ? 'bg-[#C67D0A] text-white border-[#C67D0A]'
                        : 'bg-white text-[#555555] border-[#EAE5DC]'
                    }`}
                  >
                    {torchEnabled ? <Zap className="w-3.5 h-3.5" /> : <ZapOff className="w-3.5 h-3.5" />}
                    <span>Torch</span>
                  </button>
                )}
                <button
                  onClick={switchCameraFacing}
                  className="p-1.5 rounded-lg border border-[#EAE5DC] bg-white text-[#555555] hover:text-[#143D2B] text-xs font-serif flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <FlipHorizontal className="w-3.5 h-3.5" />
                  <span>Flip</span>
                </button>
              </div>
            )}
          </div>

          {/* Camera Viewport Container */}
          <div className="relative aspect-4/3 w-full bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
            {/* The Live Video Element */}
            <video
              ref={videoRef}
              className={`w-full h-full object-cover ${isCameraActive ? 'block' : 'hidden'}`}
              playsInline
              autoPlay
              muted
            />

            {/* Hidden canvas for jsQR frame sampling */}
            <canvas ref={canvasRef} className="hidden" />

            {/* If camera is active: Render the Luxury Optical Reticle HUD */}
            {isCameraActive && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {/* Dark vignette border */}
                <div className="absolute inset-0 bg-black/25" />

                {/* Reticle Viewfinder Box */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 border-2 border-white/30 rounded-2xl shadow-2xl flex items-center justify-center">
                  {/* Glowing luxury green and amber corner brackets */}
                  <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-[#C67D0A] rounded-tl-lg" />
                  <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-[#C67D0A] rounded-tr-lg" />
                  <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-[#143D2B] rounded-bl-lg" />
                  <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-[#143D2B] rounded-br-lg" />

                  {/* Animated sweeping laser beam */}
                  <div className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-[#C67D0A] to-transparent shadow-[0_0_12px_#C67D0A] animate-pulse" />

                  {/* Center targeting crosshair */}
                  <div className="w-6 h-6 border border-white/40 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-[#C67D0A] rounded-full" />
                  </div>

                  <span className="absolute bottom-3 text-[10px] font-mono uppercase tracking-wider text-white/90 bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                    Align QR in Viewfinder
                  </span>
                </div>
              </div>
            )}

            {/* If camera is not active: Clean standby illustration */}
            {!isCameraActive && (
              <div className="text-center p-6 space-y-3 z-10 max-w-sm">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 text-white/80 mx-auto flex items-center justify-center">
                  <QrCode className="w-9 h-9 text-[#C67D0A]" />
                </div>
                <h4 className="font-display text-lg font-bold text-white">
                  Camera Sensor Ready
                </h4>
                <p className="text-xs text-white/60 font-serif leading-relaxed">
                  Click 'Launch Live Camera' to authenticate mobile passes via phone screen or physical wristbands.
                </p>
                <button
                  onClick={startCamera}
                  className="mt-2 px-5 py-2 bg-[#C67D0A] hover:bg-[#b06d07] text-white font-serif text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Start Video Feed
                </button>
              </div>
            )}
          </div>

          {/* Camera Permission / Error Warning */}
          {cameraError && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 font-serif flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#C67D0A] shrink-0 mt-0.5" />
              <div>
                <strong>Notice:</strong> {cameraError}
              </div>
            </div>
          )}

          {/* Auxiliary Input Methods: File Upload & Manual Buffer */}
          <div className="pt-2 border-t border-[#EAE5DC] space-y-3">
            <div className="flex items-center justify-between text-xs font-serif text-[#777777]">
              <span>Alternative Entry Methods:</span>
              <label className="text-[#143D2B] font-semibold hover:underline cursor-pointer flex items-center gap-1">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload QR Image File</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Manual Code Input Bar */}
            <div className="flex gap-2">
              <input
                type="text"
                value={manualCodeInput}
                onChange={(e) => setManualCodeInput(e.target.value)}
                placeholder="Scan or type pass code (e.g. CRE8-VIP-BF1-9921)"
                className="flex-1 px-3 py-2 text-xs font-mono-nums rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] focus:outline-none focus:border-[#143D2B]"
              />
              <button
                onClick={() => executeVerification(manualCodeInput)}
                className="px-4 py-2 bg-[#143D2B] hover:bg-[#1E553C] text-white font-serif text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Validate
              </button>
            </div>

            {/* Quick Demo QR Test Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-[#777777] font-serif">
              <span className="font-semibold text-[#143D2B]">One-Click Test Passes:</span>
              <button
                type="button"
                onClick={() => {
                  setManualCodeInput('CRE8-VIP-BF1-9921');
                  executeVerification('CRE8-VIP-BF1-9921');
                }}
                className="px-2 py-0.5 rounded bg-emerald-50 text-[#143D2B] border border-emerald-200 hover:bg-emerald-100 font-mono-nums cursor-pointer"
              >
                Chief Adeleke (VIP 1)
              </button>
              <button
                type="button"
                onClick={() => {
                  setManualCodeInput('CRE8-VIP-BF4-9921');
                  executeVerification('CRE8-VIP-BF4-9921');
                }}
                className="px-2 py-0.5 rounded bg-emerald-50 text-[#143D2B] border border-emerald-200 hover:bg-emerald-100 font-mono-nums cursor-pointer"
              >
                John Doe (VIP 4)
              </button>
              <button
                type="button"
                onClick={() => {
                  setManualCodeInput('CRE8-HOTEL-KEY-304');
                  executeVerification('CRE8-HOTEL-KEY-304');
                }}
                className="px-2 py-0.5 rounded bg-amber-50 text-[#C67D0A] border border-amber-200 hover:bg-amber-100 font-mono-nums cursor-pointer"
              >
                Lodge Room 304
              </button>
              <button
                type="button"
                onClick={() => {
                  setManualCodeInput('CRE8-TIX-9904');
                  executeVerification('CRE8-TIX-9904');
                }}
                className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 font-mono-nums cursor-pointer"
              >
                Sarah Jenkins (Ticket)
              </button>
              <button
                type="button"
                onClick={() => {
                  setManualCodeInput('COUNTERFEIT-OR-EXPIRED-CODE');
                  executeVerification('COUNTERFEIT-OR-EXPIRED-CODE');
                }}
                className="px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 font-mono-nums cursor-pointer"
              >
                Counterfeit Pass
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Verification Result & Shift Audit Log (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Active Pass Result Card */}
          <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-3">
              <h4 className="font-display text-lg font-bold text-[#143D2B]">
                Authentication Result
              </h4>
              <span className="text-xs text-[#777777] font-serif">
                {scanResult ? scanResult.timestamp : 'Awaiting Scan'}
              </span>
            </div>

            {scanResult ? (
              <div
                className={`p-5 rounded-2xl border space-y-3 transition-all ${
                  scanResult.valid
                    ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 shadow-xs'
                    : 'bg-red-50/70 border-red-300 text-red-950 shadow-xs'
                }`}
              >
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {scanResult.valid ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                        <span className="tracking-wide">ACCESS GRANTED</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-5 h-5 text-red-700" />
                        <span className="tracking-wide">ACCESS DENIED</span>
                      </>
                    )}
                  </div>

                  <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-white/70 border border-current">
                    {scanResult.code}
                  </span>
                </div>

                {/* Details Breakdown */}
                {scanResult.valid ? (
                  <div className="space-y-2 text-xs font-serif pt-1">
                    <div className="flex justify-between items-center pb-1 border-b border-emerald-200/60">
                      <span className="text-[#555555]">Verified Patron:</span>
                      <strong className="text-sm text-[#143D2B]">{scanResult.guestName}</strong>
                    </div>

                    {scanResult.vertical && (
                      <div className="flex justify-between items-center">
                        <span className="text-[#555555]">Vertical Division:</span>
                        <span className="font-semibold text-[#143D2B]">{scanResult.vertical} Pillar</span>
                      </div>
                    )}

                    {scanResult.reference && (
                      <div className="flex justify-between items-center">
                        <span className="text-[#555555]">Reserved Area:</span>
                        <strong className="text-[#143D2B]">{scanResult.reference}</strong>
                      </div>
                    )}

                    {scanResult.details && (
                      <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 text-emerald-900 leading-relaxed">
                        <span className="font-semibold block mb-0.5 text-[11px] uppercase tracking-wider text-emerald-800">
                          Fulfillment Instructions:
                        </span>
                        {scanResult.details}
                      </div>
                    )}

                    {/* Check In Action Button */}
                    <div className="pt-2">
                      <button
                        onClick={() => {
                          if (scanResult.bookingId && onCheckInBooking) {
                            onCheckInBooking(scanResult.bookingId);
                          }
                          setScanResult((prev) => (prev ? { ...prev, status: 'Checked In' } : null));
                        }}
                        className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-serif text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <UserCheck className="w-4 h-4" />
                        <span>Confirm Entry & Mark Checked In</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-xs font-serif space-y-1.5 pt-1 text-red-900">
                    <p>
                      <strong>Unrecognized or Counterfeit Pass.</strong> This code does not match any active VIP booth deposit, hotel room key, or direct event ticket.
                    </p>
                    <p className="text-[11px] text-red-700">
                      Action: Escort patron to the concierge desk or check with venue management.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-8 rounded-2xl border border-dashed border-[#EAE5DC] text-center space-y-2 text-[#777777] font-serif">
                <Clock className="w-8 h-8 mx-auto text-[#C67D0A]/60" />
                <p className="text-xs">
                  Scan a QR code from patron screen or use one of the test presets above to display verified booking credentials.
                </p>
              </div>
            )}
          </div>

          {/* Shift Scan Audit Log */}
          <div className="bg-white rounded-2xl border border-[#EAE5DC] p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#EAE5DC] pb-3">
              <h4 className="font-display text-base font-bold text-[#143D2B]">
                Current Shift Scan Log
              </h4>
              <span className="text-xs font-mono-nums text-[#777777]">
                {shiftHistory.length} Scans
              </span>
            </div>

            {shiftHistory.length > 0 ? (
              <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                {shiftHistory.map((entry, idx) => (
                  <div
                    key={`${entry.code}-${idx}`}
                    className="p-2.5 rounded-xl border border-[#EAE5DC] bg-[#FAF8F5] flex items-center justify-between text-xs font-serif"
                  >
                    <div className="flex items-center gap-2">
                      {entry.valid ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                      )}
                      <div>
                        <div className="font-semibold text-[#143D2B]">
                          {entry.guestName || 'Unknown Pass'}
                        </div>
                        <div className="text-[10px] text-[#777777] font-mono">
                          {entry.code}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                          entry.valid
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {entry.valid ? 'Granted' : 'Denied'}
                      </span>
                      <div className="text-[9px] text-[#777777] mt-0.5 font-mono-nums">
                        {entry.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4 text-xs text-[#777777] font-serif">
                No scans recorded during this shift yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
