import { useState, useEffect } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { useNavigate } from 'react-router-dom';

function QRScanner() {
  const [scanning, setScanning] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let scanner;

    if (scanning) {
      scanner = new Html5QrcodeScanner('qr-reader', {
        fps: 10,
        qrbox: { width: 250, height: 250 }
      });

      scanner.render(onScanSuccess, onScanError);
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(console.error);
      }
    };
  }, [scanning]);

  const onScanSuccess = (decodedText) => {
    console.log('QR Code scanned:', decodedText);
    
    try {
      // Try to parse as URL first
      const url = new URL(decodedText);
      const pathParts = url.pathname.split('/');
      const assetId = pathParts[pathParts.length - 1];
      
      console.log('Extracted asset ID from URL:', assetId);
      
      if (assetId && !isNaN(assetId)) {
        navigate(`/asset/${assetId}`);
      } else {
        alert(`Invalid QR code. Scanned: ${decodedText}\nExtracted ID: ${assetId}`);
      }
    } catch (error) {
      console.log('Not a URL, trying as direct ID:', decodedText);
      // If not a URL, check if it's just a number (asset ID)
      if (!isNaN(decodedText) && decodedText.trim() !== '') {
        navigate(`/asset/${decodedText}`);
      } else {
        alert(`Invalid QR code format.\nScanned text: ${decodedText}`);
      }
    }
  };

  const onScanError = (error) => {
    // Ignore scan errors (they happen frequently during scanning)
  };

  return (
    <div className="px-4 py-6 sm:px-0">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Scan QR Code</h1>
      
      <div className="bg-white shadow rounded-lg p-6">
        {!scanning ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Click the button below to start scanning QR codes
            </p>
            <button
              onClick={() => setScanning(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Start Scanner
            </button>
          </div>
        ) : (
          <div>
            <div id="qr-reader" className="mb-4"></div>
            <button
              onClick={() => setScanning(false)}
              className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Stop Scanner
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Instructions:</h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>Click "Start Scanner" to activate your camera</li>
          <li>Point your camera at an asset QR code</li>
          <li>The scanner will automatically detect and open the asset details</li>
          <li>You can also scan QR codes using your mobile device camera</li>
        </ul>
      </div>
    </div>
  );
}

export default QRScanner;
