export default function Button({ color, onClick }) {
    console.log("lzzzzz", color);
    const buttonStyle = {
      backgroundColor: color,
      width: '2rem',
      height: '2rem',
      borderRadius: '50%',
      marginLeft: '1rem',
      marginBottom: '1rem',


      border: 'none',
      outline: 'none',
      opacity: '0.5',
      cursor: 'pointer',
    };
  
    return (
      <button
        style={buttonStyle}
        onClick={onClick}
      >
        {/* You can add any content inside the button if needed */}
      </button>
    );
  }
  