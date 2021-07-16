import { useState } from "react";
import { addRecord } from "../../api/datoCMS";
import Box from "../Box";
import { ButtonTask } from "../ButtonTask";

export const TasksBox = ({ onSubmit }) => {
  const [flag, setFlag] = useState("Criar comunidade");

  const handleClick = (event) => {
    const { name } = event.target;
    setFlag(name);
  };

  const handleScrap = (e) => {
    e.preventDefault();
    const formResult = new FormData(e.target);

    const scrap = {
      itemType: "971615",
      message: formResult.get("message"),
      creatorslug: formResult.get("name"),
      avatar: `https://github.com/${formResult.get("name")}.png`,
    };

    addRecord(scrap).then((res) => console.log(res));

    e.target.reset();
  };

  return (
    <Box>
      <h2 className="subTitle">O que você deseja fazer?</h2>
      <ButtonTask text="Criar comunidade" onClick={handleClick} />
      <ButtonTask text="Deixar um scrap" onClick={handleClick} />
      {flag === "Criar comunidade" ? (
        <form onSubmit={onSubmit}>
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
      ) : (
        <form onSubmit={handleScrap}>
          <input
            placeholder="Digite seu usuario do github sem o @"
            name="name"
            aria-label="Digite seu usuario do github sem o @"
            type="text"
          />
          <input
            placeholder="Deixe aqui o seu recado"
            name="message"
            aria-label="Deixe aqui o seu recado"
            type="text"
          />

          <button>Criar scrap</button>
        </form>
      )}
    </Box>
  );
};
