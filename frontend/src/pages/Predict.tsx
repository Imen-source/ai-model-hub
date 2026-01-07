import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FileUpload from "../components/FileUpload";
import ModelSelector from "../components/ModelSelector";
import PredictionResult from "../components/PredictionResult";
import Spinner from "../components/Spinner";

// API service functions
async function fetchModels() {
  const res = await fetch("http://127.0.0.1:8000/models/");
  if (!res.ok) throw new Error("Failed to fetch models");
  return res.json(); // returns array of {name, description}
}

async function predictImage(file: File, modelName: string) {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(
    `http://127.0.0.1:8000/predict/image?model_name=${modelName}`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Prediction failed");
  }

  return res.json();
}

// Types
interface Model {
  name: string;
  description?: string;
}

interface PredictionResponse {
  model_name: string;
  input_type: string;
  prediction: string;
  confidence: number;
}

export default function Predict() {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchModels()
      .then((data) => {
        setModels(data);
        if (data.length > 0) setSelectedModel(data[0].name);
      })
      .catch(() => setError("Could not load models"));
  }, []);

  const handlePredict = async () => {
    if (!file || !selectedModel) {
      setError("Please select a model and upload an image");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await predictImage(file, selectedModel);
      setResult(res);
    } catch (err: any) {
      setError(err.message || "Prediction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 sm:p-8"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800">
          AI Model Hub
        </h1>

        <p className="text-center text-gray-500 mt-1 mb-6">
          Image classification powered by deep learning
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        {/* Model selector */}
        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700">
            Choose model
          </label>
          <ModelSelector
            models={models}
            value={selectedModel}
            onChange={setSelectedModel}
          />
        </div>

        {/* File upload */}
        <div className="mb-4">
          <FileUpload onFileSelect={(f) => setFile(f)} />
        </div>

        {file && (
          <p className="text-xs text-green-600 text-center">
            Selected file: {file.name}
          </p>
        )}

        {selectedModel && (
          <p className="text-xs text-blue-600 text-center">
            Selected model: {selectedModel}
          </p>
        )}

        {/* Predict button */}
        <button
          onClick={handlePredict}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600
                     text-white py-2.5 rounded-lg font-medium
                     hover:opacity-90 transition
                     disabled:opacity-50"
        >
          {loading ? "Running inference..." : "Predict"}
        </button>

        {loading && <Spinner />}

        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <PredictionResult result={result} />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
