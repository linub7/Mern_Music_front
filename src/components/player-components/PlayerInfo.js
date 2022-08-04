const PlayerInfo = ({ songTitle, artist, album, year }) => {
  return (
    <div className="flex gap-3">
      <img
        src="https://www.pngimages.pics/images/quotes/english/general/music-symbol-png-clipart-52650-297684.png"
        alt="music-symbol"
        className="w-12 h-12 object-cover "
      />
      <div className="flex flex-col gap-2">
        <h1 className="text-sm font-semibold text-slate-700">{songTitle}</h1>
        <h1 className="text-xs text-slate-500">
          {artist}, {album}, {year}
        </h1>
      </div>
    </div>
  );
};

export default PlayerInfo;
