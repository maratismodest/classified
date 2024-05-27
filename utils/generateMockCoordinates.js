const center = { latitude: 42.6977, longitude: 23.3219 };
const numPoints = 10;
const radius = 1; // approximately 1 km radius

function generateMockCoordinates(center, numPoints, radius) {
    const points = [];
    for (let i = 0; i < numPoints; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius;
        const latitude = center.latitude + (distance * Math.cos(angle)) / 111.32; // 111.32 km per degree latitude
        const longitude = center.longitude + (distance * Math.sin(angle)) / (111.32 * Math.cos(center.latitude * (Math.PI / 180))); // adjust for longitude
        points.push({ latitude, longitude });
    }
    return points;
}

export const mockCoordinates = generateMockCoordinates(center, numPoints, radius);

