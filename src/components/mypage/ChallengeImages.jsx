import mypagechallenge1 from '/src/assets/test/mypagechallenge1.png'
import mypagechallenge2 from '/src/assets/test/mypagechallenge2.png'
import mypagechallenge3 from '/src/assets/test/mypagechallenge3.png'
import mypagechallenge4 from '/src/assets/test/mypagechallenge4.png'

export default function ChallengeImages() {
  const challengeImages = [
    { id:1, src: mypagechallenge1, isOn:true, title: '새벽 챌린지 5시까지 공부중'},
    { id:2, src: mypagechallenge2, isOn:false, title: '알고리즘 스터디방'},
    { id:3, src: mypagechallenge4, isOn:true, title: '독서 챌린지'},
    { id:4, src: mypagechallenge3, isOn:false, title: '4시 미라클모닝! 해보쟈구'},
  ];
  const handleImageClick = (id) => {
    console.log(`Clicked image no.${id}`);
  };
  return (
    <>
      <div className={`rounded-3xl bg-white border border-2 border-gray-300
                py-12 grid duration-500
                grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                gap-6 md:gap-8 lg:gap-12
                px-6 sm:px-12 md:px-16 lg:px-24`
      }>
        {challengeImages?.map((item) => (
          <div key={item.id} className="cursor-pointer relative" >
            <h3 className="text-xl truncate">{item.title}</h3>
            <div id='onoff' className={`w-6 h-6 rounded-full ring-2 ring-white
                absolute top-5 -right-2 z-10 duration-300
                ${item.isOn ? 'bg-green-400 hover:bg-green-500' : 'bg-gray-400 hover:bg-gray-500'}`}/>
            <div className="aspect-video overflow-hidden rounded-xl">
              <img src={item.src} onClick={() => handleImageClick(item.id)}
                className='w-full h-full border rounded-xl object-cover
                transition-transform duration-500 hover:scale-110'/>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}