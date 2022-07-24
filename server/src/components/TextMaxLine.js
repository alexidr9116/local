import PropTypes from 'prop-types';

TextMaxLine.propTypes = {
  maxLine: PropTypes.number,
  text:PropTypes.string,
}
export default function TextMaxLine({ maxLine=3, text, ...other }) {
  return (
    <p {...other} style={{ WebkitLineClamp: maxLine, WebkitBoxOrient: 'vertical', display: '-webkit-box', overflow: 'hidden' }}>
      {text}
    </p>
  )
}