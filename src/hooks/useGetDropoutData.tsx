import React, { useState, useEffect, useCallback, useRef } from "react";

import { NodesObject } from "../types/Node";

type Cache = {
  [url: string]: NodesObject;
};

const FOLDOUT_URL = "https://hf-demo-api.herokuapp.com/";

export const useGetDropoutData = () => {
  const cache = useRef<Cache>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<NodesObject>();
  const [error, setError] = useState<Error>();

  const fetchDropoutData = useCallback(async () => {
    setIsLoading(true);
    if (cache.current[FOLDOUT_URL]) {
      setData(cache.current[FOLDOUT_URL]);
      setIsLoading(false);
    } else {
      try {
        const response = await fetch(FOLDOUT_URL);
        const data: NodesObject = await response.json();

        cache.current[FOLDOUT_URL] = data;
        setData(data);
        setIsLoading(false);
      } catch (error) {
        setError(error as Error);
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchDropoutData();
  }, [fetchDropoutData]);

  return { isLoading, data, error };
};
