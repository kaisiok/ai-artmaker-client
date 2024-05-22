import React from "react";

function Error500(): React.ReactElement {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">500</h1>
        <p className="text-xl mt-4">Internal Server Error</p>
        <p className="mt-2 text-gray-600">
          Sorry, something went wrong on our end. Please try again later.
        </p>
      </div>
    </div>
  );
}

export default Error500;
