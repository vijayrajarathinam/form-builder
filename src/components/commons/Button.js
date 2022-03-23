const DEFAULT_CLICK_AUDIO_URL = "/click.mp3";
const DEFAULT_CLICK_UP_AUDIO_URL = "/clickUp.mp3";

export const Primary = ({ text, Icon, onClick, classes }) => {
  const mouseUp = () => new Audio(DEFAULT_CLICK_AUDIO_URL).play();
  const mouseDown = () => new Audio(DEFAULT_CLICK_UP_AUDIO_URL).play();
  const onButtonClick = (func) => {
    return (e) => {
      e.preventDefault();
      func();
    };
  };
  return (
    <button
      onClick={onButtonClick(onClick)}
      onMouseUp={mouseUp}
      onMouseDown={mouseDown}
      className={`h-10 md:h-15 inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline ${classes}`}
    >
      <Icon className="w-4 h-4" />
      {text}
    </button>
  );
};

export default { Primary };
