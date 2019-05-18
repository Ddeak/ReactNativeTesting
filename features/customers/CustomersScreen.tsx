import React, { useEffect, useState } from "react";

import { getCustomers } from "./api";
import { CustomersList } from "./CustomersList";

export const CustomerScreen = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      const data = await getCustomers();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  return <CustomersList customers={customers} />;
};
