// 카드에 랜더링 하기에 이미지 사이즈가 크고 ,성능에도 문제를 줄 수 있기 때문에
// https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg
// 다음과 같이 crop을 추가해 이미지 사이즈를 줄여서, 성능을 개선할 수 있습니다.
// https://media.rawg.io/media/crop/600/400/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg

const getCroppedImageUrl = (url: string) => {
  if (!url) return "";
  const target = "media/";
  // url.indexOf(target)은 media/ 글자의 시작점이기 때문에 뒤에 + target.length를 해줌
  const index = url.indexOf(target) + target.length;
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

export default getCroppedImageUrl;
