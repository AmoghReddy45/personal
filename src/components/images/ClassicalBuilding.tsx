import React from "react";
import SupabaseImage from "../SupabaseImage";

const ClassicalBuilding = () => {
  return (
    <SupabaseImage
      src="/classical-building.png"
      alt="Classical architecture building with columns and people gathered outside"
      className="w-full h-full object-cover transform"
      style={{ objectPosition: "50% 75%" }}
    />
  );
};

export default ClassicalBuilding;
