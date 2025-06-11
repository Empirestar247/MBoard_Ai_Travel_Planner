import React, { useState } from "react";
import { SendHorizontal } from "lucide-react";

export default function TravelChatCopilot() {
  const [messages, setMessages] = useState([
    { sender: "AI", text: "Hi! Where would you like to travel next?" },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(1);
  const [tripData, setTripData] = useState({
    destination: "",
    date: "",
    hotel: "",
    flight: "",
  });

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);
    handleAIResponse(input);
    setInput("");
  };

  const handleAIResponse = (input) => {
    switch (step) {
      case 1:
        setTripData({ ...tripData, destination: input });
        respondFromAI(`Great! When do you plan to travel to ${input}?`);
        setStep(2);
        break;
      case 2:
        setTripData({ ...tripData, date: input });
        respondFromAI(
          `Awesome. Here’s a luxury hotel option:\n\n🏨 **Luxe Grand Hotel**\n💲 Price: $350/night\n🌟 5 Stars\n🛏️ Rooms Available: 3\n\nWould you like to book this hotel? (yes/no)`
        );
        setStep(3);
        break;
      case 3:
        if (input.toLowerCase() === "yes") {
          setTripData({ ...tripData, hotel: "Luxe Grand Hotel" });
          respondFromAI(
            `Hotel booked! Would you like to book a flight as well? (yes/no)`
          );
          setStep(4);
        } else {
          respondFromAI(
            `No worries! Let me know if you want a different hotel.`
          );
        }
        break;
      case 4:
        if (input.toLowerCase() === "yes") {
          respondFromAI(
            `✈️ Flight booked for ${tripData.date} to ${tripData.destination}!\n\nWould you like to cancel your flight later if needed? (yes/no)`
          );
          setTripData({
            ...tripData,
            flight: "Flight to " + tripData.destination,
          });
          setStep(5);
        } else {
          respondFromAI(`Okay, skipping flight booking.`);
          setStep(6);
        }
        break;
      case 5:
        if (input.toLowerCase() === "yes") {
          respondFromAI(
            `You can cancel your flight 24 hours before departure with no extra fee.`
          );
        } else {
          respondFromAI(
            `Alright. Keep in mind, cancelation policies vary by airline.`
          );
        }
        setStep(6);
        break;
      default:
        respondFromAI(`Your travel plan is complete! Safe travels ✈️🌍`);
        break;
    }
  };

  const respondFromAI = (text) => {
    const aiMessage = { sender: "AI", text };
    setMessages((prev) => [...prev, aiMessage]);
  };

  return (
    <div className="w-full max-w-md mx-auto p-4 space-y-4">
      <div className="border rounded-lg h-[500px] overflow-y-auto p-4 space-y-2 bg-white shadow-sm">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl max-w-[80%] whitespace-pre-line ${
              msg.sender === "AI"
                ? "bg-blue-100 ml-auto"
                : "bg-gray-200 mr-auto"
            }`}
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your travel assistant..."
          className="flex-1 border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          <SendHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}
