import DrawATree from "assets/images/draw-a-tree.jpg";
import DrawAHouse from "assets/images/draw-a-house.jpg";
import DrawAPerson from "assets/images/draw-a-person.jpg";

function DrawingTypeInfo({ object }) {
  let description, drawImage;
  if (object == "Tree") {
    description = (
      <span>
        In this creative exercise, individuals use the elements of the
        <i>
          <b> Tree</b>
        </i>
        , such as
        <i>
          <b> Canopy</b>
        </i>
        ,
        <i>
          <b> Trunk</b>
        </i>
        ,
        <i>
          <b> Root</b>
        </i>
        , and the <i>overall structure</i>, symbolizing different aspects of themselves. Analyzing
        the drawing and emotions associated with each part provides valuable insights into an
        individual's inner thoughts and self-awareness.
      </span>
    );
    drawImage = DrawATree;
  } else if (object == "House") {
    description = (
      <span>
        In this creative exercise, individuals use the elements of the
        <i>
          <b> House</b>
        </i>
        , such as{" "}
        <i>
          <b>Door</b>
        </i>
        ,
        <i>
          <b> Windows</b>
        </i>
        ,{" "}
        <i>
          <b>Roof</b>
        </i>
        ,{" "}
        <i>
          <b>Walls</b>
        </i>
        , and the{" "}
        <i>
          <b>overall structure</b>
        </i>
        ,, symbolizing different aspects of themselves. Analyzing the drawing and emotions
        associated with each part provides valuable insights into an individual's inner thoughts and
        self-awareness.
      </span>
    );
    drawImage = DrawAHouse;
  } else if (object == "Person") {
    description = (
      <span>
        In this creative exercise, individuals use the elements of the
        <i>
          <b> Person</b>
        </i>
        , such as
        <i>
          <b> Head</b>
        </i>
        ,
        <i>
          <b> Eyes</b>
        </i>
        ,
        <i>
          <b> Nose</b>
        </i>
        ,
        <i>
          <b> Mouth</b>
        </i>
        ,
        <i>
          <b> Ears</b>
        </i>
        ,
        <i>
          <b> Hair</b>
        </i>
        ,
        <i>
          <b> Neck</b>
        </i>
        ,
        <i>
          <b> Arms</b>
        </i>
        ,
        <i>
          <b> Hands</b>
        </i>
        ,
        <i>
          <b> Legs</b>
        </i>
        ,
        <i>
          <b> Feet</b>
        </i>{" "}
        and the
        <i>
          <b> overall structure</b>
        </i>
        ,, symbolizing different aspects of themselves. Analyzing the drawing and emotions
        associated with each part provides valuable insights into an individual's inner thoughts and
        self-awareness.
      </span>
    );
    drawImage = DrawAPerson;
  }
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <span className="font-themeHeader text-sm">Visual Self Expression</span>
      <span className="font-themeHeader text-4xl">Draw-A-{object}</span>
      <div>
        <img src={drawImage} alt="Uploaded" className="max-h-[26rem] w-auto" />
      </div>
      <span className="bg-themewhite p-3 rounded-lg w-full text-justify my-3 text-[1rem]">
        {description}
      </span>
    </div>
  );
}

export default DrawingTypeInfo;
