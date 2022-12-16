import { useState, useEffect } from "react";

const EffectTutorialSixth = () => {
  const [name, setName] = useState("name");
  const [email, setEmail] = useState("email");

  useEffect(() => {
    console.log("useEffect` with an array as a second argument");

    return () => console.log("useEffect: Clean Up");
  }, [name, email]);

  const changeName = () => setName(name + "new");
  const changeEmail = () => setEmail(email + "/new");

  return (
    <>
      <button onClick={changeName}>Name</button>
      <button onClick={changeEmail}>Email</button>
      <div>
        Name: {name}, Email: {email}
      </div>
    </>
  );
};

export default EffectTutorialSixth;
