import React from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";
import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import {
  AlurakutMenu,
  OrkutNostalgicIconSet,
} from "../src/lib/AlurakutCommons";
import { useEffect, useState } from "react";
import { ProfileBoxInfo } from "../src/components/ProfileBoxInfo";
import { getRandomImage } from "../src/utils/getRandomImage";
import { addRecord, getAllCommunities, getAllScraps } from "../src/api/datoCMS";
import { ProfileSidebar } from "../src/components/ProfileSideBar";
import { TasksBox } from "../src/components/TasksBox";
import {
  getProfileFollowers,
  getProfileInfo,
  verifyUser,
} from "../src/api/getProfileInfo";

export default function Home(props) {
  const githubUser = props.githubUser;
  const [followers, setFollowers] = useState([]);
  const [comunidades, setComunidades] = useState([]);
  const [scraps, setScraps] = useState([]);
  const [followersCount, setFollowersCount] = useState({});

  useEffect(() => {
    getProfileFollowers(githubUser).then((res) => setFollowers(res));

    getProfileInfo(githubUser).then((res) => setFollowersCount(res));

    getAllCommunities().then((res) => setComunidades(res));

    getAllScraps().then((res) => setScraps(res));
    localStorage.setItem("githubUser", JSON.stringify(githubUser));
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
          <ProfileBoxInfo
            title="Pessoas da comunidade"
            array={followers}
            count={followersCount.followers}
          />
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;

  const { isAuthenticated } = await fetch(
    "https://alurakut.vercel.app/api/auth",
    {
      headers: {
        Authorization: token,
      },
    }
  ).then((res) => res.json());

  // const auth = await verifyUser(githubUser);

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const { githubUser } = jwt.decode(token);

  return {
    props: {
      githubUser,
    }, // will be passed to the page component as props
  };
}
