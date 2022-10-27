import {Alert} from 'react-native';

type optionsType = RequestInit & {
  postType?: 'json' | 'form';
};

// http响应
const responseHandler = (response: Response) => {
  const {status} = response;
  // http status 200
  if (status === 200) {
    if (response.headers.get('content-type')?.includes('application/json')) {
      return response.json();
    } else {
      return response.text();
    }
  } else {
    // Alert.alert(`HTTP STATUS ${status}`);
    return Promise.reject(`HTTP STATUS ${status}`);
  }
};

// http json响应
const responseJsonHandler = (
  responseJson:
    | {
        code?: string | number;
        data?: Record<string, any>;
      }
    | string,
) => {
  // http json code 200
  // console.log(responseJson);
  if (typeof responseJson !== 'string') {
    if (responseJson?.code === 200) {
      return responseJson;
    } else {
      Alert.alert('http json code != 200');
    }
  } else {
    // 如果是xml
    if (responseJson.startsWith('<?xml')) {
      return responseJson;
    }
    // 如果是html
    if (responseJson.includes('<!DOCTYPE')) {
      return responseJson;
    }
    Alert.alert('request is bad');
  }
};

// fetch doc https://www.ruanyifeng.com/blog/2020/12/fetch-tutorial.html
export default class Http {
  fetchGet(url: string, options: optionsType = {}) {
    const body = JSON.stringify(options?.body);
    const headers = Object.assign({}, options?.headers);
    return fetch(url, {
      method: 'GET',
      headers,
      body,
    })
      .then(response => {
        return responseHandler(response);
      })
      .then(responseJson => {
        return responseJsonHandler(responseJson);
      })
      .catch(error => {
        // 只有网络错误，或者无法连接时，fetch才会报错
        console.log('fetchGet', error);
        Alert.alert(error.message || error || 'wuuuuuuuu~');
      });
  }

  fetchPost(url: string, options: optionsType = {postType: 'json'}) {
    const body = options.postType === 'form' ? options.body : JSON.stringify(options.body);

    const headers =
      options.postType === 'form'
        ? Object.assign(
            {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            options.headers,
          )
        : Object.assign(
            {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            options.headers,
          );

    return fetch(url, {
      method: 'POST',
      headers,
      body,
    })
      .then(response => {
        return responseHandler(response);
      })
      .then(responseJson => {
        return responseJsonHandler(responseJson);
      })
      .catch(error => {
        // 只有网络错误，或者无法连接时，fetch才会报错
        console.log('fetchGet', error);
        Alert.alert(error.message || error || 'wuuuuuuuu~');
      });
  }
}
