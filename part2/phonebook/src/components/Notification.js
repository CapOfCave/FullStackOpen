const Notification = ({ data }) => {
  if (data == null) {
    return null;
  }
  const style = {
    color: data.type === "success" ? "green" : "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  };

  return <div style={style}>{data.message}</div>;
};

export default Notification;
