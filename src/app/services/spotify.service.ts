import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  token: string =
    'BQA4PiHc7C22UhiOCJ0cvgKNjK19ZDfv1qcnkSHcR5ZO18LjnyiFFQ85BNqDf_kSjG4VoEMTt6Y6qDpXIfA';

  constructor(private http: HttpClient) {
    console.log('servicio listo');
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token
    });

    return this.http.get(url, { headers });
  }

  getNewRelease() {
    return this.getQuery('browse/new-releases').pipe(
      map(data => data['albums'].items)
    );
  }

  getArtists(searchTerm: string) {
    return this.getQuery(
      `search?query=${searchTerm}&type=artist&offset=0&limit=15`
    ).pipe(map(data => data['artists'].items));
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
  }
  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`).pipe(
      map(data => data['tracks'])
    );
  }
}
