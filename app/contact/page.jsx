"use client";

import { useState } from "react";

export default function Contact() {
    const [focused, setFocused] = useState(null);
    const [sent, setSent] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSent(true);
        setTimeout(() => setSent(false), 3000);
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Tenor+Sans&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }

                .contact-root {
                    min-height: 100vh;
                    background: #080808;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'Tenor Sans', sans-serif;
                    overflow: hidden;
                    position: relative;
                }

                .bg-orb {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(120px);
                    pointer-events: none;
                }
                .orb-1 {
                    width: 500px; height: 500px;
                    background: radial-gradient(circle, rgba(180,140,255,0.08) 0%, transparent 70%);
                    top: -100px; left: -100px;
                    animation: drift1 12s ease-in-out infinite alternate;
                }
                .orb-2 {
                    width: 400px; height: 400px;
                    background: radial-gradient(circle, rgba(100,200,255,0.06) 0%, transparent 70%);
                    bottom: -80px; right: -80px;
                    animation: drift2 15s ease-in-out infinite alternate;
                }

                @keyframes drift1 {
                    from { transform: translate(0, 0); }
                    to { transform: translate(40px, 30px); }
                }
                @keyframes drift2 {
                    from { transform: translate(0, 0); }
                    to { transform: translate(-30px, -40px); }
                }

                .grid-overlay {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 60px 60px;
                    pointer-events: none;
                }

                .card {
                    position: relative;
                    width: 100%;
                    max-width: 480px;
                    padding: 56px 48px;
                    margin: 24px;
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.07);
                    backdrop-filter: blur(40px);
                    animation: fadeUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(32px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 10%; right: 10%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(180,140,255,0.5), transparent);
                }

                .eyebrow {
                    font-family: 'Tenor Sans', sans-serif;
                    font-size: 10px;
                    letter-spacing: 0.3em;
                    text-transform: uppercase;
                    color: rgba(180,140,255,0.7);
                    margin-bottom: 16px;
                    animation: fadeUp 0.9s 0.1s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .heading {
                    font-family: 'Cormorant Garamond', serif;
                    font-size: 48px;
                    font-weight: 300;
                    color: #f0ede8;
                    line-height: 1.1;
                    margin-bottom: 12px;
                    animation: fadeUp 0.9s 0.15s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .heading em {
                    font-style: italic;
                    color: rgba(180,140,255,0.9);
                }

                .subtext {
                    font-size: 13px;
                    color: rgba(255,255,255,0.3);
                    letter-spacing: 0.02em;
                    line-height: 1.6;
                    margin-bottom: 40px;
                    animation: fadeUp 0.9s 0.2s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .divider {
                    width: 40px;
                    height: 1px;
                    background: rgba(180,140,255,0.4);
                    margin-bottom: 40px;
                    animation: expand 0.9s 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                @keyframes expand {
                    from { width: 0; opacity: 0; }
                    to { width: 40px; opacity: 1; }
                }

                .field-wrap {
                    position: relative;
                    margin-bottom: 28px;
                    animation: fadeUp 0.9s 0.25s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .field-wrap:last-of-type {
                    animation-delay: 0.32s;
                }

                .field-label {
                    display: block;
                    font-size: 10px;
                    letter-spacing: 0.25em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.35);
                    margin-bottom: 10px;
                    transition: color 0.3s;
                }

                .field-wrap.is-focused .field-label {
                    color: rgba(180,140,255,0.8);
                }

                .field-input {
                    width: 100%;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    color: #f0ede8;
                    font-family: 'Tenor Sans', sans-serif;
                    font-size: 14px;
                    padding: 14px 16px;
                    outline: none;
                    transition: border-color 0.3s, background 0.3s, box-shadow 0.3s;
                    letter-spacing: 0.02em;
                    resize: none;
                }

                .field-input::placeholder {
                    color: rgba(255,255,255,0.15);
                }

                .field-input:focus {
                    border-color: rgba(180,140,255,0.4);
                    background: rgba(180,140,255,0.04);
                    box-shadow: 0 0 0 4px rgba(180,140,255,0.06);
                }

                .field-line {
                    position: absolute;
                    bottom: 0; left: 0;
                    height: 1px;
                    width: 0;
                    background: linear-gradient(90deg, rgba(180,140,255,0.8), rgba(100,200,255,0.4));
                    transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .field-wrap.is-focused .field-line {
                    width: 100%;
                }

                .submit-btn {
                    width: 100%;
                    padding: 16px;
                    background: transparent;
                    border: 1px solid rgba(180,140,255,0.4);
                    color: #f0ede8;
                    font-family: 'Tenor Sans', sans-serif;
                    font-size: 11px;
                    letter-spacing: 0.3em;
                    text-transform: uppercase;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: border-color 0.3s, color 0.3s;
                    margin-top: 8px;
                    animation: fadeUp 0.9s 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
                }

                .submit-btn::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(180,140,255,0.15), rgba(100,200,255,0.08));
                    transform: translateX(-100%);
                    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .submit-btn:hover::before {
                    transform: translateX(0);
                }

                .submit-btn:hover {
                    border-color: rgba(180,140,255,0.7);
                }

                .submit-btn span {
                    position: relative;
                    z-index: 1;
                }

                .sent-msg {
                    text-align: center;
                    font-size: 11px;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: rgba(180,140,255,0.7);
                    margin-top: 16px;
                    opacity: 0;
                    transition: opacity 0.4s;
                }

                .sent-msg.visible {
                    opacity: 1;
                }

                .corner {
                    position: absolute;
                    width: 12px; height: 12px;
                    border-color: rgba(180,140,255,0.3);
                    border-style: solid;
                }
                .corner-tl { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
                .corner-tr { top: -1px; right: -1px; border-width: 1px 1px 0 0; }
                .corner-bl { bottom: -1px; left: -1px; border-width: 0 0 1px 1px; }
                .corner-br { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }
            `}</style>

            <div className="contact-root">
                <div className="bg-orb orb-1" />
                <div className="bg-orb orb-2" />
                <div className="grid-overlay" />

                <div className="card">
                    <div className="corner corner-tl" />
                    <div className="corner corner-tr" />
                    <div className="corner corner-bl" />
                    <div className="corner corner-br" />

                    <p className="eyebrow">Contact</p>
                    <h2 className="heading">Get in <em>touch</em></h2>
                    <p className="subtext">Have questions? We'd love to hear from you.</p>
                    <div className="divider" />

                    <form onSubmit={handleSubmit}>
                        <div className={`field-wrap ${focused === 'email' ? 'is-focused' : ''}`}>
                            <label className="field-label" htmlFor="email-address">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="field-input"
                                placeholder="you@example.com"
                                onFocus={() => setFocused('email')}
                                onBlur={() => setFocused(null)}
                            />
                            <div className="field-line" />
                        </div>

                        <div className={`field-wrap ${focused === 'message' ? 'is-focused' : ''}`}>
                            <label className="field-label" htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                required
                                className="field-input"
                                placeholder="How can we help?"
                                onFocus={() => setFocused('message')}
                                onBlur={() => setFocused(null)}
                            />
                            <div className="field-line" />
                        </div>

                        <button type="submit" className="submit-btn">
                            <span>{sent ? '✦ Message Sent' : 'Send Message'}</span>
                        </button>

                        <p className={`sent-msg ${sent ? 'visible' : ''}`}>
                            We'll be in touch shortly
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}