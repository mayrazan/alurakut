import { ProfileRelationsBoxWrapper } from "../ProfileRelations";

export const ProfileBoxInfo = (props) => {
  const { title, array, type, count } = props;
  const reducedArray = array.slice(0, 6);

  return (
    <>
      <ProfileRelationsBoxWrapper>
        {type === 1 ? (
          <>
            <h2 className="smallTitle">
              {title} ({array.length})
            </h2>
            <ul>
              {reducedArray.map((item) => {
                return (
                  <li key={item.id}>
                    <a href={`${item.link}`}>
                      <img src={item.image} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </>
        ) : (
          <>
            <h2 className="smallTitle">
              {title} ({count})
            </h2>
            <ul>
              {reducedArray.map((item, index) => {
                return (
                  <li key={index}>
                    <a href={`${item.html_url}`}>
                      <img src={`${item.avatar_url}`} />
                      <span>{item.login}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </ProfileRelationsBoxWrapper>
    </>
  );
};
