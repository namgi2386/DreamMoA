import VideoItem from "./VideoItem";
import defaultImage from "/test/testvideo1.gif";


export default function VideoSection() {
  return (
    <>
      <VideoItem
        title="Subscribe to our newsletter"
        content="Join 120,000+ other creatives and get our newsletter, filled with lots of fresh jobs, design inspiration, cool links, free events, industry updates, and more! Join 120,000+ other creatives and get our newsletter, filled with lots of fresh jobs, design inspiration, cool links, free events, industry updates, and more!"
        videogif={defaultImage}
        bgcolor="bg-green-300"
        location="left"
      />
      <VideoItem
        title="An aviator, downed in the desert and facing long odds of survival"
        content="encounters a strange young person, neither man nor really boy, who, it emerges over time, has travelled from his solitary home on a distanta steroid, encounters a strange young person, neither man nor really boy, who, it emerges over time, has travelled from his solitary home on a distanta steroid, encounters a strange young person, neither man nor really boy, who, it emerges over time, has travelled from his solitary home on a distanta steroid"
        videogif={defaultImage}
        bgcolor="bg-rose-300"
        location="right"
      />
      <VideoItem
        title="where he lives alone with a single rose"
        content="The rose has made him so miserable that, in torment, he has taken advantage of a flock of birds to convey him to other planets. He is instructed by a wise if cautious fox, and by a sinister angel of death, the snake. The rose has made him so miserable that, in torment, he has taken advantage of a flock of birds to convey him to other planets. He is instructed by a wise if cautious fox, and by a sinister angel of death, the snake."
        videogif={defaultImage}
        bgcolor="bg-violet-300"
        location="left"
      />
    </>
  )
}