const Ping = () => {
  return (
    <div className="relative">
      <div className="absolute -left-4 top-1">
        <span className="flex size-[11px]">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-900 opacity-75" />
          <span className="relative inline-flex size-[11px] rounded-full bg-red-600" />
        </span>
      </div>
    </div>
  );
};

export default Ping;
