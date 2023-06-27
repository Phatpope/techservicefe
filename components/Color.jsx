import Button from "./Button";

export default function Color({label, id, updateFilterValue}) {
    const colorsData = [
        { id: 1, name: "Red", code: "#FF0000" },
        { id: 2, name: "Blue", code: "#0000FF" },
        { id: 3, name: "Green", code: "#00FF00" },
        { id: 4, name: "Yellow", code: "#FFFF00" },
      ];
    return (
        <label className="inline-flex items-center mt-3 mr-3">
           {colorsData.map((color) => (
        <Button
          key={color.id}
          color={color.name.toLowerCase()}
          onClick={() => handleClick(color)}
        />
      ))}
        </label>
    )
}
