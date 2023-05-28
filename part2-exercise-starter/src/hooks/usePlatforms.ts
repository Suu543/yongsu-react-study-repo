import { CACHE_KEY_PLATFORMS } from "../constants";
import platforms from "../data/platforms";
import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import ms from "ms";
import { Platform } from "../entities/Platform";

const apiClient = new APIClient<Platform>("/platforms/lists/parents");

// const usePlatforms = () => ({ data: platforms, isLoading: false, error: null });

const usePlatforms = () => {
  return useQuery({
    queryKey: CACHE_KEY_PLATFORMS,
    queryFn: apiClient.getAll,
    staleTime: ms("24h"), // 24h
    initialData: { count: platforms.length, results: platforms, next: null },
  });
};

export default usePlatforms;
