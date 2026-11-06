import { Link } from 'react-router';

// Loading / not found / error states for link-based pages.
const SocialStatus = ({ status, what }) => (
  <div className="container section social-page" role="status">
    {status === 'loading' && <p className="page-loading">carregando</p>}
    {status === 'missing' && (
      <>
        <h1 className="page-title">este link de {what} não existe</h1>
        <p>confira o endereo que voc recebeu ou crie o seu.</p>
        <Link to="/play" className="btn btn-primary">jogar com amigos</Link>
      </>
    )}
    {status === 'error' && (
      <>
        <h1 className="page-title">não conseguimos carregar {what}</h1>
        <p>confira sua conexo e atualize a pgina.</p>
      </>
    )}
  </div>
);

export default SocialStatus;
