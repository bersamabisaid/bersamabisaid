export default function BaseHeader() {
  const header = new Headers();

  header.set('accept', 'application/json');

  return header;
}
