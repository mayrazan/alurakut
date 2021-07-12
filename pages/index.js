import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";
import { useEffect, useState } from "react";
import axios from "axios";

function ProfileSidebar({ githubUser }) {
  return (
    <Box>
      <img
        src={`https://github.com/${githubUser}.png`}
        style={{ borderRadius: "8px" }}
      />
    </Box>
  );
}

export default function Home() {
  const githubUser = "mayrazan";
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${githubUser}/followers`)
      .then((res) => setFollowers(res.data));
  }, []);

  const reducedArray = followers.slice(0, 6);
  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        {/* <Box style="grid-area: profileArea;"> */}
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet confiavel={3} legal={3} sexy={3} />
          </Box>
        </div>
        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({followers.length})
            </h2>

            <ul>
              {reducedArray.map((item, index) => {
                return (
                  <li key={index}>
                    <a href={`${item.html_url}`} key={index}>
                      <img src={`${item.avatar_url}`} />
                      <span>{item.login}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
