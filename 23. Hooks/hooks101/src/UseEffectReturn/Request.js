import { useState, useEffect } from "react";

const Request = () => {
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    const fetchData = async () => {
      const response = await fetch("api...", { signal });
      // do something with response
    };

    fetchData();

    return () => controller.abort();
  }, []);

  return <h2>Cleaning up API requests on unmount</h2>;
};

export default Request;
