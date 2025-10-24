import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddressDropdown({ onSelect }) {
  const [form, setForm] = useState({
    state: "",
    city: "",
    area: "",
    block: "",
    flat: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleConfirm = () => {
    const isValid = Object.values(form).every((v) => v.trim() !== "");
    if (!isValid) {
      alert("Please fill all address fields.");
      return;
    }
    onSelect(form);
  };

  return (
    <div className="space-y-3 mt-3">
      {[
        { name: "state", label: "State" },
        { name: "city", label: "City / District" },
        { name: "area", label: "Area / Colony" },
        { name: "block", label: "Block" },
        { name: "flat", label: "Flat / House / Apartment" },
      ].map((field) => (
        <div key={field.name}>
          <Label
            htmlFor={field.name}
            className="text-sm text-gray-600 mb-1 block"
          >
            {field.label}
          </Label>
          <Input
            id={field.name}
            name={field.name}
            type="text"
            value={form[field.name]}
            onChange={handleChange}
            className="h-9 border border-sky-200 focus:border-sky-400 text-sm rounded-lg w-full focus:outline-none"
            placeholder={`Enter ${field.label}`}
            required
          />
        </div>
      ))}

      <Button
        type="button"
        onClick={handleConfirm}
        className="w-full mt-2 bg-linear-to-r from-sky-400 to-sky-500 hover:from-sky-500 hover:to-sky-600 text-white rounded-xl h-9 text-sm font-medium transition-all duration-300"
      >
        Save Address
      </Button>
    </div>
  );
}
  