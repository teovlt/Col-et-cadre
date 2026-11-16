// Photos Unsplash (licence Unsplash, utilisation libre) servies depuis leur CDN
export const unsplash = (id: string, width = 1600, height?: number) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=75&w=${width}${height ? `&h=${height}` : ''}`

export const photos = {
  heroWorkshop: '1676531443468-0e2b5a57e48f',
  switchbacks: '1689085383734-32c6d88221a7',
  mountainRoad: '1471506480208-91b3a4cc78be',
  bikepacker: '1785711930095-7a6fb14b2492',
  toolWall: '1760310936486-4dd450aab2a8',
  bottomBracket: '1675798227643-da319f8ee8f7',
  brakeAdjust: '1673870861521-626b40f9657e',
  wheelTruing: '1673870861520-ab6535d86bc9',
  fork: '1675798225744-174c0d8421a0',
  drivetrain: '1684166472907-e17eec7e9475',
  skiRack: '1552853662-8f707e1cb336',
  bootWall: '1754583340212-5bddfda09f7e',
  skiTouring: '1616429553002-faf23468952d',
  alps: '1531436040007-7216019112d7',
  bikeShop: '1761634731562-c7a152d89849',
  bikeRow: '1561840884-9dda41ed54e4',
  gravelBike: '1576435728678-68d0fbf94e91',
  scooter: '1597260491619-bab87197869f',
}
