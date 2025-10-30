export function parseTitle(title: string) {
  const [name, ext] = title.split('.');
  const length = name.length - 13;
  const parseName = name.slice(0, length);
  return parseName + '.' + ext;
}
