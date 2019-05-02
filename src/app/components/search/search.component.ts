import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  artists: any[] = [];
  loading: boolean;
  error: boolean;
  errorMessage: string;

  constructor(private spotify: SpotifyService) {}

  ngOnInit() {}

  BuscarArtista(searchTerm: string) {
    this.loading = true;
    this.error = false;
    console.log(searchTerm);
    this.spotify.getArtists(searchTerm).subscribe(
      (data: any) => {
        console.log(data);
        this.artists = data;
        this.loading = false;
      },
      errorServicio => {
        this.loading = false;
        this.error = true;
        this.errorMessage = errorServicio.error.error.message;
      }
    );
  }
}
