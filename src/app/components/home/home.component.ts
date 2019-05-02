import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  newReleases: any[] = [];
  loading: boolean;
  error: boolean;
  errorMessage: string;

  constructor(private _spotify: SpotifyService) {
    this.loading = true;
    this.error = false;

    this._spotify.getNewRelease().subscribe(
      (data: any) => {
        console.log(data);
        this.newReleases = data;
        this.loading = false;
      },
      errorServicio => {
        this.loading = false;
        this.error = true;
        this.errorMessage = errorServicio.error.error.message;
      }
    );
  }

  ngOnInit() {}
}
