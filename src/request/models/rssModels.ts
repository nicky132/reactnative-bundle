import {RSS_API} from '../api';
import Http from '../request';

export default class RssModels extends Http {
  getTest() {
    return new Promise((resolve, reject) => {
      this.fetchGet(RSS_API.test)
        .then(resp => {
          resolve(resp);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
