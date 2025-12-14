import React, { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactMarkdown from "react-markdown";

function App() {
  const [hasKey, setHasKey] = useState(false); 
  const [keyInput, setKeyInput] = useState(""); 
  const [apiKey, setApiKey] = useState(""); 
  const [storedCode, setStoredCode] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  // 1. Load data when component mounts
  useEffect(() => {
    chrome.storage.local.get(["geminiApiKey", "selectedCode"], (result) => {
      if (result.geminiApiKey) {
        setApiKey(result.geminiApiKey);
        setHasKey(true);
        if (result.selectedCode) {
            setStoredCode(result.selectedCode);
            analyzeCode(result.selectedCode, result.geminiApiKey);
        }
      } else {
          
          setHasKey(false);
      }
      
      if (result.selectedCode) setStoredCode(result.selectedCode);
    });

    // Listener for new selections
    const handleStorageChange = (changes) => {
      if (changes.selectedCode) {
        setStoredCode(changes.selectedCode.newValue);
        
        chrome.storage.local.get("geminiApiKey", (res) => {
            if (res.geminiApiKey) {
                analyzeCode(changes.selectedCode.newValue, res.geminiApiKey);
            }
        });
      }
    };
    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, []);

  // 2. Function to call Gemini AI
  const analyzeCode = async (code, key) => {
    if (!key) return;
    setLoading(true);
    setAnalysis(""); 
    
    try {
      const genAI = new GoogleGenerativeAI(key);


const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `You are an expert coding assistant. Explain this code simply in Hinglish(hindi written in roman script).
      Also point out any bugs if present. 
      Format: Use Markdown (Bold, Bullet points).
      Code:
      ${code}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setAnalysis(response.text());
    } catch (error) {
      setAnalysis(`Error: ${error.message}. Please check your API Key.`);
    }
    setLoading(false);
  };

  // 3. Save API Key Function
  const handleSaveKey = () => {
    if (keyInput.trim() === "") return; 
    
    chrome.storage.local.set({ geminiApiKey: keyInput }, () => {
        setApiKey(keyInput);
        setHasKey(true);
       
        if (storedCode) analyzeCode(storedCode, keyInput);
    });
  };

  return (
    <div style={{ width: "100%", padding: "15px", fontFamily: "sans-serif", boxSizing: "border-box" }}>
      <h2 style={{borderBottom: "2px solid #eee", paddingBottom: "10px"}}> Code Explainer</h2>
      
      {/* if key not saved then show input */}
      {!hasKey ? (
        <div>
          <p style={{fontSize: "13px", fontWeight: "bold"}}>Step 1: Setup API Key</p>
          <p style={{fontSize: "12px"}}>Paste your Gemini API Key below:</p>
          
          <input 
            type="text" 
            placeholder="Paste Key Here..."
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            style={{width: "100%", padding: "8px", marginBottom: "10px", boxSizing: "border-box", border: "1px solid #ccc", borderRadius: "4px"}}
          />
          
          <button 
            onClick={handleSaveKey} 
            style={{
                width: "100%", 
                padding: "10px", 
                backgroundColor: "#007bff", 
                color: "white", 
                border: "none", 
                borderRadius: "4px", 
                cursor: "pointer",
                fontWeight: "bold"
            }}
          >
            Save & Start 
          </button>
          
          <p style={{fontSize: "10px", color: "gray", marginTop: "10px"}}>
            Key is saved locally on your device only.
          </p>
        </div>
      ) : (
       
        <div>
           <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px"}}>
               <span style={{fontSize: "12px", color: "green"}}>● System Ready</span>
               <button 
                 onClick={() => {
                     chrome.storage.local.remove("geminiApiKey"); 
                     setHasKey(false);
                     setKeyInput("");
                 }} 
                 style={{fontSize: "10px", border: "1px solid #ddd", background: "#f9f9f9", cursor: "pointer", padding: "2px 5px", borderRadius: "3px"}}>
                 Reset Key
               </button>
           </div>
           
           <div style={{background: "#f4f4f9", padding: "10px", borderRadius: "8px", minHeight: "100px"}}>
             {loading ? (
               <p style={{textAlign: "center", color: "#666"}}>Thinking... </p>
             ) : analysis ? (
               <div style={{fontSize: "14px", lineHeight: "1.6", color: "#333"}}>
                 <ReactMarkdown>{analysis}</ReactMarkdown>
               </div>
             ) : (
               <div style={{textAlign: "center", marginTop: "20px", color: "#888"}}>
                 <p><b>Select any code</b> on a webpage</p>
                 <p> Right Click  <b>"Explain with AI"</b></p>
               </div>
             )}
           </div>
        </div>
      )}
    </div>
  );
}

export default App;