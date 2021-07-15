import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from "../src/lib/AlurakutCommons";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProfileBoxInfo } from "../src/components/ProfileBoxInfo";
import { getRandomImage } from "../src/utils/getRandomImage";
import { createNewCommunity, getDataApi } from "../src/api/datoCMS";

function ProfileSidebar({ githubUser }) {
  return (
    <Box as="aside">
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${githubUser}`}>
          @{githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

export default function Home() {
  const githubUser = "mayrazan";
  const [followers, setFollowers] = useState([]);
  const [comunidades, setComunidades] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${githubUser}/followers`)
      .then((res) => setFollowers(res.data));
  }, []);

  useEffect(() => {
    (async () => {
      const communities = await getDataApi();
      setComunidades(communities);
    })();
  }, []);

  const handleCommunity = (e) => {
    e.preventDefault();
    const dadosDoForm = new FormData(e.target);

    const comunidade = {
      id: new Date().toISOString(),
      title: dadosDoForm.get("title"),
      image: getRandomImage(),
      link: dadosDoForm.get("link"),
    };

    createNewCommunity(
      comunidade.image,
      comunidade.link,
      comunidade.title
    ).then((res) => setComunidades([...comunidades, res]));

    e.target.reset();
  };

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet confiavel={3} legal={3} sexy={3} />
          </Box>
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCommunity}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque um link para sua comunidade"
                  name="link"
                  aria-label="Coloque um link para sua comunidade"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileBoxInfo type={1} title="Comunidades" array={comunidades} />
          <ProfileBoxInfo title="Pessoas da comunidade" array={followers} />
        </div>
      </MainGrid>
    </>
  );
}

// export const getStaticProps = async () => {
//   const communities = await getAllCommunities();
//   return {
//     props: {
//       communities,
//     },
//   };
// };
