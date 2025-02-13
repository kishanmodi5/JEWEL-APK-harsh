import React, { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [wishData, setWishData] = useState(() => {
    const storedData = localStorage.getItem("wishList");
    return storedData ? JSON.parse(storedData) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishData));
  }, [wishData]);

  return (
    <DataContext.Provider value={{ wishData, setWishData }}>
      {children}
    </DataContext.Provider>
  );
};


export default DataProvider;
export { DataContext };
