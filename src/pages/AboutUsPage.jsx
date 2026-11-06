import Dhruv from '../images/creators/dhruv.webp';
import Sanaj from '../images/creators/sanaj.webp';
import { buildMeta } from '../utils/seo';
import '../styles/AboutUsPage.css';
import TeamMemberCard from '../components/TeamMemberCard';

const teamMembers = [
  {
    name: 'Dhruv Chheda',
    role: 'Web Developer',
    imageUrl: Dhruv,
    githubUrl: 'https://github.com/chhedadhruv',
    linkedinUrl: 'https://www.linkedin.com/in/dhruv-chheda/',
  },
  {
    name: 'Sanaj Jadhav',
    role: 'Web Developer',
    imageUrl: Sanaj,
    githubUrl: 'https://github.com/sanajjadhav15',
    linkedinUrl: 'https://www.linkedin.com/in/sanaj-jadhav/',
  },
];

export const meta = () =>
  buildMeta({
    title: 'sobre o TrueYouTeller: nossa histria e propsito',
    description: 'conhea a histria do TrueYouTeller e das pessoas que criaram este teste gratuito de personalidade.',
    path: '/about',
  });

const AboutUsPage = () => {
  return (
    <div className="about-us-container container section">
      <div className="about-us-content">
        <h1 className="page-title">sobre o TrueYouTeller</h1>
        <p>
          o TrueYouTeller nasceu da curiosidade sobre o que faz cada pessoa ser nica. criamos este teste para ajudar voc a olhar para seus hbitos e preferências de um jeito leve, sem transformar um perfil em uma definio de quem voc .
        </p>
        <p>
          nossa ideia  juntar perguntas que fazem pensar com uma experincia divertida e acessvel. o resultado serve como ponto de partida para conversar e refletir, não como uma resposta definitiva sobre sua personalidade.
        </p>
        <h3>o que queremos</h3>
        <p>
          queremos que este cantinho da internet ajude voc a celebrar suas diferenas e talvez enxergar algo novo sobre si. esperamos que a experincia traga uma boa conversa, uma ideia interessante ou pelo menos um sorriso.
        </p>
      </div>

      <div className="team-section">
        <h2>quem fez o projeto</h2>
        <div className="team-members-container">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              role={member.role}
              imageUrl={member.imageUrl}
              githubUrl={member.githubUrl}
              linkedinUrl={member.linkedinUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage; 