import { Artist } from "types";
import artistPhoto from 'assets/images/artistPhoto.jpg'

export const ARTISTS: Omit<Artist, "id">[] = [
  {
    name: "Salvador Dali",
    picture: artistPhoto,
    description: "Prominent Spanish Surrealist artist, celebrated for his bizarre and striking imagery that explored subconscious mind.",
    artworks: ["Artwork 1", "Artwork 2"],
  },
  {
    name: "Frida Kahlo",
    picture: artistPhoto,
    description: "Iconic painter known for her self-portraits and Mexican-inspired art, deeply personal and symbolic works.",
    artworks: ["Artwork A"],
  },
  {
    name: "Yayoi Kusama",
    picture: artistPhoto,
    description: "Contemporary artist known for her polka dots and infinity rooms, creating immersive psychedelic experiences.",
    artworks: ["Artwork A, Artwork B, Artwork C"],
  },
];

export const MOCK_ARTISTS: Artist[] = ARTISTS.map((artist, index) => ({
  id: index + 1,
  ...artist,
}));