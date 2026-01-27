"use client";
import React, { useState } from "react";
import axios from "axios";

const businessTypes = [
    "Restaurants & Cafés",
    "Pastry Shops & Bakeries",
    "Shopping Malls",
    "Supermarkets",
    "Hardware Stores",
    "Vehicle Parts Shops",
    "Any Retail Business",
];

export default function PaymentForm({ selectedPlan }) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        businessName: "",
        businessType: "",
        ownerName: "",
        phone: "",
        email: "",
        address: "",
        amount: "",
    });

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handlePayment = async () => {
        if (loading) return;

        if (!form.businessName || !form.phone || !form.email) {
            alert("Please fill in all required fields.");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                "http://localhost:3000/api/create-payment",
                form
            );

            const sessionId = response.data.sessionId || response.data.session?.id;

            if (!sessionId) {
                throw new Error("Session ID not found in response");
            }

            window.cancelCallback = () => setLoading(false);
            window.errorCallback = () => setLoading(false);
            window.completeCallback = () => setLoading(false);

            const script = document.createElement("script");
            script.src =
                "https://test-seylan.mtf.gateway.mastercard.com/static/checkout/checkout.min.js";
            script.async = true;
            script.setAttribute("data-error", "errorCallback");
            script.setAttribute("data-cancel", "cancelCallback");
            script.setAttribute("data-complete", "completeCallback");

            script.onload = () => {
                // @ts-ignore
                Checkout.configure({ session: { id: sessionId } });
                // @ts-ignore
                Checkout.showPaymentPage();
            };

            document.body.appendChild(script);
        } catch (err) {
            console.error(err);
            alert("Payment Error!");
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-xl mx-auto bg-white/30 backdrop-blur-2xl rounded-3xl border border-white/50 p-6 md:p-10 shadow-xl transform transition-all">
            <div className="mb-6 text-center">
                <p className="text-sm md:text-base text-gray-700">
                    Selected Plan:
                    <span className="font-bold text-blue-700 ml-1">{selectedPlan || "Not Selected"}</span>
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Business Name *" name="businessName" handleChange={handleChange} />
                <InputField label="Owner Name *" name="ownerName" handleChange={handleChange} />

                <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Business Type *
                    </label>
                    <select
                        name="businessType"
                        onChange={handleChange}
                        className="w-full p-3 mt-1 text-sm md:text-base rounded-xl border bg-white/50 focus:ring-2 focus:ring-blue-700 outline-none"
                    >
                        <option value="">Select...</option>
                        {businessTypes.map((b) => (
                            <option key={b} value={b}>{b}</option>
                        ))}
                    </select>
                </div>

                <InputField label="Phone *" name="phone" handleChange={handleChange} type="tel" />
                <InputField label="Amount *" name="amount" handleChange={handleChange} type="number" />
                <InputField label="Email *" name="email" type="email" handleChange={handleChange} />

                <div className="md:col-span-2">
                    <label className="text-sm font-semibold text-gray-700">
                        Business Address *
                    </label>
                    <textarea
                        name="address"
                        rows={3}
                        onChange={handleChange}
                        className="w-full p-3 mt-1 text-sm md:text-base rounded-xl border bg-white/50 focus:ring-2 focus:ring-blue-700 outline-none"
                    />
                </div>
            </div>

            <button
                disabled={loading}
                onClick={handlePayment}
                className="w-full mt-8 py-4 text-white font-semibold text-base md:text-lg rounded-2xl shadow-lg bg-gradient-to-r from-blue-700 to-blue-900 hover:opacity-90 transition disabled:opacity-40"
            >
                {loading ? "Processing..." : "Proceed to Payment"}
            </button>
        </div>
    );
}

function InputField({
    label,
    name,
    type = "text",
    handleChange,
}) {
    return (
        <div>
            <label className="text-sm font-semibold text-gray-700">{label}</label>
            <input
                type={type}
                name={name}
                onChange={handleChange}
                className="w-full p-3 mt-1 text-sm md:text-base rounded-xl border bg-white/50 focus:ring-2 focus:ring-blue-700 outline-none"
            />
        </div>
    );
}
