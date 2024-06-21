import "./App.css";
import { useState, useRef, useEffect } from "react";
import allPics from "./info.json";
import html2canvas from "html2canvas";
import LazyLoad from "react-lazyload";

function App() {
  const divRef = useRef(null);

  const [currentHat, setCurrentHat] = useState(0);
  const [currentFace, setCurrentFace] = useState(0);
  const [currentMisc, setCurrentMisc] = useState(0);
  const [currentEffect, setCurrentEffect] = useState(0);

  const map = ["HAT", "FACE", "MISC", "EFFECT"];

  useEffect(() => {
    console.log(currentEffect);
  }, [currentEffect]);

  const handleReset = () => {
    setCurrentHat(0);
    setCurrentEffect(0);
    setCurrentFace(0);
    setCurrentMisc(0);
  };

  const handleRandom = () => {
    setCurrentHat(Math.floor(Math.random() * allPics.HAT.length));
    setCurrentFace(Math.floor(Math.random() * allPics.FACE.length));
    setCurrentMisc(Math.floor(Math.random() * allPics.MISC.length));
    setCurrentEffect(Math.floor(Math.random() * allPics.EFFECT.length));
  };

  const handleDownload = async () => {
    try {
      const node = divRef.current;
      const canvas = await html2canvas(node);
      const img = canvas.toDataURL("image/png");
      const imgElement = document.createElement("a");
      imgElement.href = img;
      imgElement.download = "footage";
      imgElement.click();
    } catch (error) {
      console.error("Error exporting div to image:", error);
    }
  };

  const getImg = (m) => {
    switch (m) {
      case "HAT":
        return require(`./assets/${m}/${allPics[m][currentHat]}`);
      case "FACE":
        return require(`./assets/${m}/${allPics[m][currentFace]}`);
      case "MISC":
        return require(`./assets/${m}/${allPics[m][currentMisc]}`);
      case "EFFECT":
        return require(`./assets/${m}/${allPics[m][currentEffect]}`);
      default:
        return;
    }
  };
  const isEmpty = (m) => {
    switch (m) {
      case "HAT":
        return currentHat === 0;
      case "FACE":
        return currentFace === 0;
      case "MISC":
        return currentMisc === 0;
      case "EFFECT":
        return currentEffect === 0;
      default:
        return false;
    }
  };

  const renderContent = (m, index) => {
    const handleBefore = () => {
      switch (m) {
        case "HAT":
          currentHat > 0 && setCurrentHat(currentHat - 1);
          break;
        case "FACE":
          currentFace > 0 && setCurrentFace(currentFace - 1);
          break;
        case "MISC":
          currentMisc > 0 && setCurrentMisc(currentMisc - 1);
          break;
        case "EFFECT":
          currentEffect > 0 && setCurrentEffect(currentEffect - 1);
          break;
        default:
          return;
      }
    };

    const handleNext = () => {
      switch (m) {
        case "HAT":
          currentHat < allPics[m].length - 1 && setCurrentHat(currentHat + 1);
          break;
        case "FACE":
          currentFace < allPics[m].length - 1 &&
            setCurrentFace(currentFace + 1);
          break;
        case "MISC":
          currentMisc < allPics[m].length - 1 &&
            setCurrentMisc(currentMisc + 1);
          break;
        case "EFFECT":
          currentEffect < allPics[m].length - 1 &&
            setCurrentEffect(currentEffect + 1);
          break;
        default:
          return;
      }
    };

    return (
      <div className="text" key={index}>
        <span>{m}</span>
        <div className="container">
          <img
            onClick={() => {
              handleBefore();
            }}
            src={require("./assets/arrow.png")}
            style={{
              width: "20px",
              transform: "rotate(270deg)",
              cursor: "pointer",
              zIndex: "99",
            }}
          />
          {
            <div className="middle">
              <LazyLoad>
                <img
                  className={`${isEmpty(m) ? "empty" : `icon ${m}`} `}
                  src={getImg(m)}
                />
              </LazyLoad>
            </div>
          }
          <img
            onClick={() => {
              handleNext();
            }}
            src={require("./assets/arrow.png")}
            style={{
              width: "20px",
              transform: "rotate(90deg)",
              cursor: "pointer",
              zIndex: "99",
            }}
          />
        </div>
      </div>
    );
  };
  return (
    <div className="App">
      <div className="content">
        <div className="buttons">
          <div className="button" onClick={handleReset}>
            RESET
          </div>
          <div className="button" onClick={handleRandom}>
            RANDOM
          </div>
          <div className="button" onClick={handleDownload}>
            DOWNLOAD
          </div>
        </div>

        <div className="main">
          <div className="art"></div>
          <div className="show">
            <div className="man-container" ref={divRef}>
              {!isEmpty("HAT") && <img src={getImg("HAT")} className="hat" />}
              <img src={require("./assets/awesome.png")} className="awesome" />
              {!isEmpty("FACE") && (
                <img src={getImg("FACE")} className="face" />
              )}
              {!isEmpty("MISC") && (
                <img src={getImg("MISC")} className="misc" />
              )}
              {!isEmpty("EFFECT") && (
                <img src={getImg("EFFECT")} className="effect" />
              )}
            </div>
          </div>
          <div className="art"></div>
        </div>
        <div className="textList">
          {map.map((i, index) => {
            return renderContent(i, index);
          })}
        </div>
      </div>
      <div className="otherText">
        <div> </div>
        <div className="social" style={{ marginTop: "20px"}}>POPO CAT MAKER</div>
        <div style={{ marginTop: "20px" }}>
          <a href="https://t.me/fattycat_solana" target="_blank" rel="noopener noreferrer">TELEGRAM</a>
          <span> | </span>
          <a href="https://x.com/solana_fattycat" target="_blank" rel="noopener noreferrer">TWITTER</a>
        </div>
      </div>
    </div>
  );
}

export default App;
