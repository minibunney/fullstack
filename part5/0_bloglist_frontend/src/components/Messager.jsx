import PropTypes from 'prop-types'
const Messager = ({ message, color }) => {
  const semiRandomColor = `#${Math.floor(Math.random() * 16777214).toString(
    16
  )}`;
  const borderStyle = {
    color: color ?? semiRandomColor,
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px}",
  };
  if (message === null) {
    return null;
  }
  return (
    <div style={borderStyle} className="error">
      <span style={{ color: "black" }}>{message}</span>
    </div>
  );
};

Messager.PropTypes = {
  message: PropTypes.string.isRequired
}
export default Messager;
