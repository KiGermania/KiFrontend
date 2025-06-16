import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch('https://DEINE-BACKEND-URL.onrender.com/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setResponse(data.reply || 'Keine Antwort erhalten.');
    } catch (err) {
      setResponse('Fehler bei der Anfrage.');
    }
    setLoading(false);
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>KI Bot</h1>
      <textarea
        rows="4"
        cols="50"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Frag mich etwas..."
      />
      <br />
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Antwort wird generiert...' : 'Absenden'}
      </button>
      <div style={{ marginTop: '1rem' }}>
        <strong>Antwort:</strong>
        <p>{response}</p>
      </div>
    </main>
  );
}
