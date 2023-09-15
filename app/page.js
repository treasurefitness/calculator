"use client";
import { useState } from "react";
import Image from "next/image";
import Profile from "./Treasure_Fitness_Logo.png";

import { Button, Card, Label, TextInput } from "flowbite-react";

export default function CardWithFormInputs() {
  const [weight, setWeight] = useState("");
  const [water, setWater] = useState("");
  const [clientName, setClientName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Calculate the amount of water the user should drink
    const waterInLiters = weight / 30;
    // Set the water state to the calculated amount
    setWater(waterInLiters.toFixed(1));
    setClientName("");
    setWeight("");
  };
  return (
    <>
      <Card>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
            <Image src={Profile} alt="profile" width={"25%"} height={"auto"} />
            <h1 className="pb-4 font-bold text-center text-red-600">
              Water Intake Calculator
            </h1>
            <form
              className="flex flex-col w-full gap-4"
              onSubmit={handleSubmit}
            >
              <div className="mb-2">
                <Label htmlFor="weight" value="Input Your Weight (Kgs)" />
                <TextInput
                  id="weight"
                  required
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <Button type="submit">Calculate</Button>
            </form>
            {water && (
              <div className="pt-6 text-center">
                <p className="pt-3">Hello 👋</p>
                <p className="pt-3">
                  You should drink{" "}
                  <span className="font-bold text-red-600">{water} liters</span>{" "}
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
