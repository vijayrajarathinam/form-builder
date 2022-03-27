export const DEFAULT_CLICK_AUDIO_URL = "/click.mp3";
export const DEFAULT_CLICK_UP_AUDIO_URL = "/clickUp.mp3";

const ctx = new AudioContext();

export function createSound(fr, time, _type, vol) {
  const osc = ctx.createOscillator(),
    gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = _type;
  osc.start();
  osc.frequency.value = fr;
  gain.gain.value = vol;
  setTimeout(() => {
    osc.frequency.value = 0;
    osc.stop();
  }, time);
}

export const Primary = ({ text, Icon, onClick, style, className }) => {
  const onButtonClick = (func) => {
    return (e) => {
      e.preventDefault();
      func();
    };
  };
  return (
    <button
      style={style}
      onClick={onButtonClick(onClick)}
      onMouseUp={(e) => createSound(350, 50, "triangle", 0.07)}
      onMouseDown={(e) => createSound(350, 50, "triangle", 0.05)}
      className={`h-10 md:h-15 inline-flex items-center bg-lime-600 hover:bg-lime-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline ${className}`}
    >
      <Icon className="w-4 h-4" />
      {text}
    </button>
  );
};

export const Danger = ({ text, Icon, onClick, className }) => {
  const onButtonClick = (func) => {
    return (e) => {
      e.preventDefault();
      func();
    };
  };
  return (
    <button
      onClick={onButtonClick(onClick)}
      onMouseUp={(e) => createSound(350, 50, "square", 0.07)}
      onMouseDown={(e) => createSound(450, 50, "square", 0.05)}
      className={`h-10 md:h-15 inline-flex items-center bg-rose-600 hover:bg-rose-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline ${className}`}
    >
      <Icon className="w-4 h-4" />
      {text}
    </button>
  );
};

export const Default = ({ text, Icon, onClick, className, style }) => {
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
      style={style}
      onClick={onButtonClick(onClick)}
      onMouseUp={mouseUp}
      onMouseDown={mouseDown}
      className={`h-10 md:h-15 inline-flex items-center bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-5 text-sm rounded-lg shadow outline-none gap-x-1 focus:outline-none focus:shadow-outline ${className}`}
    >
      <Icon className="w-4 h-4" />
      {text}
    </button>
  );
};

export default { Primary, Danger, Default };
