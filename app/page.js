"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Profile from "./Treasure_Fitness_Logo.png";
import { Button, Card, Label, TextInput, Select } from "flowbite-react";

export default function CardWithFormInputs() {
  const [weight, setWeight] = useState("");
  const [unit, setUnit] = useState("Kilograms");
  const [result, setResult] = useState(null);
  const [showEmailField, setShowEmailField] = useState(false);
  const [email, setEmail] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailError, setEmailError] = useState(false);

  useEffect(() => {
    let timer;
    if (emailSuccess) {
      // If email is successfully sent, set a timer to reset after 4 seconds
      timer = setTimeout(() => {
        setWeight("");
        setUnit("Kilograms");
        setResult(null);
        setShowEmailField(false);
        setSubmittedEmail(false);
        setEmailSent(false);
        setEmailSuccess(false);
        setEmailError(false);
        setEmail("");
      }, 4000);
    }

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [emailSuccess]);

  const handleSubmitMeasurements = (e) => {
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
    setShowEmailField(true); // Show the email field after calculating the result
    setWeight(""); // Clear weight input
  };

  const sendEmailToZapier = async (email, value, unit) => {
    try {
      const response = await fetch(
        "https://hooks.zapier.com/hooks/catch/8441989/3v10zsk/",
        {
          method: "POST",

          body: JSON.stringify({
            email,
            value: value.toFixed(2),
            unit,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send email to Zapier");
      }

      console.log("Email sent successfully to Zapier");
      setEmailSuccess(true);
    } catch (error) {
      console.error("Error sending email to Zapier:", error.message);
      setEmailError(true);
    }
  };

  const handleSubmitEmail = (e) => {
    e.preventDefault();

   

    // Submit email, value, and unit to Zapier webhook
    sendEmailToZapier(email, result.value, result.unit).catch((error) =>
      console.error("Error sending email to Zapier:", error.message)
    );
    setSubmittedEmail(true);
  };

  return (
    <Card className="flex flex-col justify-center h-screen">
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-md p-8 overflow-hidden bg-white rounded shadow-lg">
          <Image src={Profile} alt="profile" width={"25%"} height={"auto"} />
          <h1 className="pb-4 font-bold text-center text-red-600">
            Water Intake Calculator
          </h1>
          <form
            className="flex flex-col w-full gap-4"
            onSubmit={handleSubmitMeasurements}
          >
            {!showEmailField && (
              <>
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
              </>
            )}
            {!showEmailField && <Button type="submit">Calculate</Button>}
          </form>
          {showEmailField && !submittedEmail && (
            <form
              className="flex flex-col w-full gap-4 p-6"
              onSubmit={handleSubmitEmail}
            >
              <div className="mb-2">
                <Label
                  htmlFor="email"
                  value="Please enter your email to get your measurements:"
                />
                <TextInput
                  id="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit">Submit Email</Button>
            </form>
          )}
          {emailSuccess && (
            <div className="pt-6 text-center text-green-600">
              <p>Email submitted successfully! Check your inbox.</p>
            </div>
          )}
          {emailError && (
            <div className="pt-6 text-center text-red-600">
              <p>Email not submitted. Please try again later.</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
