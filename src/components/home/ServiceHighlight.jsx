const ServiceHighlight = () => {
  const services = [
    {
      title: '챌린지',
      description: '집중도 분석으로 효율적인 학습',
      color: '#3F628A'
    },
    {
      title: '실시간 강의',
      description: 'AI 요약 및 자막 서비스',
      color: '#003458'
    },
    {
      title: '커뮤니티',
      description: '동료 학습자와 소통',
      color: '#88A9D5'
    }
  ];

  return (
    <div className="py-16 px-10 bg-white">
      <div className="flex justify-between">
        {services.map((service, index) => (
          <div 
            key={index} 
            className="w-1/3 p-6 text-center hover:shadow-lg transition"
            style={{ backgroundColor: service.color, color: 'white' }}
          >
            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceHighlight;