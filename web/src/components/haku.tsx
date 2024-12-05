const Haku = () => {
  return (
    <div className="scene">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="mirror" />
      ))}
    </div>
  );
};

export default Haku;
