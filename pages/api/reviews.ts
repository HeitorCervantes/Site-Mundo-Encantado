// pages/api/reviews.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Review = {
  author?: string;
  profilePhotoUrl?: string;
  rating?: number;
  text?: string;
  time?: string;
};

type Payload = {
  rating?: number;
  total?: number;
  url?: string;
  reviews: Review[];
  error?: string;
};

// Config preferências (podem ser alteradas via env)
const LANGUAGE = process.env.REVIEWS_LANGUAGE || 'pt-BR';
const MIN_RATING = Number(process.env.REVIEWS_MIN_RATING || 4);
const MAX_REVIEWS_WANTED = Math.max(1, Number(process.env.REVIEWS_MAX_REVIEWS || 6));
const MAX_REVIEWS_API = 5; // Limite da Places API v1
const MAX_REVIEWS = Math.min(MAX_REVIEWS_WANTED, MAX_REVIEWS_API);

// Texto para busca do Place quando PLACE_ID não for informado
const DEFAULT_TEXT_QUERY =
  process.env.GOOGLE_PLACE_TEXTQUERY ||
  'Mundo Encantado Ribeirão Preto l Recreação Infantil';

export default async function handler(_req: NextApiRequest, res: NextApiResponse<Payload>) {
  try {
    const key = process.env.GOOGLE_MAPS_API_KEY;
    if (!key) {
      return res.status(200).json({ reviews: [], error: 'Missing GOOGLE_MAPS_API_KEY' });
    }

    // 1) Descobre o Place ID se não vier por env
    let placeId = process.env.GOOGLE_PLACE_ID || '';
    if (!placeId) {
      const searchResp = await fetch('https://places.googleapis.com/v1/places:searchText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask': 'places.id,places.displayName,places.formattedAddress',
        },
        body: JSON.stringify({
          textQuery: DEFAULT_TEXT_QUERY,
          languageCode: LANGUAGE,
          regionCode: 'BR',
        }),
      });

      if (!searchResp.ok) {
        res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
        return res.status(200).json({ reviews: [] });
      }

      const searchJson: any = await searchResp.json();
      placeId = searchJson?.places?.[0]?.id || '';
      if (!placeId) {
        res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
        return res.status(200).json({ reviews: [] });
      }
    }

    // 2) Busca detalhes + reviews (até 5) do Place
    const detailsUrl = `https://places.googleapis.com/v1/${placeId}?languageCode=${encodeURIComponent(LANGUAGE)}`;
    const fields = [
      'rating',
      'userRatingCount',
      'googleMapsUri',
      'reviews',
      'reviews.authorAttribution',
      'reviews.rating',
      'reviews.text',
      'reviews.publishTime',
      'reviews.relativePublishTimeDescription',
      'reviews.authorAttribution.displayName',
      'reviews.authorAttribution.photoUri',
    ].join(',');

    const detailsResp = await fetch(detailsUrl, {
      headers: {
        'X-Goog-Api-Key': key,
        'X-Goog-FieldMask': fields,
      },
    });

    if (!detailsResp.ok) {
      res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
      return res.status(200).json({ reviews: [] });
    }

    const data: any = await detailsResp.json();

    const all: Review[] = (data?.reviews || []).map((rv: any) => ({
      author: rv?.authorAttribution?.displayName,
      profilePhotoUrl: rv?.authorAttribution?.photoUri,
      rating: rv?.rating,
      text: rv?.text?.text || '',
      time: rv?.relativePublishTimeDescription || rv?.publishTime,
    }));

    const filtered = all.filter((r) => (r.rating || 0) >= MIN_RATING).slice(0, MAX_REVIEWS);

    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate'); // ~6h
    return res.status(200).json({
      rating: data?.rating,
      total: data?.userRatingCount,
      url: data?.googleMapsUri,
      reviews: filtered,
    });
  } catch (err) {
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate');
    return res.status(200).json({ reviews: [] });
  }
}
