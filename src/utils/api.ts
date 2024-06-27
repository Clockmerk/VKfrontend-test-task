import { ApiT } from '../types';

/**
 * The ApiInteface class provides methods for fetching data from the Hacker News API.
 */
export class ApiInteface implements ApiT {
  private targetUrl = 'https://hacker-news.firebaseio.com/v0';

  /**
   * Fetches data from the API based on the provided URL.
   * @param url - The URL to fetch data from.
   * @returns A Promise that resolves to an object containing the response status and data.
   */
  private async fetchData(url: string) {
    const response = await fetch(`${this.targetUrl}/${url}`);
    const res = await response.json();
    return { ok: response.ok, status: response.status, res };
  }

  /**
   * Fetches list data from the API based on the provided filter.
   * @param filter - The filter to apply to the list data.
   * @returns A Promise that resolves to an object containing the response status and data.
   */
  async getList(filter: string) {
    return this.fetchData(`${filter}.json`);
  }

  /**
   * Fetches item data from the API based on the provided ID.
   * @param id - The ID of the item to fetch data for.
   * @returns A Promise that resolves to an object containing the response status and data.
   */
  async getItem(id: string) {
    return this.fetchData(`item/${id}.json`);
  }
}

