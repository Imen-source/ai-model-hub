interface Props {
  models: { name: string; description?: string }[];
  value: string;
  onChange: (val: string) => void;
}

export default function ModelSelector({ models, value, onChange }: Props) {
  return (
    <select
      className="w-full border rounded-lg p-2 text-gray-700"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {models.map((m) => (
        <option key={m.name} value={m.name}>
          {m.name}
        </option>
      ))}
    </select>
  );
}
