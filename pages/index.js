import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProfileBoxInfo } from "../src/components/ProfileBoxInfo";
import { getRandomImage } from "../src/utils/getRandomImage";
import { addRecord, getAllCommunities, getAllScraps } from "../src/api/datoCMS";
import { ProfileSidebar } from "../src/components/ProfileSideBar";
import { TasksBox } from "../src/components/TasksBox";

export default function Home() {
  const githubUser = "mayrazan";
  const [followers, setFollowers] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [scraps, setScraps] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${githubUser}/followers`)
      .then((res) => setFollowers(res.data));

    getAllCommunities().then((res) => setComunidades(res));

    getAllScraps().then((res) => setScraps(res));
  }, []);

  const handleCommunity = (e) => {
    e.preventDefault();
    const dadosDoForm = new FormData(e.target);

    const comunidade = {
      title: dadosDoForm.get("title"),
      image: getRandomImage(),
      link: dadosDoForm.get("link"),
      itemType: "966896",
    };

    addRecord(comunidade).then((res) => setComunidades([...comunidades, res]));

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

            <OrkutNostalgicIconSet
              confiavel={3}
              legal={3}
              sexy={3}
              recados={scraps.length}
            />
          </Box>
          <TasksBox onSubmit={handleCommunity} />
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
