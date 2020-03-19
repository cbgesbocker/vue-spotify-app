/* eslint-disable @typescript-eslint/camelcase */
import store from '@/store';
import Urls from '@/utils/Urls';
import AxiosInstance from './Axios/AxiosInstance';


class SpotifyClient extends AxiosInstance {
  private static singleton: SpotifyClient | undefined = undefined;

  private store = store;

  private responseType = 'token'

  private static readonly baseUrl = process.env.VUE_APP_SPOTIFY_BASE_URL

  private static readonly clientId = process.env.VUE_APP_SPOTIFY_CLIENT_ID

  private static readonly redirectUri = process.env.VUE_APP_SPOTIFY_REDIRECT_URI;

  private static readonly authUrl = process.env.VUE_APP_SPOTIFY_AUTHORIZATION_URL;

  private static readonly myProfileUrl = `${SpotifyClient.baseUrl}/me`

  private static readonly myTracksUrl = `${SpotifyClient.baseUrl}/me/tracks`

  private static readonly axiosConfig = {
    baseURL: SpotifyClient.baseUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }

  private static readonly interceptors = {
    request: [],
    response: [],
  }

  private get getToken() {
    return this.store.state.auth.authKey;
  }

  private getAuthorizationHeaders(): {headers: { Authorization: string} } {
    return {
      headers: {
        Authorization: `Bearer ${this.getToken}`,
      },
    };
  }

  private static getScopes() {
    return [
      'user-library-modify',
      'user-library-read',
      'ugc-image-upload',
      'playlist-read-private',
      'playlist-modify-public',
      'playlist-read-collaborative',
      'playlist-modify-private',
      'user-read-currently-playing',
      'user-modify-playback-state',
      'user-read-playback-state',
      'user-read-recently-played',
      'user-top-read',
      'user-follow-read',
      'user-follow-modify',
      'app-remote-control',
      'streaming',
    ];
  }

  getAuthorizationUrl(): string {
    const url = new URL(SpotifyClient.authUrl);
    const scopes = SpotifyClient.getScopes().join(' ');
    const urlKeyAndValues = [
      {
        key: 'response_type',
        value: this.responseType,
      },
      {
        key: 'client_id',
        value: SpotifyClient.clientId,
      },
      {
        key: 'scope',
        value: scopes,
      },
      {
        key: 'state',
        value: 'profile_activity',
      },
      {
        key: 'redirect_uri',
        value: SpotifyClient.redirectUri,
      },
    ];
    const urlString = Urls.buildUrl(url, urlKeyAndValues).toString();
    return urlString;
  }

  getMyProfileData(): Promise<any> {
    const headers = this.getAuthorizationHeaders();
    return this.axiosInstance.get(SpotifyClient.myProfileUrl, headers);
  }

  getMyRecentTracks(): Promise<any> {
    const headers = this.getAuthorizationHeaders();
    return this.axiosInstance.get(SpotifyClient.myTracksUrl, headers);
  }

  async populateMyProfileData() {
    try {
      const { data } = await this.getMyProfileData();
      this.store.commit('SET_PROFILE_DATA', data);
    } catch (e) {
      console.log(e);
    }
  }

  async populateMyRecentTracks() {
    try {
      const { data } = await this.getMyRecentTracks();
      this.store.commit('SET_MY_RECENT_TRACKS_DATA', data);
    } catch (e) {
      console.log(e);
    }
  }

  async populateAdminData() {
    await this.populateMyProfileData();
    await this.populateMyRecentTracks();
  }

  constructor() {
    super(SpotifyClient.axiosConfig, SpotifyClient.interceptors);
  }

  static getSpotifyClient() {
    if (SpotifyClient.singleton !== undefined) {
      return SpotifyClient.singleton;
    }
    return new SpotifyClient();
  }
}


export default SpotifyClient.getSpotifyClient;
