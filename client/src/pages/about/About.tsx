import { useEffect } from "react";
import { usePreferences } from "../../contexts/Preferences.context";
import { StyledAbout } from "./StyledAbout";
import about1 from "../../assets/images/about-1.jpg";
import about2 from "../../assets/images/about-2.jpg";
import about3 from "../../assets/images/about-3.jpg";

function About() {
  const { setIsLoading } = usePreferences();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  return (
    <StyledAbout>
      <h1>About & Background</h1>
      <p>
        This project was made during the full-stack course i took at AppleSeeds.
        it was some intense 6 month, 720 hours training program that encourages
        self-led learning and group projects that simulate real-world
        development teams. There I learned the following technologies:{" "}
        <strong>
          JavaScript, React.js, TypeScript, Node.js, SCSS, WebSockets, MongoDB,
          Git, Github, Firebase and more.
        </strong>
      </p>
      <h2>Meet Ali...</h2>
      <img src={about1} alt="about1" />
      <p>
        The project idea <strong>Helping-Hand</strong> was inspired by my
        experience in 2021 where i have volunteered to a program helping old
        people especially those who have been severely affected by the pandemic,
        There i was assigned to be with <strong>Ali Heib</strong>, to help him
        with daily things, visit him and try to have a good time, take him
        places he would like to visit and sometimes i even helped him in his
        farm for the very simply reason that i enjoyed his company so much!
      </p>
      <div className="botImgs">
        <img src={about2} alt="about2" />
        <img src={about3} alt="about3" />
      </div>
      <h3>Many are in need!</h3>
      <p>
        Maybe we don't notice, or meet such people, people who really need help,
        or sometimes they just need someone to be with and have a good time...
        especially old people, where some don't have anyone.
        <br />
        <br /> In this website there are two types of accounts! Helpers, or help
        receivers. The goal of this project idea is that these people can make
        help requests describing what they need, then markers on the map would
        show for those who want to and can offer the help, messages are
        available for better communication aswel as review posting after a help
        interaction and many more planned to be added in the future, stay tuned!
      </p>
      <p></p>
    </StyledAbout>
  );
}

export default About;
