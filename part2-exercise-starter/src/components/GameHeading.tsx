import { Heading } from "@chakra-ui/react";
import { GameQuery } from "../App";
import useGenres from "../hooks/useGenres";
import usePlatforms from "../hooks/usePlatforms";
import usePlatform from "../hooks/usePlatform";
import useGenre from "../hooks/useGenre";

interface Props {
  gameQuery: GameQuery;
}

const GameHeading = ({ gameQuery }: Props) => {
  // 다음 코드는 Implementation Detail이기 때문에 캡슐화를 통해 로직을 숨기겠습니다.
  // const { data: genres } = useGenres();
  // const genre = genres?.results.find((g) => g.id === gameQuery.genreId);

  // const { data: platforms } = usePlatforms();
  // const platform = platforms?.results.find(
  //   (p) => p.id === gameQuery.platformId
  // );

  const genre = useGenre(gameQuery.genreId);
  const platform = usePlatform(gameQuery.platformId);

  const heading = `${platform?.name || ""} ${genre?.name || ""} Games`;

  return (
    <Heading as="h1" marginY={5} fontSize="5xl">
      {heading}
    </Heading>
  );
};

export default GameHeading;
