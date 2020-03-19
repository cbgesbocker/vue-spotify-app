interface UrlKeyAndValue {
  key: string; value: string;
}

export default {
  buildUrl(url: URL, urlKeysAndValues: UrlKeyAndValue[]): URL {
    const localUrl = url;
    urlKeysAndValues.forEach((config: {key: string; value: string}) => {
      localUrl.searchParams.set(config.key, config.value);
    });
    return localUrl;
  },
};
