import { CACHE_KEY_GAMES } from "../constants";
import APIClient, { FetchResponse } from "../services/api-client";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import ms from "ms";
import { Platform } from "./usePlatforms";
import useGameQueryStore from "../store";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  parent_platforms: { platform: Platform }[];
  metacritic: number;
  rating_top: number;
}

const apiClient = new APIClient<Game>("/games");

// const useGames = (gameQuery: GameQuery) => {
//   return useQuery<FetchResponse<Game>, Error>({
//     queryKey: CACHE_KEY_GAMES(gameQuery),
//     queryFn: () =>
//       apiClient.getAll({
//         params: {
//           genres: gameQuery.genre?.id,
//           parent_platforms: gameQuery.platform?.id,
//           ordering: gameQuery.sortOrder,
//           search: gameQuery.searchText,
//         },
//       }),
//     staleTime: 24 * 60 * 60 * 1000,
//   });
// };

const useGames = () => {
  const gameQuery = useGameQueryStore((s) => s.gameQuery);

  return useInfiniteQuery<FetchResponse<Game>, Error>({
    queryKey: CACHE_KEY_GAMES(gameQuery),
    queryFn: ({ pageParam = 1 }) =>
      apiClient.getAll({
        params: {
          genres: gameQuery.genreId,
          parent_platforms: gameQuery.platformId,
          ordering: gameQuery.sortOrder,
          search: gameQuery.searchText,
          page: pageParam,
        },
      }),
    staleTime: ms("24h"),
    getNextPageParam: (lastPage, allPages) => {
      // allPages: containt data each page we retrieve
      return lastPage.next ? allPages.length + 1 : undefined;
    },
  });
};

// useData<Game>(
//   "/games",
//   {
//   params: {
//     genres: gameQuery.genre?.id,
//     platforms: gameQuery.platform?.id,
//     ordering: gameQuery.sortOrder,
//     search: gameQuery.searchText,
//   },
// },
//   [gameQuery]
// );

export default useGames;
