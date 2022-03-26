const Loading = () => {
  const styles = {
    display: "flex",
    with: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div className="loading-container" style={styles}>
      <img src="/PosibleImages/loading.gif" alt="loading" />
    </div>
  );
};

export default Loading;
