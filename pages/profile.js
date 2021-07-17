import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getProfileInfo } from "../src/api/getProfileInfo";
import { ProfileSidebar } from "../src/components/ProfileSideBar";
import {
  ScrapBox,
  BoxTitle,
  ContainerInfoStyled,
  ScrapTextStyled,
  NameStyled,
} from "../src/components/ScrapBox";
import ScrapGrid from "../src/components/ScrapGrid";
import { AlurakutMenu } from "../src/lib/AlurakutCommons";

const Profile = () => {
  const githubUser = JSON.parse(localStorage.getItem("githubUser") || "");
  const [profile, setProfile] = useState({});
  const router = useRouter();

  useEffect(() => {
    getProfileInfo(githubUser).then((res) => setProfile(res));
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <ScrapGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="scrapArea" style={{ gridArea: "scrapArea" }}>
          <BoxTitle>
            <h2 className="title">Meu perfil</h2>
            <p className="scrap-path">
              <a onClick={() => router.push("/")}>Início</a>
              {" > "}Meu perfil
            </p>
          </BoxTitle>

          <ScrapBox key={profile.id}>
            <ContainerInfoStyled>
              <span>Bio</span>
              <ScrapTextStyled>{profile.bio}</ScrapTextStyled>
              <NameStyled>Repositórios: {profile.public_repos}</NameStyled>
            </ContainerInfoStyled>
          </ScrapBox>
        </div>
      </ScrapGrid>
    </>
  );
};

export default Profile;
