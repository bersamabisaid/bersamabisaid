import BaseHeader from 'src/requests/BaseHeader';

export default new Request('http://localhost:3000/api/midtrans', {
  headers: BaseHeader(),
});
