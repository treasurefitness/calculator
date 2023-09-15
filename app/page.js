"use client";
import { useState } from "react";
import Image from "next/image";
import Profile from "./Treasure_Fitness_Logo.png";

import { Button, Card, Label, TextInput, Select } from "flowbite-react";

export default function CardWithFormInputs() {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("Kilograms");

  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let convertedResult;
    let unitLabel;

    if (unit === "Kilograms") {
      convertedResult = weight / 30;
      unitLabel = "liters";
    } else if (unit === "Pounds") {
      convertedResult = weight / 2;
      unitLabel = "ounces";
    }
    setResult({ value: convertedResult, unit: unitLabel });
    setWeight("");
  };

  return (
    <>
      <Card>
        <div className="flex flex-col items-center justify-center h-screen ">
          <div className="w-full max-w-md p-8 overflow-hidden bg-white rounded shadow-lg">
            <Image src={Profile} alt="profile" width={"25%"} height={"auto"} />
            <h1 className="pb-4 font-bold text-center text-red-600">
              Water Intake Calculator
            </h1>
            <form
              className="flex flex-col w-full gap-4"
              onSubmit={handleSubmit}
            >
              <div className="mb-2">
                <Label htmlFor="weight" value="Input Your Weight" />
                <TextInput
                  id="weight"
                  required
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
                <div className="block mb-2">
                  <Label htmlFor="unit" value="Select your unit" />
                </div>
                <Select
                  id="unit"
                  required
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                >
                  <option value="Kilograms">Kilograms</option>
                  <option value="Pounds">Pounds</option>
                </Select>
              </div>

              <Button type="submit">Calculate</Button>
            </form>
            {result && (
              <div className="pt-6 text-center">
                <p className="pt-3">Hello 👋</p>
                <p className="pt-3">
                  You should drink{" "}
                  <span className="font-bold text-red-600">
                    {result.value.toFixed(2)} {result.unit}
                  </span>{" "}
                  of water per day.
                </p>
              </div>
            )}
          </div>
        </div>
      </Card>
    </>
  );
}
