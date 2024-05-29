export default async function getAddressFromCoordinates(lat: number, lng: number) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.address) {
      const address = data.display_name;
      console.log('Address:', address);
      return address;
    } else {
      console.error('No address found');
      return null;
    }
  } catch (error) {
    console.error('Request failed:', error);
    return null;
  }
}
