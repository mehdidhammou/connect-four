import Cell from "./Cell";

const Column = ({ colum, onClick, disabled }) => {
  const initialBoardState = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
  ];

  function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
  }

  const transposedBoardState = transpose(initialBoardState);

  return (
    <div
      onClick={() => onClick(colum)}
      className={disabled ? "column disabled" : "column"}
    >
      {/* Render the cells within the column */}
      {colum.map((value, index) => (
        <Cell key={index} value={value} />
      ))}
    </div>
  );
};

export default Column;
