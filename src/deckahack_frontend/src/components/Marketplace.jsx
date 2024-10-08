import React from "react";
import PriceTracker from "./PriceTracker";

const Marketplace = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl text-center py-4">Marketplace</h1>
      <PriceTracker />
      {/* Other marketplace content */}
    </div>
  );
};

export default Marketplace;
