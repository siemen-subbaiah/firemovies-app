import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';

export const getTrending = async (): Promise<Movie> => {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/trending/movie/week?api_key=${process.env.EXPO_PUBLIC_API_KEY}`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getPopular = async (): Promise<Movie> => {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/movie/popular?api_key=${process.env.EXPO_PUBLIC_API_KEY}`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getTopGrosser = async (): Promise<Movie> => {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/discover/movie?sort_by=revenue.desc&page=1&api_key=${process.env.EXPO_PUBLIC_API_KEY}`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getByGenre = async (genreId: number): Promise<Movie> => {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/discover/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}&sort_by=popularity.desc&page=1&with_genres=${genreId}`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMovieDetails = async (id: number): Promise<MovieDetail> => {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/movie/${id}?append_to_response=similar,credits&api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getMovieTrailer = async (id: number): Promise<Trailer> => {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/movie/${id}/videos?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getArtistDetails = async (id: number): Promise<Artist> => {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/person/${id}?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US&append_to_response=images,external_ids`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const searchMovies = async (term: string): Promise<Movie> => {
  try {
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/search/movie?query=${term}&api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=en-US&page=1&include_adult=true`
    );
    return await res.json();
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getFavourites = async (uid: string): Promise<Favs[]> => {
  try {
    const favRef = collection(db, 'likes');
    const q = query(
      favRef,
      where('uid', '==', uid),
      orderBy('timeStamp', 'desc')
    );
    const favSnapShot = await getDocs(q);
    const favList = favSnapShot.docs.map((doc) => {
      return {
        ...doc.data(),
        docId: doc.id,
      };
    }) as Favs[];
    return favList;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const addFavourite = async (docBody: Favs) => {
  try {
    await addDoc(collection(db, 'likes'), docBody);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const deleteFavourite = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'likes', id));
  } catch (error: any) {
    throw new Error(error.message);
  }
};
