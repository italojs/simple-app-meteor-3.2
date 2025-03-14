import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';

export const TokenizerDemo = () => {
  const [inputText, setInputText] = useState('Who is John?');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTokenize = async () => {
    if (!inputText.trim()) return;
    
    setLoading(true);
    setError(null);
    
    // Usar o método Meteor para tokenizar o texto no servidor
    Meteor.call('tokenizer.encode', inputText, (err, tokenizationResult) => {
      setLoading(false);
      
      if (err) {
        console.error('Erro na tokenização:', err);
        setError('Ocorreu um erro ao tokenizar o texto. Verifique o console para mais detalhes.');
        return;
      }
      
      setResult(tokenizationResult);
    });
  };

  // Carregar o exemplo de tokenização ao montar o componente
  useEffect(() => {
    Meteor.call('tokenizer.example', (err, exampleResult) => {
      if (err) {
        console.error('Erro ao carregar exemplo:', err);
        return;
      }
      
      console.log('Exemplo de tokenização carregado:', exampleResult);
    });
  }, []);

  return (
    <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2>Demonstração do Tokenizer</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="tokenizer-input" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Texto para tokenizar:
        </label>
        <input
          id="tokenizer-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ width: '100%', padding: '0.5rem' }}
        />
      </div>
      
      <button 
        onClick={handleTokenize} 
        disabled={loading || !inputText.trim()}
        style={{ 
          padding: '0.5rem 1rem', 
          backgroundColor: '#4CAF50', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          opacity: loading || !inputText.trim() ? 0.7 : 1
        }}
      >
        {loading ? 'Processando...' : 'Tokenizar'}
      </button>
      
      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>
          {error}
        </div>
      )}
      
      {result && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Resultado:</h3>
          <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '4px', overflowX: 'auto' }}>
            <p><strong>Comprimento:</strong> {result.length}</p>
            <p><strong>Tokens:</strong> {JSON.stringify(result.tokens)}</p>
            <p><strong>IDs:</strong> {JSON.stringify(result.ids)}</p>
            <p><strong>Máscara de Atenção:</strong> {JSON.stringify(result.attentionMask)}</p>
            <p><strong>Offsets:</strong> {JSON.stringify(result.offsets)}</p>
            <p><strong>Overflowing:</strong> {JSON.stringify(result.overflowing)}</p>
            <p><strong>Máscara de Tokens Especiais:</strong> {JSON.stringify(result.specialTokensMask)}</p>
            <p><strong>Type IDs:</strong> {JSON.stringify(result.typeIds)}</p>
            <p><strong>Word IDs:</strong> {JSON.stringify(result.wordIds)}</p>
          </div>
        </div>
      )}
    </div>
  );
}; 