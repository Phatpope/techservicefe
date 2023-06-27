export default function Checkbox({label, id, handleCategory}) {
    console.log(id)
    return (
        <label className="inline-flex items-center mt-3 mr-3">
            <input type="checkbox" className="h-5 w-5" value={label} onChange={e => handleCategory(e.target.value)}/><span className="ml-2 text-gray-700">{label}</span>
        </label>
    )
}
