import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  constructor() { }
  private cdaClient = createClient({
    space: environment.ContentfulConfig.space,
    accessToken: environment.ContentfulConfig.accessToken
  });

  getProducts(query?: object): Promise<Entry<any>[]> {
    return this.cdaClient.getEntries(Object.assign({
      content_type: environment.ContentfulConfig.contentTypeIds.product
    }, query))
    .then(res => res.items);
  }
}
