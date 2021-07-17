import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getAllScraps } from "../src/api/datoCMS";
import { ProfileSidebar } from "../src/components/ProfileSideBar";
import {
  ScrapBox,
  BoxTitle,
  AvatarStyled,
  ContainerInfoStyled,
  ScrapTextStyled,
  NameStyled,
} from "../src/components/ScrapBox";
import ScrapGrid from "../src/components/ScrapGrid";
import { AlurakutMenu } from "../src/lib/AlurakutCommons";

const Scrap = () => {
  const githubUser = localStorage.getItem("githubUser")
    ? JSON.parse(localStorage.getItem("githubUser") || "")
    : "";
  const [scraps, setScraps] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllScraps().then((res) => setScraps(res));
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
            <h2 className="title">Meus recados</h2>
            <p className="scrap-path">
              <a onClick={() => router.push("/")}>Início</a>
              {" > "}Meus recados
            </p>
          </BoxTitle>
          {scraps.map((item, index) => {
            return (
              <ScrapBox color={index} key={item.id}>
                <AvatarStyled src={item.avatar} alt={item.avatar} />
                <ContainerInfoStyled>
                  <ScrapTextStyled>{item.message}</ScrapTextStyled>
                  <NameStyled>@{item.creatorslug}</NameStyled>
                </ContainerInfoStyled>
              </ScrapBox>
            );
          })}
        </div>
      </ScrapGrid>
    </>
  );
};

export default Scrap;
