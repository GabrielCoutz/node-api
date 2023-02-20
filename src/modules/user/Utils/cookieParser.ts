interface ICookieParser {
  [key: string]: string;
}

export const cookieParser = (cookiesHeader: string | undefined) => {
  if (typeof cookiesHeader != 'string') return {};

  const cookies = cookiesHeader.split(/;\s*/);

  const parsedCookie: ICookieParser = {};

  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=');
    parsedCookie[key.toLowerCase()] = value;
  }

  return JSON.parse(JSON.stringify(parsedCookie));
};
