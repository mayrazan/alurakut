import React, { useState } from "react";
// Hook do NextJS
import nookies from "nookies";
import { useRouter } from "next/router";
import axios from "axios";
import { verifyUser } from "../src/api/getProfileInfo";

export default function LoginScreen() {
  const router = useRouter();
  const [githubUser, setGithubUser] = useState("mayrazan");
  const [authenticated, setAuthenticated] = useState(false);

  const data = {
    githubUser: githubUser,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await axios
      .post("https://alurakut.vercel.app/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async (res) => {
        const token = await res.data.token;
        const auth = await verifyUser(githubUser);

        if (auth) {
          setAuthenticated(false);
          nookies.set(null, "USER_TOKEN", token, {
            path: "/",
            maxAge: 86400 * 7,
          });
          router.push("/");
        } else {
          setAuthenticated(true);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <main
      style={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="loginScreen">
        <section className="logoArea">
          <img src="https://alurakut.vercel.app/logo.svg" />

          <p>
            <strong>Conecte-se</strong> aos seus amigos e familiares usando
            recados e mensagens instantâneas
          </p>
          <p>
            <strong>Conheça</strong> novas pessoas através de amigos de seus
            amigos e comunidades
          </p>
          <p>
            <strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só
            lugar
          </p>
        </section>

        <section className="formArea">
          <form className="box" onSubmit={handleSubmit}>
            <p>
              Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
            </p>
            <input
              placeholder="Usuário"
              value={githubUser}
              onChange={(event) => {
                setGithubUser(event.target.value);
              }}
              type="text"
              required
            />
            {githubUser.length === 0 && "Preencha o campo"}
            <button type="submit" className="loginBtn">
              Login
            </button>

            {authenticated && (
              <span className="invalidUser">
                Usuário Inválido! Tente novamente.
              </span>
            )}
          </form>

          <footer className="box">
            <p>
              Ainda não é membro? <br />
              <a href="/login">
                <strong>ENTRAR JÁ</strong>
              </a>
            </p>
          </footer>
        </section>

        <footer className="footerArea">
          <p>
            © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> -{" "}
            <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> -{" "}
            <a href="/">Termos</a> - <a href="/">Contato</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
