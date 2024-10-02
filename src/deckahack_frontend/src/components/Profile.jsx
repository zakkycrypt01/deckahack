import React, { useState } from 'react';

const Profile = () => {
  // Step 1: Create state to track overlay visibility
  const [isOverlayVisible, setOverlayVisible] = useState(false);

  // Step 3: Button click handler to show overlay
  const showOverlay = () => {
    setOverlayVisible(true);
  };

  // Step 5: Close the overlay
  const hideOverlay = () => {
    setOverlayVisible(false);
  };

  return (
    <div>
      {/* Step 3: Button to show overlay */}
      <button onClick={showOverlay} className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Show Overlay
      </button>

      {/* Step 4: Conditional rendering of overlay */}
      {isOverlayVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={hideOverlay} // Close overlay when clicked
        >
          <div className="bg-white p-8 rounded-md text-center">
            <h2 className="text-2xl">This is an overlay!</h2>
            <p>Click anywhere outside to close.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
