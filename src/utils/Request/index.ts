import axios, {AxiosResponse} from 'axios';
export function requestSearchForPhotos(
  query: String,
  page: number = 1,
): Promise<AxiosResponse> {
  const url = `https://api.pexels.com/v1/search?page=${page}&query=${query}`;
  const headers = {
    headers: {
      Authorization: 'cjZZyZJrzjwR8lwd9fqRilNQvZrjiV2rTsXwPbdLrgoADCmezz0nmW4D',
    },
  };
  return axios.get(url, headers);
}
