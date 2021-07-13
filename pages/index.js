import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
  AlurakutProfileSidebarMenuDefault,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProfileBoxInfo } from "../src/components/ProfileBoxInfo";

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
  const [comunidades, setComunidades] = useState([
    {
      id: "32665",
      title: "Eu odeio acordar cedo",
      image: "https://alurakut.vercel.app/capa-comunidade-01.jpg",
      link: "https://starwars.fandom.com/pt/wiki/Star_Wars",
    },
    {
      id: "656556",
      title: "Harry Potter",
      image:
        "https://i1.wp.com/www.toppapeldeparede.com.br/wp-content/uploads/2021/03/Harry-Potter-wallpaper.jpg?w=640&ssl=1",
      link: "https://harrypotter.fandom.com/wiki/Main_Page",
    },
    {
      id: new Date().toISOString(),
      title: "Game of Thrones",
      image:
        "https://static.wikia.nocookie.net/gameofthrones/images/2/2c/Season_1_Poster.jpg",
      link: "https://gameofthrones.fandom.com/wiki/Game_of_Thrones_Wiki",
    },
  ]);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${githubUser}/followers`)
      .then((res) => setFollowers(res.data));
  }, []);

  const getRandomImage = () => {
    const random = Math.floor(Math.random() * 200) + 1;
    return `https://picsum.photos/200/300?random=${random}`;
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
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const dadosDoForm = new FormData(e.target);

                console.log("Campo: ", dadosDoForm.get("title"));
                // console.log("Campo: ", dadosDoForm.get("image"));

                const comunidade = {
                  id: new Date().toISOString(),
                  title: dadosDoForm.get("title"),
                  image: getRandomImage(),
                  link: dadosDoForm.get("link"),
                };

                setComunidades([...comunidades, comunidade]);
              }}
            >
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
