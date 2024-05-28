const center = { latitude: 42.6977, longitude: 23.3219 };
const numPoints = 10;
const radius = 1; // approximately 1 km radius

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
};

function generateMockCoordinates(center, numPoints, radius) {
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * radius;
    const latitude = center.latitude + (distance * Math.cos(angle)) / 111.32; // 111.32 km per degree latitude
    const longitude =
      center.longitude +
      (distance * Math.sin(angle)) / (111.32 * Math.cos(center.latitude * (Math.PI / 180))); // adjust for longitude
    const rooms = getRandomInteger(1, 4);
    const res = {
      id: i + 1,
      latitude: String(latitude),
      longitude: String(longitude),
      price: getRandomInteger(100000, 1000000),
      preview: '/images/1/1.jpg',
      description: `${rooms} комнатная квартира`,
      images: '/images/1/1.jpg||/images/1/2.jpg||/images/1/3.jpg',
      rooms: rooms,
      categoryId: getRandomInteger(1, 3),
      createdAt: new Date('2024-05-17T10:56:53.893Z'),
      updatedAt: new Date('2024-05-17T10:56:53.893Z'),
      published: true,
      userId: '71233480',
      furnished: Boolean(getRandomInteger(0, 2)),
      meters: getRandomInteger(1, 100),
    };

    points.push(res);
  }
  return points;
}

console.log(generateMockCoordinates(center, numPoints, radius));
