import React from "react";

function Error404(): React.ReactElement {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="text-xl mt-4">Page Not Found</p>
        <p className="mt-2 text-gray-600">
          Sorry, the page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default Error404;
