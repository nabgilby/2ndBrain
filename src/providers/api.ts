import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class Api {
  url: string = 'https://parseapi.back4app.com';
  headers: Headers;
  appID: string = "ZcOTt5crhMxXE7MRPRAhaMvMNrZqMAiZ1gnK1ZyL";
  masterKey: string = "R8L4R3EdBu2M8WayrvddYpxD1xcIJhN7pyR2Brwr";
 // RESTKey: string = "QDyxsNLHA761KgxXol28joUTPyaf92VBH3GohkkP";
//  SessionKey: string = "r:133b77d892015c84bfc7a4a742718e40"


  constructor(public http: Http) {
    this.headers = new Headers();
    this.headers.append("X-Parse-Application-Id", this.appID);
    this.headers.append("X-Parse-Master-Key", this.masterKey)
 //   this.headers.append("X-Parse-REST-API-Key", this. RESTKey);
  //  this.headers.append("X-Parse-Session-Token", this.SessionKey);
  }

  get(endpoint: string, params?: any, options?: RequestOptions) {
 
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }
    options.headers = this.headers;
    console.log("Get = " + endpoint + " " + JSON.stringify(params) + " " + JSON.stringify(options));
    return this.http.get(this.url + '/' + endpoint, options);
  }

  post(endpoint: string, body: any, options?: RequestOptions) {
    //this.api.post('users', accountInfo).share();
    console.log("Post = " + endpoint + " " + body + " " + options);
    return this.http.post(this.url + '/' + endpoint, body, { headers: this.headers});
  }

  put(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }

  delete(endpoint: string, options?: RequestOptions) {
    return this.http.delete(this.url + '/' + endpoint, options);
  }

  patch(endpoint: string, body: any, options?: RequestOptions) {
    return this.http.put(this.url + '/' + endpoint, body, options);
  }
}
